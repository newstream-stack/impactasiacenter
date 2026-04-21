import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Timeline from './components/Timeline';
import TrailerSection from './components/TrailerSection';
import Speakers from './components/Speakers';
import Themes from './components/Themes';
import DetailView from './components/DetailView';
import Venue from './components/Venue';
import Footer from './components/Footer';

export default function App() {
  const [activeTheme, setActiveTheme] = useState(null); // 側滑面板

  return (
    <>
      <Header />
      <Hero />
      <Vision />
      <Timeline />
      <TrailerSection />
      {/* <Speakers /> */}
      <Themes onThemeClick={setActiveTheme} />
      <DetailView theme={activeTheme} onClose={() => setActiveTheme(null)} />
      <Venue />
      <Footer />
    </>
  );
}
