import { useEffect, useRef, useState } from 'react';
import styles from './IntroAnimation.module.css';

const TOTAL_DURATION = 5000;
const PARTICLE_COUNT = 80;

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function initParticles() {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    angle: Math.random() * Math.PI * 2,
    dist: Math.random() * 0.6 + 0.1,
    speed: Math.random() * 0.3 + 0.05,
    size: Math.random() * 2.5 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    drift: (Math.random() - 0.5) * 0.8,
    phase: Math.random() * Math.PI * 2,
  }));
}

export default function IntroAnimation() {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const img = new Image();
    img.src = '/hero.png';

    img.onload = () => {
      const imgRatio = img.width / img.height;
      const screenRatio = canvas.width / canvas.height;
      let drawW, drawH;

      if (screenRatio > imgRatio) {
        drawW = canvas.width;
        drawH = canvas.width / imgRatio;
      } else {
        drawH = canvas.height;
        drawW = canvas.height * imgRatio;
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxR = Math.sqrt(cx * cx + cy * cy) * 1.3;
      const particles = initParticles();

      let startTime = null;
      let animFrameId = null;

      function animate(time) {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / TOTAL_DURATION, 1);

        // Walking camera bob (上下晃動)
        const walkFreq = 1.6;
        const walkAmp = canvas.height * 0.007;
        const bobWindow = Math.sin(Math.PI * Math.min(progress / 0.85, 1)); // fade bob in/out
        const bob = Math.sin(elapsed * 0.001 * Math.PI * 2 * walkFreq) * walkAmp * bobWindow;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // --- 光圈半徑計算 ---
        let lightR, imgAlpha;
        if (progress < 0.08) {
          // 黑暗中光點浮現
          lightR = easeOut(progress / 0.08) * maxR * 0.04;
          imgAlpha = 0;
        } else if (progress < 0.82) {
          // 走向光芒：穩定擴大
          const p = (progress - 0.08) / 0.74;
          lightR = (0.04 + easeInOut(p) * 0.5) * maxR;
          imgAlpha = easeOut(Math.min(p * 2, 1));
        } else {
          // 光芒爆炸填滿螢幕
          const p = (progress - 0.82) / 0.18;
          lightR = (0.54 + easeOut(p) * 0.76) * maxR;
          imgAlpha = 1;
        }

        const centerX = cx;
        const centerY = cy + bob;

        // --- 繪製縮放中的英雄圖（在光圈內可見）---
        if (lightR > 2 && imgAlpha > 0) {
          // 鏡頭前進：從 1.35 倍縮放到 1.0
          const zoom = 1.35 - easeOut(Math.min(progress / 0.82, 1)) * 0.35;
          const zW = drawW * zoom;
          const zH = drawH * zoom;

          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, lightR, 0, Math.PI * 2);
          ctx.clip();
          ctx.globalAlpha = imgAlpha;
          ctx.drawImage(img, centerX - zW / 2, centerY - zH / 2 + bob, zW, zH);
          ctx.globalAlpha = 1;
          ctx.restore();
        }

        // --- 光暈 bloom（疊加模式）---
        if (lightR > 1) {
          const bloomAlpha = progress > 0.82 ? 1 - (progress - 0.82) / 0.18 : 1;
          ctx.save();
          ctx.globalCompositeOperation = 'screen';

          const bloom = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, lightR * 1.5);
          bloom.addColorStop(0,   `rgba(255, 248, 210, ${0.7 * bloomAlpha})`);
          bloom.addColorStop(0.25, `rgba(255, 220, 140, ${0.45 * bloomAlpha})`);
          bloom.addColorStop(0.6,  `rgba(255, 190,  80, ${0.15 * bloomAlpha})`);
          bloom.addColorStop(1,    'rgba(255, 160,  30, 0)');

          ctx.fillStyle = bloom;
          ctx.beginPath();
          ctx.arc(centerX, centerY, lightR * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // --- 浮動塵埃粒子（在光束範圍內）---
        if (lightR > maxR * 0.06 && progress < 0.88) {
          const particleVisible = Math.min((progress - 0.06) / 0.15, 1) * (1 - Math.max(0, (progress - 0.78) / 0.1));
          particles.forEach((p) => {
            const t = elapsed * 0.001 * p.speed + p.phase;
            const r = lightR * p.dist * (0.4 + 0.6 * Math.abs(Math.sin(t * 0.5)));
            const angle = p.angle + t * 0.15 + p.drift * 0.3;
            const px = centerX + Math.cos(angle) * r;
            const py = centerY + Math.sin(angle) * r + bob;

            ctx.save();
            ctx.globalAlpha = p.opacity * particleVisible * (r / (lightR * p.dist + 0.001));
            ctx.fillStyle = `rgba(255, 240, 180, 1)`;
            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
        }

        // --- 暗角遮罩（外圍黑暗）---
        const darkProgress = Math.max(0, 1 - progress * 1.35);
        if (darkProgress > 0) {
          const vignette = ctx.createRadialGradient(
            centerX, centerY, lightR * 0.5,
            centerX, centerY, maxR
          );
          vignette.addColorStop(0,   'rgba(0,0,0,0)');
          vignette.addColorStop(0.3, `rgba(0,0,0,${0.5 * darkProgress})`);
          vignette.addColorStop(1,   `rgba(0,0,0,${Math.min(darkProgress + 0.1, 1)})`);

          ctx.fillStyle = vignette;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // --- 最終白光爆炸 ---
        if (progress > 0.82) {
          const flashP = (progress - 0.82) / 0.18;
          ctx.fillStyle = `rgba(255, 248, 230, ${easeOut(flashP)})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        if (progress >= 1) {
          setVisible(false);
          return;
        }

        animFrameId = requestAnimationFrame(animate);
      }

      animFrameId = requestAnimationFrame(animate);

      return () => {
        if (animFrameId) cancelAnimationFrame(animFrameId);
      };
    };

    img.onerror = () => setVisible(false);

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.introContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
