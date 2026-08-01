# Design Spec: 3D Meteor Assembly Scroll Timeline for About Section

## Goal
Transform the `#about` section in `components/About.jsx` into a video-timeline-like 3D Meteor Assembly animation. Components start scattered out in 3D space like meteor fragments and converge smoothly onto the screen center as the user scrubs down the page.

---

## Animation & Timeline Architecture

### Sticky Viewport
- Container height: `h-[400vh]` (scrolling timeline distance).
- Inner Viewport: `sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#030712] text-white`.
- Particle Backdrop: Ambient floating meteor/star particles in background.

### Fragment Converging Timelines (`useTransform` from `scrollYProgress`)

1. **Center Core Element ("HI 👋" Greeting):**
   - Visible initially at center (`scrollYProgress`: `0.00 -> 0.20`).
   - Scales up and dissolves cleanly into space (`scale: 1 -> 1.5`, `opacity: 1 -> 0`) as the meteor fragments begin entering (`0.18 -> 0.28`).

2. **Meteor Fragment 1 (Header "TENTANG SAYA" + Profile Card):**
   - **Initial (Scroll 0.00 - 0.20):**
     - `x`: `-700px`, `y`: `-450px`, `rotate`: `-35deg`, `scale`: `0.25`, `opacity`: `0`, `blur`: `12px`.
   - **Arrival (Scroll 0.20 - 0.45):**
     - Converges into position: `x: 0px`, `y: 0px`, `rotate: 0deg`, `scale: 1`, `opacity: 1`, `blur: 0px`.
     - Styled with glowing blue/cyan meteor trail shadow (`drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]`).

3. **Meteor Fragment 2 (School Title "SMKN 4 Jakarta"):**
   - **Initial (Scroll 0.00 - 0.35):**
     - `x`: `650px`, `y`: `-350px`, `rotate`: `30deg`, `scale`: `0.25`, `opacity`: `0`, `blur`: `10px`.
   - **Arrival (Scroll 0.35 - 0.60):**
     - Converges into position: `x: 0px`, `y: 0px`, `rotate: 0deg`, `scale: 1`, `opacity: 1`, `blur: 0px`.

4. **Meteor Fragment 3 (Bio Text Block):**
   - **Initial (Scroll 0.00 - 0.50):**
     - `x`: `750px`, `y`: `450px`, `rotate`: `-25deg`, `scale`: `0.25`, `opacity`: `0`, `blur`: `10px`.
   - **Arrival (Scroll 0.50 - 0.78):**
     - Converges into position: `x: 0px`, `y: 0px`, `rotate: 0deg`, `scale: 1`, `opacity: 1`, `blur: 0px`.

5. **Meteor Fragment 4 (Contact Button "Hubungi Saya"):**
   - **Initial (Scroll 0.00 - 0.68):**
     - `x`: `0px`, `y`: `600px`, `rotate`: `15deg`, `scale: 0.2`, `opacity`: `0`, `blur`: `8px`.
   - **Arrival (Scroll 0.68 - 0.95):**
     - Shoots up into final position: `x: 0px`, `y: 0px`, `rotate: 0deg`, `scale: 1`, `opacity: 1`, `blur: 0px`.

---

## Technical File Modifications
- `components/About.jsx`: Complete overhaul using Framer Motion 3D physics transforms, sticky scroll scrub, and meteor trail particle overlay.

---

## Verification Plan
1. **Compilation Check**: Verify `next build` clean pass without syntax/bundle errors.
2. **Timeline Scrub Test**: Verify forward and backward scrolling continuously animates meteor fragment assembly seamlessly.
