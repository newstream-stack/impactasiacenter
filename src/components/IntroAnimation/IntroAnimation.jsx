import { useEffect, useRef, useState } from 'react';
import styles from './IntroAnimation.module.css';

export default function IntroAnimation() {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // 設定全螢幕尺寸
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const img = new Image();
    img.src = '/hero.png';
    
    img.onload = () => {
      // 類似 CSS object-fit: cover 的計算
      const imgRatio = img.width / img.height;
      const screenRatio = canvas.width / canvas.height;
      let drawW, drawH, drawX, drawY;
      
      if (screenRatio > imgRatio) {
        drawW = canvas.width;
        drawH = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      } else {
        drawH = canvas.height;
        drawW = canvas.height * imgRatio;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      }

      // 1. 圖片優雅漸顯動畫 (Fade-in)
      let fadeInStart = null;
      const fadeInDuration = 1200; // 淡入耗時 1.2 秒

      function fadeIn(time) {
        if (!fadeInStart) fadeInStart = time;
        const progress = (time - fadeInStart) / fadeInDuration;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (progress >= 1) {
          ctx.globalAlpha = 1;
          ctx.drawImage(img, drawX, drawY, drawW, drawH);
          startSandificationPrep(); // 漸顯完成後，準備沙化
        } else {
          // 平滑的 ease-in-out
          const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
          ctx.globalAlpha = ease;
          ctx.drawImage(img, drawX, drawY, drawW, drawH);
          requestAnimationFrame(fadeIn);
        }
      }
      
      // 開始淡入
      requestAnimationFrame(fadeIn);

      // 2. 準備「薩諾斯彈指」的沙化圖層
      function startSandificationPrep() {
        // 延遲一點點時間（讓使用者看清楚圖片），再開始背景計算
        setTimeout(() => {
          const numLayers = 32; // 將圖片拆成 32 個獨立沙化圖層
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        
        // 建立 32 個空白的像素陣列
        const layerData = Array.from({ length: numLayers }, () => 
          new Uint8ClampedArray(pixels.length)
        );

        // 掃描每一個像素，將其隨機分配到 32 個圖層中
        for (let i = 0; i < pixels.length; i += 4) {
          if (pixels[i + 3] === 0) continue; // 略過透明像素
          
          const x = (i / 4) % canvas.width;
          const nx = x / canvas.width; // 0 (左) 到 1 (右)
          
          // 讓沙化有方向性（從左到右逐漸剝落）
          // 左邊的像素會有較小的 layerIndex
          let weight = nx + (Math.random() * 0.5 - 0.25);
          if (weight < 0) weight = 0;
          if (weight >= 1) weight = 0.99;
          
          const layerIndex = Math.floor(weight * numLayers);
          
          layerData[layerIndex][i] = pixels[i];
          layerData[layerIndex][i+1] = pixels[i+1];
          layerData[layerIndex][i+2] = pixels[i+2];
          layerData[layerIndex][i+3] = pixels[i+3];
        }

        // 將 32 個像素陣列轉為 32 張隱藏的 Canvas 畫布
        const offCanvases = layerData.map(data => {
          const c = document.createElement('canvas');
          c.width = canvas.width;
          c.height = canvas.height;
          const cCtx = c.getContext('2d');
          cCtx.putImageData(new ImageData(data, canvas.width, canvas.height), 0, 0);
          return {
            canvas: c,
            // 賦予每個圖層一個隨機的吹散速度與方向 (向右上角吹散)
            vx: (Math.random() - 0.1) * 350, 
            vy: (Math.random() - 0.9) * 350  
          };
        });

        // 3. 開始沙化飄散動畫
        let startTime = null;
        const duration = 4000; // 飄散動畫總長 4 秒

        function animate(time) {
          if (!startTime) startTime = time;
          const progress = (time - startTime) / duration;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 動畫結束，移除元件
          if (progress >= 1) {
            setVisible(false);
            return;
          }

          // 繪製每一個沙化圖層
          offCanvases.forEach((layer, index) => {
            const delay = index / numLayers;
            let layerProgress = (progress - delay) / (1 - delay);
            if (layerProgress < 0) layerProgress = 0;
            if (layerProgress > 1) layerProgress = 1;

            if (layerProgress > 0) {
              // 正在飄散中
              const easeProgress = layerProgress * (2 - layerProgress); // ease-out
              const dx = layer.vx * easeProgress;
              const dy = layer.vy * easeProgress;
              const alpha = 1 - layerProgress;

              ctx.globalAlpha = alpha;
              ctx.drawImage(layer.canvas, dx, dy);
            } else {
              // 還沒開始飄散，原地畫出
              ctx.globalAlpha = 1;
              ctx.drawImage(layer.canvas, 0, 0);
            }
          });

          requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
      }, 1000); // 停留 1 秒後開始沙化 (因為前面已經有漸顯時間)
    } // 結束 startSandificationPrep 函式

    };

    img.onerror = () => {
      setVisible(false); // 如果圖片載入失敗就直接跳過動畫
    };

    // 處理視窗縮放
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.introContainer}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
      />
    </div>
  );
}
