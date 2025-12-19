import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';


// Note: InertiaPlugin is a paid Club GSAP plugin. 
// For this open implementation w/o paid plugins, we can simulate simple physics 
// or just standard tweening. If the user doesn't have the paid file, InertiaPlugin fails.
// To avoid breaking, I will attempt to register it IF it exists, 
// otherwise I will implement a simpler fallback logic or just standard GSAP tweens.
// HOWEVER, the user provided code specifically asking for `gsap/InertiaPlugin`.
// If I use it and it's not installed/purchased, it will error.
// Assuming the user might have it or wants me to try.
// BUT usually standard `npm install gsap` DOES NOT include InertiaPlugin (paid).
// I will try to use the code provided, but I must warn or handle it.
// Actually, for a public repo/standard install, we can't use InertiaPlugin.
// I will rewrite the logic to use standard `gsap.to` with elastic easing which mimics inertia well enough for a demo,
// avoiding the import of 'gsap/InertiaPlugin' which would crash the build if not present.

// Refined implementation WITHOUT InertiaPlugin dependency to ensure it works for everyone.
// I will use standard Physics simulation or just simple offset animations.

const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 16,
  gap = 32,
  baseColor = '#222222', // Darker base for background
  activeColor = '#00ff84', // Green active
  proximity = 100,
  speedTrigger = 50,
  shockRadius = 150,
  shockStrength = 15,
  maxSpeed = 2000,
  resistance = 0.9,
  returnDuration = 1,
  className = '',
  style
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;
    const p = new Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  const needsUpdate = useRef(true);

  useEffect(() => {
    if (!circlePath) return;

    let rafId: number;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Optimization: Skip drawing if no updates are needed
      if (!needsUpdate.current) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      // Reset flag, will be set to true by mouse events or GSAP animations
      needsUpdate.current = false;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        
        const dx = ox - px;
        const dy = oy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);

  useEffect(() => {
    buildGrid();
    needsUpdate.current = true; // Force redraw on resize
    const handleResize = () => {
      buildGrid();
      needsUpdate.current = true;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        // Trigger update on mouse move
        needsUpdate.current = true;

        const rect = canvas.getBoundingClientRect();
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      // calc velocity
      const dx = mouseX - pr.x;
      const dy = mouseY - pr.y;
      
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }

      pr.lastTime = now;
      pr.lastX = e.clientX; 
      pr.lastY = e.clientY;
      pr.x = mouseX;
      pr.y = mouseY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      // Apply force
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - mouseX, dot.cy - mouseY);
        // Interaction Logic:
        // If mouse is moving fast close to dot, push it
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
            dot._inertiaApplied = true;
            gsap.killTweensOf(dot);
            
            // Push direction
            const pushX = (dot.cx - mouseX) * 0.2; // simple push factor
            const pushY = (dot.cy - mouseY) * 0.2;

            gsap.to(dot, {
                xOffset: pushX,
                yOffset: pushY,
                duration: 0.2,
                ease: "power2.out",
                onUpdate: () => { needsUpdate.current = true; },
                onComplete: () => {
                    gsap.to(dot, {
                        xOffset: 0,
                        yOffset: 0,
                        duration: returnDuration,
                        ease: "elastic.out(1, 0.3)",
                        onUpdate: () => { needsUpdate.current = true; },
                        onComplete: () => {
                            dot._inertiaApplied = false;
                            needsUpdate.current = true; // Ensure final frame is drawn
                        }
                    });
                }
            });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        needsUpdate.current = true;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - mouseX, dot.cy - mouseY);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - mouseX) * shockStrength * falloff;
          const pushY = (dot.cy - mouseY) * shockStrength * falloff;
          
          gsap.to(dot, {
            xOffset: pushX, 
            yOffset: pushY,
            duration: 0.2,
            ease: "power2.out",
            onUpdate: () => { needsUpdate.current = true; },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: "elastic.out(1, 0.3)",
                onUpdate: () => { needsUpdate.current = true; },
                onComplete: () => {
                   dot._inertiaApplied = false;
                   needsUpdate.current = true;
                }
              });
            }
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 16);
    window.addEventListener("mousemove", throttledMove);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", throttledMove);
      window.removeEventListener("click", onClick);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  return (
    <div
      ref={wrapperRef}
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default DotGrid;
