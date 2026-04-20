import { motion } from 'framer-motion';

export const FamilyInfo = () => {
  return (
    <section className="py-24 px-4 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {/* Groom's Family */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-3xl font-serif mb-8 text-coffee relative inline-block">
              Nhà Trai
              <div className="absolute -bottom-2 left-0 w-full h-px bg-gold/30" />
            </h3>
            <div className="space-y-4 mb-8">
              <p className="text-xl font-medium text-coffee">Ông: VŨ VĂN CHƯƠNG</p>
              <p className="text-xl font-medium text-coffee">Bà: VŨ THỊ HUYỀN</p>
            </div>
            <div className="pt-6 border-t border-gold/10">
              <p className="text-coffee/60 italic text-sm mb-2 underline decoration-gold/20 underline-offset-4">Chú rể: VŨ TUẤN ANH</p>
              <p className="text-coffee/50 text-xs uppercase tracking-widest leading-loose">
                Số 2/75 Nguyễn Khuyến <br />
                P. Trường Thi, TP. Ninh Bình
              </p>
            </div>
          </motion.div>

          {/* Bride's Family */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-3xl font-serif mb-8 text-coffee relative inline-block">
              Nhà Gái
              <div className="absolute -bottom-2 left-0 w-full h-px bg-gold/30" />
            </h3>
            <div className="space-y-4 mb-8">
              <p className="text-xl font-medium text-coffee">Ông: NGUYỄN NGỌC DŨNG</p>
              <p className="text-xl font-medium text-coffee">Bà: TRẦN KIM HẠNH</p>
            </div>
            <div className="pt-6 border-t border-gold/10">
              <p className="text-coffee/60 italic text-sm mb-2 underline decoration-gold/20 underline-offset-4">Cô dâu: NGUYỄN THỊ MAI LINH</p>
              <p className="text-coffee/50 text-xs uppercase tracking-widest leading-loose">
                Số 75 Hoàng Văn Thụ <br />
                P. Nam Định, TP. Ninh Bình
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
