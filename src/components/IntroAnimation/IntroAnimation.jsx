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
      <div className={styles.imageWrapper}>
        <div className={styles.sandOverlay}></div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Antelope_Canyon_with_light_beams.jpg/1200px-Antelope_Canyon_with_light_beams.jpg" 
          alt="Antelope Canyon" 
          crossOrigin="anonymous"
          className={styles.image}
        />
      </div>
    </div>
  );
}
