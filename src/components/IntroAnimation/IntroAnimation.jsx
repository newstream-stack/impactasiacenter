import { useEffect, useState } from 'react';
import styles from './IntroAnimation.module.css';

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 預留足夠的時間讓沙化與淡出動畫完成 (約3.5秒)
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.introContainer}>
      <svg className={styles.filterSvg}>
        <filter id="sand-filter">
          {/* 使用分形噪聲產生沙粒感，baseFrequency從極小變大代表從平滑變成顆粒 */}
          <feTurbulence type="fractalNoise" baseFrequency="0.001" numOctaves="4" result="noise">
            <animate attributeName="baseFrequency" from="0.001" to="0.8" dur="2.5s" begin="0.5s" fill="freeze" />
          </feTurbulence>
          {/* 利用噪聲產生位移，產生隨風飄散、撕裂的效果 */}
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" from="0" to="250" dur="2.5s" begin="0.5s" fill="freeze" />
          </feDisplacementMap>
        </filter>
      </svg>
      <div className={styles.imageWrapper}>
        <img 
          src="https://images.unsplash.com/photo-1502758712399-6a3f12bc5525?q=80&w=2000&auto=format&fit=crop" 
          alt="Antelope Canyon" 
          className={styles.image}
        />
      </div>
    </div>
  );
}
