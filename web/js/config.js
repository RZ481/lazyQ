// LazyQ — settings shared by every page. Edit these first.
window.SQ_CONFIG = {
  venueName: "Demo Café",

  // Venue location (used for the "free to roam" range on the ticket page). Replace with the real venue.
  venue: { lat: 51.5072, lng: -0.1276 },

  // Staff key for the counter + staff screens. Must match STAFF_KEY in server.py.
  // (Fine for a demo; a real product would use a proper staff login.)
  staffKey: "demo-staff",

  // Wait-time model
  etaPadding: 1.15,        // pad estimates so people arrive early rather than late
  returnBufferMin: 5,      // "head back" when walk time is within this many minutes of your turn
  walkSpeed: 1.3,          // metres per second

  // Staff screen
  longPressMs: 800,        // hold this long = no-show / skip
  lockoutMs: 700,          // ignore repeat taps faster than this
};
