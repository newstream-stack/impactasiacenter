import { useState } from 'react'
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
import PhoenixIntro from './components/PhoenixIntro/PhoenixIntro';
import DetailView from './components/DetailView/DetailView';
import Venue from './components/Venue/Venue';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
// import ChatBot from './components/ChatBot/ChatBot';
import { useReveal } from './hooks/useReveal'
import BackToTop from './components/BackToTop/BackToTop'
import FloatingRegisterBtn from './components/FloatingRegisterBtn/FloatingRegisterBtn'
import IntroAnimation from './components/IntroAnimation/IntroAnimation';


export default function App() {
  const [activeTheme, setActiveTheme] = useState(null);

  useReveal();

  return (
    <>
      <IntroAnimation />
      <Header />
      <Hero />
      <div className="reveal"><Vision /></div>
      <div className="reveal"><AboutIntro onMoreClick={setActiveTheme} /></div>
      <div className="reveal"><Timeline /></div>
      <div className="reveal"><TrailerSection /></div>
      <div className="reveal"><IAAIntro onBlockClick={setActiveTheme} /></div>
      <div className="reveal"><PhoenixIntro /></div>
      <div className="reveal"><Presidium /></div>
      <div className="reveal"><Themes onThemeClick={setActiveTheme} /></div>
      <DetailView theme={activeTheme} onClose={() => setActiveTheme(null)} />
      <div className="reveal"><Venue /></div>
      <div className="reveal"><FAQ /></div>
      <Footer />
      <BackToTop />
      <FloatingRegisterBtn />
      {/* <ChatBot onActionClick={handleSetActiveTheme} /> */}
    </>
  );
}
