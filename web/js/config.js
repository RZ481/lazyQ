
// LazyQ — shared configuration for all pages

window.SQ_CONFIG = {
  // Venue information
  venueName: "Demo Café",

  // Demo venue location in London
  venue: {
    lat: 51.5072,
    lng: -0.1276
  },

  // Staff authentication
  // Never hardcode a password in frontend JavaScript.
  // Staff enter their password on staff.html.
  // It is stored temporarily in this browser tab.
  staffKey: sessionStorage.getItem("lazyq_staff_key") || "",

  // Estimated waiting time settings
  etaPadding: 1.15,

  // Return-to-venue guidance
  returnBufferMin: 5,
  walkSpeed: 1.3,

  // Staff dashboard settings
  longPressMs: 800,
  lockoutMs: 700
};
