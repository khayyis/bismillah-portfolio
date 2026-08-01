# Design Spec: Footer Auto-Scroll-To-Top with Fade-Out & Cooldown

## Goal
Automatically and smoothly scroll the page back to top when the user scrolls into the Footer, fading out the footer gracefully during the ascent, and allowing normal scrolling back down to any section afterwards.

---

## Technical Architecture

### 1. Component Target
- `components/Footer.jsx`

### 2. IntersectionObserver & Trigger Mechanics
- **Observer Threshold**: `0.5` (Triggers when 50% of the footer enters the viewport).
- **Trigger State**:
  - `isAutoScrolling`: Boolean flag to prevent duplicate scroll triggers.
  - `hasTriggered`: Cooldown flag (resets when user scrolls above footer area or after a 4-second cooldown).
- **Auto-Scroll Behavior**:
  - `window.scrollTo({ top: 0, behavior: 'smooth' })`.
  - Duration: Smooth browser/Lenis scroll momentum to `#beranda` (y: 0).
- **Footer Fade-Out Effect**:
  - During `isAutoScrolling = true`, the footer container transitions opacity to `0` over `500ms`.
  - Once the scroll reaches top (`y < 100px`), opacity restores to `1` so the footer is ready when the user scrolls back down.

---

## File Modifications
- `components/Footer.jsx`: Add `useRef`, `useState`, `useEffect`, `IntersectionObserver`, and smooth scroll handler.

---

## Verification Plan
1. **Build Check**: `npx next build` clean pass with zero errors.
2. **Scroll Test**: Verify auto-scroll to top when reaching footer, footer fade out, and normal scroll functionality afterwards.
