import { useState } from 'react';
import { Hero } from './components/Hero';
import { Invitation } from './components/Invitation';
import { Gallery } from './components/Gallery';
import { EventDetails } from './components/EventDetails';
import { FamilyInfo } from './components/FamilyInfo';
import { Gift } from './components/Gift';
import { Wishes } from './components/Wishes';
import { FlowerPetals } from './components/FlowerPetals';
import { MusicPlayer } from './components/MusicPlayer';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <main className="min-h-screen bg-cream selection:bg-gold selection:text-white">
      {/* Entry Overlay */}
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
          >
            {/* Decoration */}
            <div className="absolute inset-0 opacity-10 bg-[url('/assets/hero-bg.png')] bg-cover bg-center" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10 text-center bg-white/80 backdrop-blur-md p-12 rounded-[40px] shadow-2xl border border-gold/20 max-w-sm w-full mx-4"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                  <Heart className="text-gold fill-gold w-8 h-8 animate-pulse" />
                </div>
              </div>
              
              <h1 className="script-text text-5xl mb-2 text-coffee">Lễ Thành Hôn</h1>
              <p className="font-serif text-coffee/60 mb-8 uppercase tracking-widest text-sm">Tuấn Anh & Mai Linh</p>
              
              <button
                onClick={() => setIsStarted(true)}
                className="w-full py-4 bg-coffee text-cream rounded-full font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500 shadow-xl group"
              >
                Mở Lời Mời
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content (only if started or blurred background) */}
      <div className={!isStarted ? 'blur-sm h-screen overflow-hidden' : ''}>
        {/* Background Elements */}
        <FlowerPetals />
        <MusicPlayer externalPlay={isStarted} />

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
      </div>
    </main>
  );
}

export default App;
