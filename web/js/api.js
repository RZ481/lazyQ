// LazyQ — client data layer. Talks to server.py.
// Live updates arrive over Server-Sent Events (/api/stream); actions are small POSTs.

window.SQ = (() => {
  const cfg = window.SQ_CONFIG;
  const MINE = "sq_mine";
  const listeners = new Set();
  const statusListeners = new Set();
  let state = null;
  let online = false;
  let es = null;

  // ---------------------------------------------------------------- live state
  function setOnline(v) {
    if (v === online) return;
    online = v;
    statusListeners.forEach(fn => fn(online));
  }

  function connect() {
    if (es) return;
    if ("EventSource" in window) {
      es = new EventSource("/api/stream");
      es.onmessage = e => { setOnline(true); setState(JSON.parse(e.data)); };
      es.onopen = () => setOnline(true);
      es.onerror = () => setOnline(false);   // the browser reconnects by itself
    }
    // Safety net: poll every 10 s too (covers old browsers and silent drops)
    refresh();
    setInterval(refresh, 10000);
  }

  async function refresh() {
    try {
      const r = await fetch("/api/state");
      setState(await r.json());
      setOnline(true);
    } catch { setOnline(false); }
  }

  function setState(s) {
    if (state && s.version < state.version) return;
    state = s;
    listeners.forEach(fn => fn(s));
  }

  function subscribe(fn) {
    listeners.add(fn);
    if (state) fn(state);
    connect();
    return () => listeners.delete(fn);
  }
  function onStatus(fn) { statusListeners.add(fn); fn(online); }

  // ---------------------------------------------------------------- derived views
  const waiting = s => s.tickets.filter(t => t.s === "waiting");
  const anyCalled = s => s.tickets.some(t => t.s === "called");

  function summary(s) {
    const w = waiting(s).length;
    return {
      nowServing: s.nowServing,
      waitingCount: w,
      newJoinerWaitSec: Math.round((w + (anyCalled(s) ? 0.5 : 0)) * s.avgServiceSec * cfg.etaPadding),
    };
  }

  // Pass the object from me() (or a bare ticket number)
  function entryView(s, mine) {
    const ticket = typeof mine === "object" ? mine.ticket : mine;
    if (typeof mine === "object" && mine.epoch && mine.epoch !== s.epoch) return null;  // queue was reset
    const t = s.tickets.find(x => x.t === ticket);
    if (!t) return null;
    const ahead = waiting(s).filter(x => x.t < ticket).length;
    const etaSec = t.s === "waiting"
      ? Math.round((ahead * s.avgServiceSec + (anyCalled(s) ? s.avgServiceSec * 0.5 : 0)) * cfg.etaPadding)
      : 0;
    return { status: t.s, ticket, ahead, etaSec, nowServing: s.nowServing };
  }

  // ---------------------------------------------------------------- requests
  async function post(path, body = {}, staff = false) {
    const headers = { "Content-Type": "application/json" };
    if (staff) headers["X-Staff-Key"] = cfg.staffKey;
    const r = await fetch(path, { method: "POST", headers, body: JSON.stringify(body) });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.error || "request failed");
    return data;
  }

  function me() {
    try { return JSON.parse(localStorage.getItem(MINE)); } catch { return null; }
  }

  // customer
  async function join(code) {
    const res = await post("/api/join", { code });
    try { localStorage.setItem(MINE, JSON.stringify(res)); } catch {}
    return res;
  }
  async function leave() {
    const m = me();
    if (m) await post("/api/leave", { id: m.id }).catch(() => {});
    try { localStorage.removeItem(MINE); } catch {}
  }

  // staff
  const advance = (type = "next") =>
    post("/api/advance", { type, event_id: Date.now().toString(36) + Math.random().toString(36).slice(2) }, true);
  const undo = () => post("/api/undo", {}, true);
  async function getCode() {
    const r = await fetch("/api/code?key=" + encodeURIComponent(cfg.staffKey));
    if (!r.ok) throw new Error("code unavailable");
    return r.json();
  }

  return {
    subscribe, onStatus, refresh, summary, entryView, me,
    join, leave, advance, undo, getCode,
    get state() { return state; },
  };
})();
