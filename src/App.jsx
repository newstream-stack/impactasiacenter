import { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Vision from './components/Vision/Vision';
import Timeline from './components/Timeline/Timeline';
import AboutIntro from './components/AboutIntro/AboutIntro';
import TrailerSection from './components/TrailerSection/TrailerSection';
import Speakers from './components/Speakers/Speakers';
import Themes from './components/Themes/Themes';
import DetailView from './components/DetailView/DetailView';
import Venue from './components/Venue/Venue';
import Footer from './components/Footer/Footer';
import ChatBot from './components/ChatBot/ChatBot';

export default function App() {
  const [activeTheme, setActiveTheme] = useState(null); // 側滑面板

  return (
    <>
      <Header />
      <Hero />
      <Vision />
      <AboutIntro onMoreClick={setActiveTheme} />
      <Timeline />
      <TrailerSection />
      {/* <Speakers /> */}
      <Themes onThemeClick={setActiveTheme} />
      <DetailView theme={activeTheme} onClose={() => setActiveTheme(null)} />
      <Venue />
      <Footer />
      <ChatBot />
    </>
  );
}
