'use client';
import React, { useEffect, useRef, useCallback, useMemo, useState, memo } from "react";
import "./ProfileCardStyle.css";

// Optimized gradient definitions with reduced complexity for better performance
const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

// Animation configuration with optimized values for smoother animations
const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 500, // Reduced from 600 for faster response
  INITIAL_DURATION: 1200, // Reduced from 1500 for faster initial load
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEBOUNCE_DELAY: 16, // Adjusted to match 60fps frame rate
};

// Image style constants
const IMAGE_STYLE = {
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  transition: 'opacity 0.5s ease-in-out',
  willChange: 'opacity, transform',
  overflow: 'clip',
  overflowClipMargin: 'content-box'
};

const MINI_IMAGE_STYLE = {
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  transition: 'opacity 0.3s ease',
  willChange: 'opacity',
  overflow: 'clip',
  overflowClipMargin: 'content-box'
};

// Utility functions for animation calculations
const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const round = (value, precision = 3) =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value,
  fromMin,
  fromMax,
  toMin,
  toMax
) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

// Debounce function to limit the frequency of function calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const ProfileCardComponent = ({
  avatarUrl = "/images/khayyis-profile.jpg",
  iconUrl = "",
  grainUrl = "",
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  
  // State untuk melacak status loading dan error pada gambar
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [miniAvatarLoaded, setMiniAvatarLoaded] = useState(false);
  const [miniAvatarError, setMiniAvatarError] = useState(false);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;

    const updateCardTransform = (
      offsetX,
      offsetY,
      card,
      wrap
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (
      duration,
      startX,
      startY,
      card,
      wrap
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  // Optimized pointer move handler using requestAnimationFrame
  const handlePointerMove = useCallback(
    debounce((event) => {
      // Store event values since the event object will be nullified
      const clientX = event.clientX;
      const clientY = event.clientY;
      
      requestAnimationFrame(() => {
        const card = cardRef.current;
        const wrap = wrapRef.current;

        if (!card || !wrap || !animationHandlers) return;

        const rect = card.getBoundingClientRect();
        animationHandlers.updateCardTransform(
          clientX - rect.left,
          clientY - rect.top,
          card,
          wrap
        );
      });
    }, ANIMATION_CONFIG.DEBOUNCE_DELAY),
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [animationHandlers]
  );

  // Preload avatar images untuk meningkatkan performa loading
  useEffect(() => {
    // Fungsi untuk preload gambar dengan timeout
    const preloadImage = (url, onLoad, onError) => {
      if (!url) return;
      
      const img = new Image();
      const timeoutId = setTimeout(() => {
        // Jika loading terlalu lama, anggap error
        onError();
      }, 5000); // 5 detik timeout
      
      img.onload = () => {
        clearTimeout(timeoutId);
        onLoad();
      };
      
      img.onerror = () => {
        clearTimeout(timeoutId);
        onError();
      };
      
      // Gunakan cache browser
      img.src = url;
    };
    
    // Preload avatar utama
    if (avatarUrl) {
      preloadImage(
        avatarUrl,
        () => {
          setAvatarLoaded(true);
          setAvatarError(false);
        },
        () => {
          setAvatarError(true);
          setAvatarLoaded(false);
        }
      );
    }
    
    // Preload mini avatar jika berbeda dengan avatar utama
    if (miniAvatarUrl && miniAvatarUrl !== avatarUrl) {
      preloadImage(
        miniAvatarUrl,
        () => {
          setMiniAvatarLoaded(true);
          setMiniAvatarError(false);
        },
        () => {
          setMiniAvatarError(true);
          setMiniAvatarLoaded(false);
        }
      );
    } else if (miniAvatarUrl === avatarUrl) {
      // Jika mini avatar sama dengan avatar utama, gunakan status yang sama
      setMiniAvatarLoaded(avatarLoaded);
      setMiniAvatarError(avatarError);
    }
  }, [avatarUrl, miniAvatarUrl, avatarLoaded, avatarError]);

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap) return;

    const pointerMoveHandler = handlePointerMove;
    const pointerEnterHandler = handlePointerEnter;
    const pointerLeaveHandler = handlePointerLeave;

    card.addEventListener("pointerenter", pointerEnterHandler);
    card.addEventListener("pointermove", pointerMoveHandler);
    card.addEventListener("pointerleave", pointerLeaveHandler);

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap
    );

    return () => {
      card.removeEventListener("pointerenter", pointerEnterHandler);
      card.removeEventListener("pointermove", pointerMoveHandler);
      card.removeEventListener("pointerleave", pointerLeaveHandler);
      animationHandlers.cancelAnimation();
    };
  }, [
    enableTilt,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
  ]);

  const cardStyle = useMemo(
    () =>
    ({
      "--icon": iconUrl ? `url(${iconUrl})` : "none",
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--behind-gradient": showBehindGradient
        ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT)
        : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
    }),
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]
  );

  // Handler untuk loading avatar utama
  const handleAvatarLoad = useCallback(() => {
    setAvatarLoaded(true);
    setAvatarError(false);
  }, []);
  
  // Fallback image constant
  const FALLBACK_IMAGE = "/images/khayyis-profile.jpg";
  
  // Handler untuk error avatar utama
  const handleAvatarError = useCallback((e) => {
    // Prevent infinite error loops
    if (e.target.src === FALLBACK_IMAGE) {
      setAvatarError(true);
      setAvatarLoaded(false);
      return;
    }
    
    setAvatarError(true);
    setAvatarLoaded(false);
    
    // Apply error styling
    const target = e.target;
    target.style.opacity = "0.7";
    
    // Use fallback image if available
    if (avatarUrl !== FALLBACK_IMAGE) {
      console.warn(`Avatar image failed to load: ${avatarUrl}, using fallback`);
      target.src = FALLBACK_IMAGE;
    }
  }, [avatarUrl]);
  
  // Handler untuk loading mini avatar
  const handleMiniAvatarLoad = useCallback(() => {
    setMiniAvatarLoaded(true);
    setMiniAvatarError(false);
  }, []);
  
  // Handler untuk error mini avatar
  const handleMiniAvatarError = useCallback((e) => {
    // Prevent infinite error loops
    if (e.target.src === FALLBACK_IMAGE) {
      setMiniAvatarError(true);
      setMiniAvatarLoaded(false);
      return;
    }
    
    setMiniAvatarError(true);
    setMiniAvatarLoaded(false);
    
    // Apply error styling
    const target = e.target;
    target.style.opacity = "0.7";
    
    // Try main avatar as fallback first
    if (miniAvatarUrl !== avatarUrl) {
      console.warn(`Mini avatar image failed to load: ${miniAvatarUrl}, trying main avatar`);
      target.src = avatarUrl;
    } 
    // If main avatar is not the fallback image, use the fallback
    else if (avatarUrl !== FALLBACK_IMAGE) {
      console.warn(`Both avatar images failed to load, using fallback`);
      target.src = FALLBACK_IMAGE;
    }
  }, [miniAvatarUrl, avatarUrl]);

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`.trim()}
      style={cardStyle}
    >
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />
          <div className="pc-content pc-avatar-content">
            <div className="avatar-container">
              {/* Placeholder saat loading */}
              {!avatarLoaded && !avatarError && (
                <div className="avatar-loading">
                  <div className="avatar-loading-spinner"></div>
                </div>
              )}
              
              {/* Gambar avatar utama dengan lazy loading */}
              <img
                className={`pc-avatar-content ${avatarLoaded ? 'loaded' : ''} ${avatarError ? 'avatar-error' : ''}`}
                src={avatarUrl}
                alt={`${name || "User"} avatar`}
                loading="lazy"
                onLoad={handleAvatarLoad}
                onError={handleAvatarError}
                style={IMAGE_STYLE}
                fetchPriority="high"
                decoding="async"
                width="300"
                height="300"
              />
              
              {/* Indikator error */}
              {avatarError && (
                <div className="avatar-error-indicator">
                  <span>!</span>
                </div>
              )}
            </div>
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    {/* Placeholder saat loading */}
                    {!miniAvatarLoaded && !miniAvatarError && (
                      <div className="mini-avatar-loading">
                        <div className="mini-avatar-loading-spinner"></div>
                      </div>
                    )}
                    
                    {/* Gambar mini avatar dengan lazy loading */}
                    <img
                      className={`${miniAvatarLoaded ? 'mini-avatar-loaded' : ''} ${miniAvatarError ? 'mini-avatar-error' : ''}`}
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${name || "User"} mini avatar`}
                      loading="lazy"
                      onLoad={handleMiniAvatarLoad}
                      onError={handleMiniAvatarError}
                      style={MINI_IMAGE_STYLE}
                      decoding="async"
                      width="48"
                      height="48"
                    />
                    
                    {/* Indikator error */}
                    {miniAvatarError && (
                      <div className="mini-avatar-error-indicator">
                        <span>!</span>
                      </div>
                    )}
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle">@{handle}</div>
                    <div className="pc-status whitespace-nowrap">{status}</div>
                  </div>
                </div>
                <button
                  className="pc-contact-btn"
                  onClick={handleContactClick}
                  style={{ pointerEvents: "auto" }}
                  type="button"
                  aria-label={`Contact ${name || "user"}`}
                >
                  <div className="flex items-center justify-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </div>
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Menggunakan React.memo dengan custom comparison function untuk mencegah re-render yang tidak perlu
const ProfileCard = React.memo(ProfileCardComponent, (prevProps, nextProps) => {
  // Hanya re-render jika props penting berubah
  return (
    prevProps.avatarUrl === nextProps.avatarUrl &&
    prevProps.miniAvatarUrl === nextProps.miniAvatarUrl &&
    prevProps.name === nextProps.name &&
    prevProps.title === nextProps.title &&
    prevProps.handle === nextProps.handle &&
    prevProps.status === nextProps.status &&
    prevProps.enableTilt === nextProps.enableTilt &&
    prevProps.showUserInfo === nextProps.showUserInfo
  );
});

export default ProfileCard;