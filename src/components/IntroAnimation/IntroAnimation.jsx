import { useEffect, useRef, useState } from 'react';

const HOLD_MS = 1500;
const DISSOLVE_MS = 1800;
const GRAVITY = 320;
const COLS = 40;
const ROWS = 25;

export default function IntroAnimation() {
  const canvasRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const CW = canvas.width = window.innerWidth;
    const CH = canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const tileW = CW / COLS;
    const tileH = CH / ROWS;

    // Build tile grid
    const tiles = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        tiles.push({
          col, row,
          vx: (Math.random() - 0.5) * 80,
          delay: Math.random() * 900,
        });
      }
    }

    const img = new Image();

    img.onload = () => {
      // Draw full image first (hold phase)
      ctx.drawImage(img, 0, 0, CW, CH);

      let startTime = null;
      let rafId;

      function animate(ts) {
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;

        ctx.clearRect(0, 0, CW, CH);

        if (elapsed < HOLD_MS) {
          ctx.drawImage(img, 0, 0, CW, CH);
          rafId = requestAnimationFrame(animate);
          return;
        }

        const dElapsed = elapsed - HOLD_MS;
        let alive = false;

        for (const tile of tiles) {
          const t = Math.max(0, dElapsed - tile.delay) / 1000;
          const alpha = Math.max(0, 1 - t / (DISSOLVE_MS / 1000));
          if (alpha < 0.01) continue;

          alive = true;
          const srcX = tile.col * tileW;
          const srcY = tile.row * tileH;
          const dx = tile.vx * t;
          const dy = 0.5 * GRAVITY * t * t;

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.drawImage(img, srcX, srcY, tileW, tileH, srcX + dx, srcY + dy, tileW, tileH);
          ctx.restore();
        }

        if (alive) {
          rafId = requestAnimationFrame(animate);
        } else {
          setDone(true);
        }
      }

      rafId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(rafId);
    };

    img.onerror = () => {
      // Draw placeholder so screen isn't just black
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, CW, CH);
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.font = `${CW * 0.025}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('請將開場圖片放至 public/hero.png', CW / 2, CH / 2);
      setTimeout(() => setDone(true), 2000);
    };

    img.src = '/hero.png';
  }, []);

  if (done) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      zIndex: 99999,
      background: '#000',
      pointerEvents: 'none',
    }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
