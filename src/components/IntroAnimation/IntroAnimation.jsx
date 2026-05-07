import { useEffect, useState } from 'react';
import styles from './IntroAnimation.module.css';

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 預留足夠的時間讓沙化與淡出動畫完成 (共 6 秒)
    const timer = setTimeout(() => {
      setVisible(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.introContainer}>
      <div className={styles.imageWrapper}>
        <div className={styles.sandOverlay}></div>
        <img 
          src="/hero.png" 
          alt="Intro Background" 
          className={styles.image}
        />
      </div>
    </div>
  );
}
