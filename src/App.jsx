import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import DailyProgram from './pages/DailyProgram/DailyProgram';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/day/:dayId" element={<DailyProgram />} />
    </Routes>
  );
}
