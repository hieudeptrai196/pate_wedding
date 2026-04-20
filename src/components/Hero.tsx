import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{ backgroundImage: "url('/assets/hero-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="uppercase tracking-[0.3em] font-sans text-sm mb-6 text-cream/90"
        >
          Trọng kính mời tới dự lễ thành hôn của
        </motion.p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-6xl md:text-8xl script-text text-cream drop-shadow-lg"
          >
            Tuấn Anh
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-3xl text-gold-light font-serif"
          >
            &
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-6xl md:text-8xl script-text text-cream drop-shadow-lg"
          >
            Mai Linh
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8"
        >
          <p className="font-serif italic text-2xl text-cream/90 mb-2">26 . 04 . 2026</p>
          <div className="w-24 h-px bg-gold mx-auto opacity-50" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream/70"
      >
        <div className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-cream/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};
