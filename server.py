#!/usr/bin/env python3
"""
LazyQ server: Python standard library only, nothing to install.

    python3 server.py            # then open http://localhost:8000

It does three jobs:
  1. Serves the website in ./web
  2. Keeps the one true queue (saved to queue_state.json, survives restarts)
  3. Pushes every change live to all phones/screens (Server-Sent Events)

Phones on the same network (use a phone hotspot for the demo) open
http://<this-laptop's-IP>:8000. The staff screen calls the next customer via /api/advance.

Environment variables (all optional):
    PORT=8000  STAFF_KEY=demo-staff  DEVICE_SECRET=dev-secret-change-me  CODE_STEP=30
"""

import hashlib
import hmac
import json
import os
import socket
import threading
import time
import uuid
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

HERE = Path(__file__).resolve().parent
WEB = HERE / "web"
DATA = HERE / "queue_state.json"

PORT = int(os.environ.get("PORT", 8000))
STAFF_KEY = os.environ.get("STAFF_KEY", "demo-staff")
SECRET = os.environ.get("DEVICE_SECRET", "dev-secret-change-me")
CODE_STEP = int(os.environ.get("CODE_STEP", 30))
DEFAULT_SERVICE_SEC = 90
UNDO_SECONDS = 10


# ------------------------------------------------------------------ join codes
def code_for_window(win: int) -> str:
    digest = hmac.new(SECRET.encode(), str(win).encode(), hashlib.sha256).hexdigest()
    return f"{int(digest[:8], 16) % 1_000_000:06d}"


def current_code() -> dict:
    now = time.time()
    win = int(now // CODE_STEP)
    return {"code": code_for_window(win), "secondsLeft": int((win + 1) * CODE_STEP - now) + 1, "step": CODE_STEP}


def code_ok(code: str) -> bool:
    win = int(time.time() // CODE_STEP)
    return any(hmac.compare_digest(code_for_window(w), code or "") for w in (win, win - 1))


# ------------------------------------------------------------------ queue state
class Queue:
    def __init__(self):
        self.cond = threading.Condition()
        self.version = 0
        self.s = self._load()

    @staticmethod
    def _fresh():
        # epoch changes on every reset, so an old phone can't mistake a reused ticket number for its own
        return {"epoch": uuid.uuid4().hex[:8], "nowServing": 0, "nextTicket": 1, "entries": {},
                "presses": [], "undo": None, "events": []}

    def _load(self):
        try:
            return json.loads(DATA.read_text())
        except Exception:
            return self._fresh()

    def _commit(self):
        """Call with the lock held: save, bump version, wake every live stream."""
        self.version += 1
        try:
            DATA.write_text(json.dumps(self.s))
        except Exception as e:
            print("[warn] could not save state:", e)
        self.cond.notify_all()

    def _sorted(self):
        return sorted(self.s["entries"].values(), key=lambda e: e["ticket"])

    def _avg_service(self):
        p = self.s["presses"][-11:]
        if len(p) < 3:
            return DEFAULT_SERVICE_SEC
        gaps = [b - a for a, b in zip(p, p[1:])]
        return max(20, min(900, sum(gaps) / len(gaps)))

    def public(self):
        """What every screen sees. No entry ids (those are each phone's private key)."""
        active = [e for e in self._sorted() if e["status"] in ("waiting", "called")]
        recent = [e for e in self._sorted() if e["status"] not in ("waiting", "called")][-100:]
        return {
            "version": self.version,
            "epoch": self.s.get("epoch", ""),
            "nowServing": self.s["nowServing"],
            "avgServiceSec": round(self._avg_service()),
            "tickets": [{"t": e["ticket"], "s": e["status"]} for e in recent + active],
            "canUndo": bool(self.s["undo"] and time.time() - self.s["undo"]["at"] < UNDO_SECONDS),
            "servedCount": sum(1 for e in self.s["entries"].values() if e["status"] == "served"),
        }

    # ---------- actions (each returns a JSON-able dict)
    def add(self):
        with self.cond:
            e = {"id": uuid.uuid4().hex, "ticket": self.s["nextTicket"], "status": "waiting",
                 "joinedAt": time.time(), "calledAt": None}
            self.s["nextTicket"] += 1
            self.s["entries"][e["id"]] = e
            self._commit()
            return {"id": e["id"], "ticket": e["ticket"], "epoch": self.s.get("epoch", "")}

    def advance(self, kind="next", event_id=None):
        with self.cond:
            if event_id and event_id in self.s["events"]:      # duplicate retry from a device
                return {"changed": False, "now_serving": self.s["nowServing"], "duplicate": True}
            entries = self._sorted()
            cur = next((e for e in entries if e["status"] == "called"), None)
            nxt = next((e for e in entries if e["status"] == "waiting"), None)
            if not cur and not nxt:
                return {"changed": False, "now_serving": self.s["nowServing"]}
            snapshot = json.dumps({"nowServing": self.s["nowServing"], "entries": self.s["entries"],
                                   "presses": self.s["presses"]})
            if cur:
                cur["status"] = "no_show" if kind == "noshow" else "served"
            if nxt:
                nxt["status"] = "called"
                nxt["calledAt"] = time.time()
                self.s["nowServing"] = nxt["ticket"]
            self.s["presses"] = (self.s["presses"] + [time.time()])[-50:]
            self.s["undo"] = {"snapshot": snapshot, "at": time.time()}
            if event_id:
                self.s["events"] = (self.s["events"] + [event_id])[-200:]
            self._commit()
            return {"changed": True, "now_serving": self.s["nowServing"]}

    def undo(self):
        with self.cond:
            u = self.s["undo"]
            if not u or time.time() - u["at"] > UNDO_SECONDS:
                return {"undone": False}
            prev = json.loads(u["snapshot"])
            for eid, e in self.s["entries"].items():   # keep anyone who joined after the press
                prev["entries"].setdefault(eid, e)
            self.s.update(prev)
            self.s["undo"] = None
            self._commit()
            return {"undone": True, "now_serving": self.s["nowServing"]}

    def leave(self, eid):
        with self.cond:
            e = self.s["entries"].get(eid)
            if e and e["status"] == "waiting":
                e["status"] = "left"
                self._commit()
            return {"ok": True}

    def reset(self):
        with self.cond:
            self.s = self._fresh()
            self._commit()
            return {"ok": True}


Q = Queue()


# ------------------------------------------------------------------ HTTP
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(WEB), **kw)

    def log_message(self, fmt, *args):
        if "/api/stream" not in (args[0] if args else ""):
            super().log_message(fmt, *args)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    # ---------- helpers
    def _json(self, obj, status=200):
        body = json.dumps(obj).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _body(self):
        try:
            n = int(self.headers.get("Content-Length") or 0)
            return json.loads(self.rfile.read(n) or b"{}")
        except Exception:
            return {}

    def _is_staff(self, query=None):
        key = self.headers.get("X-Staff-Key") or (query or {}).get("key", [None])[0]
        dev = self.headers.get("X-Device-Secret")
        return key == STAFF_KEY or dev == SECRET

    # ---------- GET
    def do_GET(self):
        url = urlparse(self.path)
        q = parse_qs(url.query)
        if url.path == "/api/state":
            with Q.cond:
                return self._json(Q.public())
        if url.path == "/api/code":
            if not self._is_staff(q):
                return self._json({"error": "staff key required"}, 403)
            return self._json(current_code())
        if url.path == "/api/stream":
            return self._stream()
        if url.path.startswith("/api/"):
            return self._json({"error": "not found"}, 404)
        return super().do_GET()

    def _stream(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/event-stream")
        self.send_header("Connection", "keep-alive")
        self.end_headers()
        last = -1
        try:
            while True:
                with Q.cond:
                    Q.cond.wait_for(lambda: Q.version != last, timeout=15)
                    changed = Q.version != last
                    payload = json.dumps(Q.public()) if changed else None
                    last = Q.version
                self.wfile.write(f"data: {payload}\n\n".encode() if payload else b": ping\n\n")
                self.wfile.flush()
        except (BrokenPipeError, ConnectionResetError, OSError):
            pass

    # ---------- POST
    def do_POST(self):
        path = urlparse(self.path).path
        body = self._body()

        if path == "/api/join":
            if not code_ok(str(body.get("code", ""))):
                return self._json({"error": "expired"}, 400)
            return self._json(Q.add())
        if path == "/api/leave":
            return self._json(Q.leave(str(body.get("id", ""))))

        # Everything below is staff / device only
        if not self._is_staff():
            return self._json({"error": "staff key required"}, 403)
        if path == "/api/advance":
            return self._json(Q.advance(body.get("type", "next"), body.get("event_id")))
        if path == "/api/undo":
            return self._json(Q.undo())
        return self._json({"error": "not found"}, 404)


def lan_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"
    finally:
        s.close()


if __name__ == "__main__":
    srv = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    srv.daemon_threads = True
    ip = lan_ip()
    print(f"""
  LazyQ is running
  ----------------------
  This laptop:   http://localhost:{PORT}
  Phones:        http://{ip}:{PORT}      (same Wi-Fi / hotspot)
  Counter:       http://{ip}:{PORT}/venue.html
  Staff:         http://{ip}:{PORT}/staff.html
""")
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print("\nstopped")
