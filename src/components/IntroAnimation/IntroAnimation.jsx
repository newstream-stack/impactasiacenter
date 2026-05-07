import { useEffect, useRef, useState } from 'react';

const HOLD_MS = 1500;
const DISSOLVE_MS = 1800;
const GRAVITY = 260;   // px/s²
const PARTICLE = 5;    // px

export default function IntroAnimation() {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('hold'); // hold | dissolve | done

  // Start dissolve after HOLD_MS
  useEffect(() => {
    const t = setTimeout(() => setPhase('dissolve'), HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  // Run canvas particle animation when dissolve phase starts
  useEffect(() => {
    if (phase !== 'dissolve') return;

    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const ctx = canvas.getContext('2d');

    // Draw img into offscreen canvas to sample pixels
    const off = document.createElement('canvas');
    off.width = window.innerWidth;
    off.height = window.innerHeight;
    const octx = off.getContext('2d');
    octx.drawImage(img, 0, 0, off.width, off.height);

    canvas.width = off.width;
    canvas.height = off.height;

    let imageData;
    try {
      imageData = octx.getImageData(0, 0, off.width, off.height);
    } catch (e) {
      // tainted canvas fallback — just fade out
      setPhase('done');
      return;
    }

    const data = imageData.data;
    const CW = off.width;
    const CH = off.height;

    const particles = [];
    for (let y = 0; y < CH; y += PARTICLE) {
      for (let x = 0; x < CW; x += PARTICLE) {
        const i = (y * CW + x) * 4;
        const a = data[i + 3];
        if (a === 0) continue;
        particles.push({
          x, y,
          r: data[i], g: data[i + 1], b: data[i + 2], a: a / 255,
          vx: (Math.random() - 0.5) * 70,
          delay: Math.random() * 900,
        });
      }
    }

    let startTime = null;
    let rafId;

    function animate(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      ctx.clearRect(0, 0, CW, CH);

      let alive = false;
      for (const p of particles) {
        const t = Math.max(0, elapsed - p.delay) / 1000;
        const alpha = Math.max(0, p.a * (1 - t / (DISSOLVE_MS / 1000)));
        if (alpha < 0.01) continue;

        alive = true;
        const px = p.x + p.vx * t;
        const py = p.y + 0.5 * GRAVITY * t * t;
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
        ctx.fillRect(px, py, PARTICLE, PARTICLE);
      }

      if (alive) {
        rafId = requestAnimationFrame(animate);
      } else {
        setPhase('done');
      }
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      zIndex: 99999,
      background: '#000',
      pointerEvents: 'none',
    }}>
      {/* Real image — shown during hold phase */}
      <img
        ref={imgRef}
        src="/hero.png"
        alt=""
        onError={(e) => { e.target.style.display = 'none'; }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: phase === 'hold' ? 1 : 0,
        }}
      />
      {/* Canvas — takes over during dissolve phase */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          display: phase === 'dissolve' ? 'block' : 'none',
        }}
      />
    </div>
  );
}
