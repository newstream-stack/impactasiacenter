import { useState, useEffect } from 'react';
import { useI18n } from './i18n/I18nContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Vision from './components/Vision/Vision';
import Timeline from './components/Timeline/Timeline';
import AboutIntro from './components/AboutIntro/AboutIntro';
import TrailerSection from './components/TrailerSection/TrailerSection';
import Speakers from './components/Speakers/Speakers';
import Themes from './components/Themes/Themes';
import IAAIntro from './components/IAAIntro/IAAIntro';
import Presidium from './components/Presidium/Presidium';
import DetailView from './components/DetailView/DetailView';
import Venue from './components/Venue/Venue';
import Footer from './components/Footer/Footer';
import ChatBot from './components/ChatBot/ChatBot';
import { useReveal } from './hooks/useReveal';

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!visible) return null;
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all z-40 group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

export default function App() {
  const { t } = useI18n();
  const [activeTheme, setActiveTheme] = useState(null);

  useReveal();

  // Handle both object (from UI) and string ID (from ChatBot)
  const handleSetActiveTheme = (themeData) => {
    if (typeof themeData === 'string') {
      const themes = t('themes');
      const found = themes.find(th => th.id === themeData);
      if (found) setActiveTheme(found);
    } else {
      setActiveTheme(themeData);
    }
  };

  return (
    <>
      <Header />
      <Hero />
      <div className="reveal"><Vision /></div>
      <div className="reveal"><AboutIntro onMoreClick={handleSetActiveTheme} /></div>
      <div className="reveal"><Timeline /></div>
      <div className="reveal"><TrailerSection /></div>
      <div className="reveal"><IAAIntro onBlockClick={handleSetActiveTheme} /></div>
      <div className="reveal"><Presidium /></div>
      <div className="reveal"><Themes onThemeClick={handleSetActiveTheme} /></div>
      <DetailView theme={activeTheme} onClose={() => setActiveTheme(null)} />
      <div className="reveal"><Venue /></div>
      <Footer />
      <BackToTop />
      <ChatBot onActionClick={handleSetActiveTheme} />
    </>
  );
}
