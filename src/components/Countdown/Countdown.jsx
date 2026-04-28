import { useState, useEffect } from 'react';
import { useI18n } from '../../i18n/I18nContext';

export default function Countdown() {
  const { language } = useI18n();
  const isEn = language === 'en';
  
  // Target date: Oct 23, 2026
  const targetDate = new Date('2026-10-23T00:00:00').getTime();
  
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
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-5xl font-bold text-[#FF5E00]">{value.toString().padStart(2, '0')}</span>
      <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
        {isEn ? labelEn : labelZh}
      </span>
    </div>
  );

  return (
    <div className="flex gap-2 md:gap-8 justify-center mt-8 md:mt-12 bg-black/20 backdrop-blur-md px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl border border-white/5 reveal">
      <Label value={timeLeft.days} labelEn="Days" labelZh="天" />
      <span className="text-xl md:text-2xl mt-2 text-slate-600">:</span>
      <Label value={timeLeft.hours} labelEn="Hours" labelZh="時" />
      <span className="text-xl md:text-2xl mt-2 text-slate-600">:</span>
      <Label value={timeLeft.minutes} labelEn="Mins" labelZh="分" />
      <span className="text-xl md:text-2xl mt-2 text-slate-600">:</span>
      <Label value={timeLeft.seconds} labelEn="Secs" labelZh="秒" />
    </div>
  );
}
