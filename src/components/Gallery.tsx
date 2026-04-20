import { motion } from 'framer-motion';

export const Gallery = () => {
  const images = [
    '/assets/gallery-1.png',
    '/assets/gallery-2.png',
    '/assets/gallery-3.png'
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-coffee">Album Ảnh Cưới</h2>
          <div className="w-24 h-1 bg-gold/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl group shadow-lg"
            >
              <img
                src={src}
                alt={`Wedding gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              
              {/* Frame deco */}
              <div className="absolute inset-4 border border-white/30 rounded-xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
