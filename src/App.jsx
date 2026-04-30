import { useState } from 'react'
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
import { useReveal } from './hooks/useReveal'
import BackToTop from './components/BackToTop/BackToTop'


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
