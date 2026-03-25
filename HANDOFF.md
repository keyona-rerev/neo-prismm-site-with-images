# Prismm Site Visual Review — Handoff Doc
_Last updated: March 25, 2026 (end of session 2)_

## What this repo is
`neo-prismm-site-with-images` — the Prismm marketing site dev/review environment.
- **Live preview URL:** https://keyona-rerev.github.io/neo-prismm-site-with-images
- **Production site:** https://getprismm.com
- **Stack:** Plain HTML + CSS + JS, hosted on GitHub Pages (netlify.toml also exists but GitHub Pages is the review URL)
- **GitHub user:** keyona-rerev
- **Local clone:** `C:\Users\keyon\Documents\neo-prismm-site-with-images`

---

## What we accomplished this session

All three solution sections on `why-prismm.html` now have **3-slide carousels** (A, B, C). The old A/B toggle button pattern (`ab-wrap`, `ab-toggle`, `abSwitch`) has been fully removed. All animations use SMIL — no CSS transforms on SVG elements.

**Current blob SHA for why-prismm.html:** `f73622b615433da696b85cbf67af6bc513b5a563`

---

## Current state of why-prismm.html

### Section 1 — Deposit Retention (`#retention`) — `car-ret`
**STATUS: 3-slide carousel ✅**

- **Slide A:** 70% concentric ring stat (coral/red tones, static)
- **Slide B:** Animated scatter vs. flow — gold coins scatter away "Without Prismm", flow into vault "With Prismm". SMIL `animateTransform` translate.
- **Slide C:** 🆕 **Gravity well / particle field** — dark `#0F1117` background, 8 gold particle dots scattered around the canvas, each animating inward to a pulsing purple vault at center. Two faint orbit trail rings. Caption: *"Every deposit. Anchored."*

### Section 2 — Account Transition (`#transition`) — `car-trans`
**STATUS: 3-slide carousel ✅**

- **Slide A:** Static "6–18 months → Weeks" comparison box (minimal, light)
- **Slide B:** Animated paper-chaos-to-pipeline — shaking paper stack, arrow to Verify → Notify → Delegate → Done steps animating in sequentially with connecting lines. Green checkmark at Done. *(Keyona's known favorite)*
- **Slide C:** 🆕 **CLI terminal / typewriter** — dark `#0D1117` terminal window, macOS traffic lights titlebar, monospace green text types out the full workflow line-by-line (`$ prismm trigger...` → `✓ Life event verified` → `→ Locating beneficiaries...` etc.), ends with `TRANSITION COMPLETE · elapsed: 4 days 2 hrs` success banner and blinking cursor.

### Section 3 — Intergenerational Growth (`#growth`) — `car-grow`
**STATUS: 3-slide carousel ✅**

- **Slide A:** Static org-chart dots (account holder → 3 beneficiary nodes)
- **Slide B:** Animated relationship flow — pulsing account holder, life event flash, three animated lines draw to beneficiary nodes that pop in, "New customer" labels fade in.
- **Slide C:** 🆕 **Concentric ripple / social graph pulse** — dark `#0A0E1A` background, three expanding ripple rings emanate from central node. Ring 1 reveals Spouse, Child 1, Child 2 (purple). Ring 2 reveals Grandchild, Trustee, Estate atty (green) with "→ New customer" badges. Caption: *"Every life event — a relationship opportunity."*

---

## Pending decisions

Review all three carousels at the live preview URL, then fill this in. Losing slides get stripped before production push.

| Section | Your pick | Notes |
|---|---|---|
| Retention | ⬜ A / ⬜ B / ⬜ C | |
| Transition | ⬜ A / ⬜ B / ⬜ C | B is the known favorite |
| Growth | ⬜ A / ⬜ B / ⬜ C | |

---

## Carousel implementation pattern
The approved format — **do not change this**:

```html
<div class="feature-row__visual" style="padding:0">
  <div class="carousel" id="car-SECTION">
    <div class="carousel__track">
      <div class="carousel__slide active"><!-- SVG A --></div>
      <div class="carousel__slide"><!-- SVG B --></div>
      <div class="carousel__slide"><!-- SVG C --></div>
    </div>
    <div class="carousel__controls">
      <button class="carousel__btn" onclick="carMove('SECTION',-1)" aria-label="Previous">
        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="carousel__dots" id="car-SECTION-dots">
        <div class="carousel__dot active" onclick="carGo('SECTION',0)"></div>
        <div class="carousel__dot" onclick="carGo('SECTION',1)"></div>
        <div class="carousel__dot" onclick="carGo('SECTION',2)"></div>
      </div>
      <button class="carousel__btn" onclick="carMove('SECTION',1)" aria-label="Next">
        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>
</div>
```

JS at bottom of page (handles any number of slides — do not change):
```js
var carState={};
function carGo(id,idx){
  var s=carState[id]||{idx:0};
  s.idx=idx; carState[id]=s;
  document.querySelectorAll('#car-'+id+' .carousel__slide').forEach(function(el,i){el.classList.toggle('active',i===idx)});
  document.querySelectorAll('#car-'+id+'-dots .carousel__dot').forEach(function(d,i){d.classList.toggle('active',i===idx)});
}
function carMove(id,dir){
  var count=document.querySelectorAll('#car-'+id+' .carousel__slide').length;
  var s=carState[id]||{idx:0};
  carGo(id,(s.idx+dir+count)%count);
}
```

CSS in `<style>` block in `<head>`. Classes: `.carousel`, `.carousel__track`, `.carousel__slide`, `.carousel__slide.active`, `.carousel__controls`, `.carousel__btn`, `.carousel__dots`, `.carousel__dot`, `.carousel__dot.active`.

---

## Animation rules — do not break

- All SVG animations use **SMIL only**: `<animateTransform>`, `<animate>` inside SVG
- **Never** CSS `transform` + `transform-origin` on SVG elements — breaks cross-browser
- Dark-background C slides: `#0F1117` (retention), `#0D1117` (transition), `#0A0E1A` (growth)
- All three C slides share the dark/editorial aesthetic intentionally — they form a visual family

---

## How to get blob SHA before any push

```powershell
cd C:\Users\keyon\Documents\neo-prismm-site-with-images
git pull
git ls-files -s why-prismm.html
```
Output: `100644 <BLOB_SHA> 0  why-prismm.html` — pass that SHA to the GitHub MCP call.

**SHA after this session's last push:** `f73622b615433da696b85cbf67af6bc513b5a563`

---

## MCP connector notes (learned this session)

- **tldraw + Canva** are connected in Claude.ai and work when Claude calls them directly in chat
- They **cannot** be used as `mcp_servers` in client-side Artifact `fetch` calls — user-auth tokens don't carry over, causing an infinite spinner
- For design concept generation from artifacts: call the **Anthropic API directly** (no MCP passthrough)

---

## Pages still untouched
- `index.html` — homepage, no visuals added
- `platform.html` — has a static architecture diagram SVG (best next animation candidate)
- `about.html`, `contact.html`, `partners.html`, `resources.html` — not started

---

## What to do next (in order)

1. **Review carousels** at live preview and fill in the pick table above
2. **Strip losing slides** — one commit, clean up all three sections
3. **Update this HANDOFF.md** with final picks before pushing to production
4. **`platform.html`** — animate the static architecture diagram
5. **Real photography** — Replicate API / flux-1.1-pro for hero + feature images is a separate workstream; start a fresh chat with the image briefing doc
