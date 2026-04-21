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
import VideoModal from './components/VideoModal';
import Footer from './components/Footer';

export default function App() {
  const [activeTheme, setActiveTheme] = useState(null); // 側滑面板
  const [isVideoOpen, setIsVideoOpen] = useState(false); // 影片彈窗

  return (
    <>
      <Header />
      <Hero onPlayVideo={() => setIsVideoOpen(true)} />
      <Vision />
      <Timeline />
      <TrailerSection onPlayVideo={() => setIsVideoOpen(true)} />
      <Speakers />
      <Themes onThemeClick={setActiveTheme} />
      <DetailView theme={activeTheme} onClose={() => setActiveTheme(null)} />
      <Venue />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <Footer />
    </>
  );
}
