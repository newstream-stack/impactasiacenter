import { useEffect, useRef, useState } from 'react';
import styles from './IntroAnimation.module.css';

export default function IntroAnimation() {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const img = new Image();
    img.src = '/hero.png';

    let rafId;

    img.onload = () => {
      // Sample pixel colors from the image
      ctx.drawImage(img, 0, 0, W, H);
      const imageData = ctx.getImageData(0, 0, W, H);
      const data = imageData.data;

      const SIZE = 5; // particle size in px
      const particles = [];

      for (let y = 0; y < H; y += SIZE) {
        for (let x = 0; x < W; x += SIZE) {
          const i = (y * W + x) * 4;
          particles.push({
            x,
            y,
            r: data[i],
            g: data[i + 1],
            b: data[i + 2],
            a: data[i + 3] / 255,
            vx: (Math.random() - 0.5) * 60,   // horizontal drift px/s
            delay: Math.random() * 1000,         // stagger start ms
          });
        }
      }

      const HOLD = 1500;      // ms to show static image
      const DISSOLVE = 1600;  // ms for particles to fall
      const GRAVITY = 280;    // px/s²

      let startTime = null;

      function animate(ts) {
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;

        ctx.clearRect(0, 0, W, H);

        if (elapsed < HOLD) {
          ctx.drawImage(img, 0, 0, W, H);
          rafId = requestAnimationFrame(animate);
          return;
        }

        const dElapsed = elapsed - HOLD;
        let anyAlive = false;

        for (const p of particles) {
          const t = Math.max(0, dElapsed - p.delay) / 1000; // seconds since this particle started

          const px = p.x + p.vx * t;
          const py = p.y + 0.5 * GRAVITY * t * t;
          const alpha = Math.max(0, p.a * (1 - t / (DISSOLVE / 1000)));

          if (alpha > 0.01) {
            ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
            ctx.fillRect(px, py, SIZE, SIZE);
            anyAlive = true;
          }
        }

        if (anyAlive) {
          rafId = requestAnimationFrame(animate);
        } else {
          setVisible(false);
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    img.onerror = () => {
      setTimeout(() => setVisible(false), 500);
    };

    return () => cancelAnimationFrame(rafId);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.introContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
