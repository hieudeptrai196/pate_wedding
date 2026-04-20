import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

export const Gift = () => {
  return (
    <section className="py-24 px-4 bg-cream/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-coffee">Hộp Mừng Cưới</h2>
          <p className="text-coffee/60 italic">Cảm ơn sự chúc phúc và lòng thành của bạn</p>
          <div className="w-24 h-1 bg-gold/30 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Groom's Gift */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gold/10"
          >
            <div className="flex items-center justify-center gap-3 mb-6 font-serif text-2xl text-coffee">
              <CreditCard className="text-gold" />
              <span>Gửi mừng Chú rể</span>
            </div>
            
            <div className="aspect-square w-48 mx-auto bg-cream rounded-2xl flex items-center justify-center border-2 border-dashed border-gold/20 mb-6">
              <p className="text-coffee/30 text-xs px-4 uppercase tracking-widest text-center">QR Code Chú rể <br/> (Chưa có ảnh)</p>
            </div>

            <div className="text-left space-y-2 bg-cream/30 p-4 rounded-xl">
              <p className="text-xs text-coffee/40 uppercase tracking-widest font-bold">Ngân hàng</p>
              <p className="text-coffee font-medium">Vietcombank</p>
              <p className="text-xs text-coffee/40 uppercase tracking-widest font-bold pt-2">Số tài khoản</p>
              <p className="text-xl font-serif text-coffee tracking-tighter">0123 456 789</p>
              <p className="text-xs text-coffee/40 uppercase tracking-widest font-bold pt-2">Chủ tài khoản</p>
              <p className="text-coffee">VŨ TUẤN ANH</p>
            </div>
          </motion.div>

          {/* Bride's Gift */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gold/10"
          >
            <div className="flex items-center justify-center gap-3 mb-6 font-serif text-2xl text-coffee">
              <CreditCard className="text-gold" />
              <span>Gửi mừng Cô dâu</span>
            </div>
            
            <div className="aspect-square w-48 mx-auto bg-cream rounded-2xl flex items-center justify-center border-2 border-dashed border-gold/20 mb-6">
              <p className="text-coffee/30 text-xs px-4 uppercase tracking-widest text-center">QR Code Cô dâu <br/> (Chưa có ảnh)</p>
            </div>

            <div className="text-left space-y-2 bg-cream/30 p-4 rounded-xl">
              <p className="text-xs text-coffee/40 uppercase tracking-widest font-bold">Ngân hàng</p>
              <p className="text-coffee font-medium">MB Bank</p>
              <p className="text-xs text-coffee/40 uppercase tracking-widest font-bold pt-2">Số tài khoản</p>
              <p className="text-xl font-serif text-coffee tracking-tighter">9876 543 210</p>
              <p className="text-xs text-coffee/40 uppercase tracking-widest font-bold pt-2">Chủ tài khoản</p>
              <p className="text-coffee">NGUYỄN THỊ MAI LINH</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
