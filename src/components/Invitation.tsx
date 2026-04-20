import { motion } from 'framer-motion';

export const Invitation = () => {
  return (
    <section className="py-24 px-4 bg-cream flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-3xl"
      >
        <img src="/assets/ornament.png" alt="Ornament" className="w-48 h-auto mx-auto mb-8 opacity-60" />
        
        <h2 className="uppercase tracking-[0.4em] text-coffee/60 text-sm mb-4">Trân trọng kính mời</h2>
        
        <p className="font-serif text-2xl md:text-3xl leading-relaxed mb-8 text-coffee/80">
          "Hôn lễ là sự kiện trọng đại nhất trong cuộc đời. <br />
          Chúng tôi rất hân hạnh được đón tiếp bạn <br />
          đến chung vui trong ngày hạnh phúc của chúng tôi."
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-12 bg-gold/50" />
          <p className="script-text text-4xl text-coffee">Tuấn Anh & Mai Linh</p>
          <div className="h-px w-12 bg-gold/50" />
        </div>

        <p className="text-coffee/70 max-w-lg mx-auto leading-loose">
          Sự hiện diện của bạn là món quà quý giá nhất dành cho chúng tôi. 
          Hãy cùng nhau tạo nên những kỷ niệm đẹp trong ngày đặc biệt này.
        </p>
      </motion.div>
    </section>
  );
};
