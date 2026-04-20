import { useState, useRef, useEffect } from 'react';
import { Music, Music2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  externalPlay?: boolean;
}

export const MusicPlayer = ({ externalPlay }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const videoId = '06-XXOTP3Gc';

  // Listen for externally triggered play (e.g. from Enter button)
  useEffect(() => {
    if (externalPlay) {
      setIsPlaying(true);
      setHasInteracted(true);
    }
  }, [externalPlay]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Hidden YouTube Embed */}
      {hasInteracted && (
        <div className="hidden">
          <iframe
            width="0"
            height="0"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=0&loop=1&playlist=${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      )}

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors border border-gold/20 ${
          isPlaying ? 'bg-gold animate-spin-slow' : 'bg-white'
        }`}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
            >
              <Music2 className="text-white w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Music className="text-gold w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hint for first time */}
      {!hasInteracted && !externalPlay && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="absolute right-16 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-md border border-gold/10 whitespace-nowrap"
        >
          <p className="text-xs text-coffee/60 font-medium">Bật nhạc nền? ♥</p>
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-gold/10 rotate-45" />
        </motion.div>
      )}
    </div>
  );
};
