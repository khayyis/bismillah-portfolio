# Design Spec: BYD-Style Clean Tech About Showcase

## Goal
Replace complex scroll-pinning in `components/About.jsx` with a clean, high-impact BYD-inspired tech showcase layout. The section will feature natural page scrolling, high-contrast dark ocean aesthetics, clear content hierarchy, and customizable button triggers.

---

## Layout Architecture

### Section Container
- `section#about`: `relative min-h-screen py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-[#060a12] text-white flex flex-col justify-center items-center overflow-hidden`
- Background ambient glow: Subtle cyan/blue radial gradients in the background to match BYD Ocean Aesthetics.

### Header Component
- Badge: `HALO! 👋` (glowing border badge).
- Title: `TENTANG SAYA` (`text-3xl md:text-5xl font-extrabold text-white tracking-wide`).
- Divider: Glowing blue accent line (`w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4`).

### Main Content Grid (2 Columns)
1. **Left Column (Showcase Card / Image Slot):**
   - Renders `ProfileCard` (which contains profile photo, handle, status badge, and contact action button).
   - Fully customizable slot ready to swap with custom showcase images or cards provided by user.

2. **Right Column (Tech Details & Action Triggers):**
   - **School Badge/Title:** `SMKN 4 Jakarta` (`text-2xl md:text-3xl font-bold text-blue-400`).
   - **Bio Text:** `ScrollReveal` smooth typography component with `profile.about`.
   - **Skill Tag Highlights (BYD Tech Badges):**
     - `Autonomous Mobile Robotics (LKS)`
     - `3D CAD Design`
     - `AI & Automation`
   - **Primary Action Button:** `GlareHover` button with smooth scroll trigger to `#kontak`.

---

## File Modifications
- `components/About.jsx`: Simplified to a clean, responsive, natural-scrolling BYD-inspired section.

---

## Verification Plan
1. **Build Check**: `npx next build` clean pass with zero errors.
2. **Visual & Interactive Test**: Verify clean rendering, no broken CSS, and responsive layout on all devices.
