# Prismm Site Visual Review — Handoff Doc
_Last updated: March 25, 2026_

## What this repo is
`neo-prismm-site-with-images` — the Prismm marketing site dev/review environment.
- **Live preview URL:** https://keyona-rerev.github.io/neo-prismm-site-with-images
- **Production site:** https://getprismm.com
- **Stack:** Plain HTML + CSS + JS, hosted on GitHub Pages (also has a netlify.toml but GitHub Pages is the review URL)
- **GitHub user:** keyona-rerev

## What we were doing
Adding and reviewing **product explainer visuals** to the `why-prismm.html` page — specifically the 3 solution sections. The goal is to replace the existing placeholder SVGs with richer, more illustrative visuals that tell the product story.

The approach: each section gets a **carousel** (left/right arrow + dot indicators) so Keyona can toggle between options and pick the one that works best before committing to the final version.

## Current state of why-prismm.html

### Section 1 — Deposit retention (`#retention`)
**STATUS: Carousel implemented ✅**
- Slide A: Original 70% concentric ring SVG
- Slide B: Animated scatter vs. flow SVG (coins scatter left "Without Prismm", coins flow into vault "With Prismm") — uses SMIL `animateTransform` for cross-browser animation
- **Pending:** Keyona needs to confirm B slide is rendering correctly after the SMIL fix

### Section 2 — Account transition (`#transition`)
**STATUS: Still using old A/B toggle buttons — needs carousel upgrade**
- Slide A: Original "6–18 months → Weeks" static SVG
- Slide B: Animated pipeline (paper chaos → Verify → Notify → Delegate → Done steps animating in sequentially)
- **Next step:** Convert to same carousel format as retention section

### Section 3 — Intergenerational relationship capture (`#growth`)
**STATUS: Still using old A/B toggle buttons — needs carousel upgrade**
- Slide A: Original org-chart dots SVG
- Slide B: Animated relationship flow (account holder → life event fires → beneficiary nodes pop in → "New customer" labels appear)
- **Next step:** Convert to same carousel format as retention section

## Carousel implementation pattern
The approved format (do not change this):

```html
<div class="feature-row__visual" style="padding:0">
  <div class="carousel" id="car-SECTION">
    <div class="carousel__track">
      <div class="carousel__slide active"><!-- SVG A --></div>
      <div class="carousel__slide"><!-- SVG B --></div>
    </div>
    <div class="carousel__controls">
      <button class="carousel__btn" onclick="carMove('SECTION',-1)">← arrow svg</button>
      <div class="carousel__dots" id="car-SECTION-dots">
        <div class="carousel__dot active" onclick="carGo('SECTION',0)"></div>
        <div class="carousel__dot" onclick="carGo('SECTION',1)"></div>
      </div>
      <button class="carousel__btn" onclick="carMove('SECTION',1)">→ arrow svg</button>
    </div>
  </div>
</div>
```

JS at bottom of page:
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

CSS classes: `.carousel`, `.carousel__track`, `.carousel__slide`, `.carousel__slide.active`, `.carousel__controls`, `.carousel__btn`, `.carousel__dots`, `.carousel__dot`, `.carousel__dot.active` — all defined in the `<style>` block in the `<head>`.

## Critical: how to get the blob SHA for pushing
The GitHub MCP needs the **blob SHA** (not the commit SHA) to update an existing file. Get it by running in the repo directory:
```powershell
git ls-files -s why-prismm.html
```
Output: `100644 <BLOB_SHA> 0  why-prismm.html` — use that SHA.

The repo IS cloned locally at: `C:\Users\keyon\Documents\neo-prismm-site-with-images`

Current blob SHA after last push: `e0284e376684446a9f2e60c86218dc6fc71c0537`

## Animation approach
All B-slide animations use **SMIL** (`animateTransform`, `animate` elements inside SVG) — NOT CSS `transform` + `transform-origin`. CSS transforms on SVG elements don't work reliably cross-browser. This was the fix applied to the retention B slide.

## Pages still untouched
- `index.html` — homepage, no visuals added yet
- `platform.html` — has a static architecture diagram SVG (good candidate for animation later)
- `about.html`, `contact.html`, `partners.html`, `resources.html` — not started

## What to do next (in order)
1. Confirm retention B slide is animating correctly on the live preview
2. Convert `#transition` section to carousel format (same pattern as retention)
3. Convert `#growth` section to carousel format
4. Once Keyona picks A or B for each section, strip out the losing option and finalize
5. Consider adding visuals to other pages (platform.html integration diagram is the best next candidate)
