# LazyQ

Join a queue by scanning a QR code, with no app needed. Watch your place live on your phone, and come back when it's your turn.

| Requirement | Where it lives |
|---|---|
| QR code to join, no app | `web/venue.html` (counter screen, code rotates every 30 s) → scanning opens `web/ticket.html` and creates the ticket immediately |
| Live queue position on a phone | `web/ticket.html`, updated instantly by the server |
| Multilingual interface | Language chips on the front page; customer pages follow it (counter screen stays English): English, Español, Français, Türkçe, 中文, العربية |

## 1. Start the server (laptop)
Python 3 only, nothing to install.
```
python3 server.py
```
It prints the addresses to use. **For the demo, connect the laptop and the phones to the same phone hotspot.** University Wi-Fi often blocks devices from reaching each other.

- Counter screen: `http://<laptop-ip>:8000/venue.html`, full screen on the laptop or a tablet
- Staff screen: `http://<laptop-ip>:8000/staff.html`, tap to call the next customer + today's stats
- Customers: scan the QR on the counter screen

## 2. Demo script (2 minutes)
1. A judge scans the QR → a ticket appears in their phone's language.
2. Tap the staff screen → their position moves live on the phone and the counter screen.
3. Keep tapping → the ticket turns yellow ("head back now"), then green ("you're next") and dark green ("your turn"), with sound and vibration if they turned on alerts.
4. Show the progress tracker on the phone and the "Up next" numbers on the counter screen.
5. Switch the language on the phone (e.g. Arabic) to show right-to-left support.

## Change things
- `web/js/config.js`: venue name, venue location, timings
- `web/css/style.css`: colours at the top (`--green`, `--forest`, `--yellow`, …)
- `web/js/i18n.js`: add a language by copying the `en` block
- `server.py`: environment variables `PORT`, `STAFF_KEY`, `CODE_STEP`
- **Start with an empty queue:** stop the server, delete `queue_state.json`, start it again

## Demo shortcuts (not production)
- The staff key sits in `config.js`; a real product would use a staff login.
- The queue is saved to `queue_state.json` next to the server; delete it (with the server stopped) to start fresh.
- Location ("free to roam") needs `https` on phones. Over the hotspot's `http` address, alerts fall back to time-only, which still works.
