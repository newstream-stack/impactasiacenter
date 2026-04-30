import { useState, useEffect } from 'react';
import { useI18n } from '../../i18n/I18nContext';
import styles from './Countdown.module.css';

export default function Countdown() {
  const { language, t } = useI18n();
  const isEn = language === 'en';
  
  const targetDate = new Date(t('countdownTarget')).getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const Label = ({ value, labelEn, labelZh }) => (
    <div className={styles.item}>
      <span className={styles.value}>{value.toString().padStart(2, '0')}</span>
      <span className={styles.label}>
        {isEn ? labelEn : labelZh}
      </span>
    </div>
  );

  return (
    <div className={`${styles.countdownWrapper} reveal`}>
      <Label value={timeLeft.days} labelEn="Days" labelZh="天" />
      <span className={styles.separator}>:</span>
      <Label value={timeLeft.hours} labelEn="Hours" labelZh="時" />
      <span className={styles.separator}>:</span>
      <Label value={timeLeft.minutes} labelEn="Mins" labelZh="分" />
      <span className={styles.separator}>:</span>
      <Label value={timeLeft.seconds} labelEn="Secs" labelZh="秒" />
    </div>
  );
}
