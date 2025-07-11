'use client';
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// CATATAN PENTING:
// SplitText adalah plugin premium GSAP yang memerlukan lisensi Club GreenSock.
// Untuk menggunakan plugin ini secara legal, Anda perlu berlangganan di: https://greensock.com/club/
// 
// Alternatif gratis untuk SplitText:
// 1. Implementasi manual seperti di bawah
// 2. Gunakan library seperti "split-type" (https://github.com/lukePeavey/SplitType)

// Implementasi manual untuk split text tanpa plugin premium
const manualSplitText = (element, type) => {
  const text = element.textContent;
  element.textContent = '';
  
  if (type === "chars" || type === "chars, words") {
    return text.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      element.appendChild(span);
      return span;
    });
  } else if (type === "words") {
    return text.split(' ').map(word => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.marginRight = '0.25em';
      element.appendChild(span);
      return span;
    });
  } else if (type === "lines") {
    // Implementasi sederhana untuk lines (tidak sempurna)
    return text.split('\n').map(line => {
      const div = document.createElement('div');
      div.textContent = line;
      div.style.display = 'block';
      element.appendChild(div);
      return div;
    });
  }
  
  return [];
};

// Pastikan plugin GSAP terdaftar di sisi client
const registerGSAP = () => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    
    // Simulasi SplitText plugin karena memerlukan lisensi Club GreenSock
    if (!window.SplitText) {
      window.SplitText = class SplitText {
        constructor(element, options) {
          this.element = element;
          this.options = options;
          this.chars = [];
          this.words = [];
          this.lines = [];
          
          this.split();
        }
        
        split() {
          const element = this.element;
          const text = element.textContent;
          element.textContent = '';
          
          if (this.options.type.includes('chars')) {
            this.chars = text.split('').map(char => {
              const span = document.createElement('span');
              span.textContent = char === ' ' ? '\u00A0' : char;
              span.style.display = 'inline-block';
              span.style.position = this.options.absolute ? 'absolute' : 'relative';
              element.appendChild(span);
              return span;
            });
          }
          
          if (this.options.type.includes('words')) {
            this.words = text.split(' ').map(word => {
              const span = document.createElement('span');
              span.textContent = word;
              span.style.display = 'inline-block';
              span.style.position = this.options.absolute ? 'absolute' : 'relative';
              span.style.marginRight = '0.25em';
              
              if (!this.options.type.includes('chars')) {
                element.appendChild(span);
              }
              
              return span;
            });
          }
          
          if (this.options.type.includes('lines')) {
            const lineClass = this.options.linesClass || '';
            this.lines = text.split('\n').map(line => {
              const div = document.createElement('div');
              div.textContent = line;
              div.style.display = 'block';
              div.style.position = this.options.absolute ? 'absolute' : 'relative';
              div.className = lineClass;
              
              if (!this.options.type.includes('chars') && !this.options.type.includes('words')) {
                element.appendChild(div);
              }
              
              return div;
            });
          }
        }
        
        revert() {
          const element = this.element;
          const originalText = Array.from(element.childNodes).map(node => node.textContent).join('');
          element.innerHTML = '';
          element.textContent = originalText;
        }
      };
    }
  }
};

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);

  useEffect(() => {
    registerGSAP();
    
    const el = ref.current;
    if (!el || animationCompletedRef.current) return;

    const absoluteLines = splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    const splitter = new window.SplitText(el, {
      type: splitType,
      absolute: absoluteLines,
      linesClass: "split-line",
    });

    let targets;
    switch (splitType) {
      case "lines":
        targets = splitter.lines;
        break;
      case "words":
        targets = splitter.words;
        break;
      case "words, chars":
        targets = [...splitter.words, ...splitter.chars];
        break;
      default:
        targets = splitter.chars;
    }

    targets.forEach((t) => {
      t.style.willChange = "transform, opacity";
    });

    const startPct = (1 - threshold) * 100;
    const m = /^(-?\d+)px$/.exec(rootMargin);
    const raw = m ? parseInt(m[1], 10) : 0;
    const sign = raw < 0 ? `-=${Math.abs(raw)}px` : `+=${raw}px`;
    const start = `top ${startPct}%${sign}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
        once: true,
      },
      smoothChildTiming: true,
      onComplete: () => {
        animationCompletedRef.current = true;
        gsap.set(targets, {
          ...to,
          clearProps: "willChange",
          immediateRender: true,
        });
        onLetterAnimationComplete?.();
      },
    });

    tl.set(targets, { ...from, immediateRender: false, force3D: true });
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(targets);
      splitter.revert();
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onLetterAnimationComplete,
  ]);

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: "break-word",
      }}
    >
      {text}
    </p>
  );
};

export default SplitText; 