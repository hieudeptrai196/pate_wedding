import { Hero } from './components/Hero';
import { Invitation } from './components/Invitation';
import { Gallery } from './components/Gallery';
import { EventDetails } from './components/EventDetails';
import { FamilyInfo } from './components/FamilyInfo';
import { Gift } from './components/Gift';
import { Wishes } from './components/Wishes';
import { FlowerPetals } from './components/FlowerPetals';

function App() {
  return (
    <main className="min-h-screen bg-cream selection:bg-gold selection:text-white">
      {/* Falling Petals Background */}
      <FlowerPetals />

      {/* Sections */}
      <Hero />
      <Invitation />
      <Gallery />
      <EventDetails />
      <FamilyInfo />
      <Gift />
      <Wishes />

      {/* Footer */}
      <footer className="py-12 bg-coffee text-cream/50 text-center text-sm uppercase tracking-widest border-t border-gold/10">
        <p>© 2026 Tuấn Anh & Mai Linh Wedding — Mãi Mãi Một Tình Yêu</p>
      </footer>
    </main>
  );
}

export default App;
