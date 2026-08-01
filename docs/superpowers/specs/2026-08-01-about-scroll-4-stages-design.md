# Design Spec: 4-Stage Scroll Experience for About Section

## Goal
Transform the `#about` section in `components/About.jsx` into a 4-stage pinned scroll experience where scrolling progressively reveals elements across 4 viewports (`400vh`).

---

## 4-Stage Experience Breakdown

### Stage 1 (0.00 - 0.25 Scroll Progress)
- **Greeting Entrance**: Large, glowing, gradient text **"HI"** (or **"HI 👋"**) displayed centrally on screen.
- **Transformations**:
  - `hiOpacity`: Fades in from `0 -> 1` (`0.00 -> 0.10`), stays fully visible (`0.10 -> 0.20`), then fades out `1 -> 0` (`0.20 -> 0.28`).
  - `hiScale`: Zooms smoothly from `0.8 -> 1.25` during exit.

### Stage 2 (0.25 - 0.50 Scroll Progress)
- **Header & Profile Card**:
  - Teks **"TENTANG SAYA"** header & `ProfileCard` fade in and slide up into view.
- **Transformations**:
  - `stage2Opacity`: `0 -> 1` (`0.25 -> 0.38`).
  - `stage2Y`: `60px -> 0px` (`0.25 -> 0.38`).

### Stage 3 (0.50 - 0.75 Scroll Progress)
- **School & Partial Bio Reveal**:
  - Header **"SMKN 4 Jakarta"** and initial bio text appear next to the profile card.
- **Transformations**:
  - `stage3Opacity`: `0 -> 1` (`0.50 -> 0.62`).
  - `stage3Y`: `40px -> 0px` (`0.50 -> 0.62`).

### Stage 4 (0.75 - 1.00 Scroll Progress)
- **Full Bio & Action Button**:
  - Full bio text complete reveal with blur/opacity transition + **"Hubungi Saya"** GlareHover button.
- **Transformations**:
  - `stage4Opacity`: `0 -> 1` (`0.75 -> 0.88`).
  - `stage4Y`: `30px -> 0px` (`0.75 -> 0.88`).

---

## Technical Architecture & Implementation

### File Modifications
- `components/About.jsx`
  - Wrap section content in a sticky container setup (`h-[400vh]` outer, `sticky top-0 h-screen` inner).
  - Attach `useScroll` target ref to outer container.
  - Map `scrollYProgress` using `useTransform` to drive discrete opacities, scales, and translate Y offsets for each stage.
  - Preserve responsive layout (flex-col on mobile, flex-row on desktop).
  - Retain `useProfile` hook integrations for dynamic data loading.

---

## Verification Plan
1. **Build & Syntax Check**: Verify React component compiles without Next.js errors.
2. **Scroll Behavior Test**: Verify smooth scrubbing through all 4 stages on scroll.
3. **Responsive Check**: Ensure text and card scale gracefully on smaller viewports.
