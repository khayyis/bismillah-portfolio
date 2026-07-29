/* ═══════════════════════════════════════
   Obys® Experiment Space — Script JS
   Matches exact GSAP reveal animation from Obys Preloader
   ═══════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const preloader = document.getElementById("preloader");
  const lineFill = document.querySelector(".preloader-line-fill");
  const percent  = document.querySelector(".preloader-percent");
  const navTime  = document.getElementById("nav-time");
  const btnReplay = document.getElementById("btn-replay");

  const DURATION = 3200; // 3.2s preloader counter duration

  // ── Live clock in navbar ──
  function tickClock() {
    if (!navTime) return;
    const now = new Date();
    navTime.textContent = now.toLocaleTimeString("en-US", {
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
    });
  }
  tickClock();
  setInterval(tickClock, 1000);

  // Function to run full Obys reveal animation
  function runObysAnimation() {
    // Reset positions & opacity
    gsap.killTweensOf("*");

    // Reset preloader state
    gsap.set(preloader, { display: "block", pointerEvents: "auto" });
    gsap.set([".preloader-top", ".preloader-bottom"], { yPercent: 0 });
    gsap.set([".preloader-title", ".preloader-percent", ".preloader-line"], { opacity: 0, display: "block" });
    if (lineFill) lineFill.style.width = "0%";
    if (percent) percent.textContent = "00";

    // Set initial masked state for hero & modal items (exact Obys reveal parameters)
    const heroItems = [
      document.querySelector(".hero-reveal-bottom"),
      document.querySelector(".hero-reveal-top"),
      document.querySelector(".hero-reveal-logo"),
      document.querySelector(".hero-sub")
    ].filter(Boolean);

    gsap.set(heroItems, { yPercent: 120, opacity: 0 });

    // Select all mask-reveal elements inside modal
    const modalItems = document.querySelectorAll(".modal-card .mask-reveal");
    gsap.set(modalItems, { yPercent: 120, opacity: 0 });
    gsap.set(".modal-card", { scale: 0.96, opacity: 0 });

    // ── Phase 1: Fade in preloader details ──
    gsap.to([".preloader-title", ".preloader-percent", ".preloader-line"], {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    });

    // ── Phase 2: Animate progress 0 → 100% ──
    const startTime = performance.now();
    function animateLoader(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const value = progress * 100;
      if (lineFill) lineFill.style.width = value + "%";
      if (percent) percent.textContent = Math.floor(value).toString().padStart(2, "0");

      if (progress < 1) {
        requestAnimationFrame(animateLoader);
      }
    }
    requestAnimationFrame(animateLoader);

    // ── Phase 3: Fade out preloader details (at DURATION + 50ms) ──
    setTimeout(() => {
      gsap.to([".preloader-title", ".preloader-percent", ".preloader-line"], {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
        onComplete: () => {
          gsap.set([".preloader-title", ".preloader-percent", ".preloader-line"], { display: "none" });
        }
      });
    }, DURATION + 50);

    // ── Phase 4: Split curtain reveal (at DURATION + 250ms) ──
    setTimeout(() => {
      gsap.to(".preloader-top",    { yPercent: -100, duration: 1.2, ease: "expo.inOut" });
      gsap.to(".preloader-bottom", { yPercent:  100, duration: 1.2, ease: "expo.inOut" });
      gsap.set(preloader, { pointerEvents: "none", display: "none", delay: 1.4 });
    }, DURATION + 250);

    // ── Phase 5: Obys Hero text reveal (staggered upward with expo.out) ──
    const heroTl = gsap.timeline({ delay: (DURATION + 550) / 1000 });

    heroItems.forEach((item, index) => {
      heroTl.to(item, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out"
      }, index === 0 ? 0 : "-=1.05");
    });

    // ── Phase 6: EJO Modal Reveal (Obys style smooth staggered reveal) ──
    heroTl.to(".modal-card", {
      scale: 1,
      opacity: 1,
      duration: 1.0,
      ease: "expo.out"
    }, "-=0.8");

    heroTl.to(modalItems, {
      yPercent: 0,
      opacity: 1,
      duration: 1.0,
      ease: "expo.out",
      stagger: 0.04
    }, "-=0.7");
  }

  // Run on page load
  runObysAnimation();

  // Replay button listener
  if (btnReplay) {
    btnReplay.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      runObysAnimation();
    });
  }

  // Interactive Upload mock
  const mockUpload = document.getElementById("modal-upload-mock");
  const fileInput = document.getElementById("modal-attachment");
  const uploadSpan = document.getElementById("modal-upload-span");

  if (mockUpload && fileInput) {
    mockUpload.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        uploadSpan.textContent = `${e.target.files.length} file dipilih`;
      }
    });
  }

  // Interactive Status Button Group
  const statusBtns = document.querySelectorAll(".btn-status-change");
  const checkingSub = document.getElementById("checking-sub-options");
  const modalStatusBadge = document.getElementById("modal-ejo-status");

  statusBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      statusBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const status = btn.getAttribute("data-status");
      if (modalStatusBadge) {
        modalStatusBadge.textContent = status;
      }

      if (checkingSub) {
        checkingSub.style.display = (status === "Checking") ? "flex" : "none";
      }
    });
  });
});
