import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const EventDetails = () => {
  return (
    <section className="py-24 px-4 bg-white/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-coffee/5 rounded-full -ml-32 -mb-32 blur-3xl opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-coffee">Thời Gian & Địa Điểm</h2>
          <div className="w-24 h-1 bg-gold/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Time */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-sm border border-gold/10 flex flex-col items-center text-center hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-6">
              <Clock className="text-gold w-8 h-8" />
            </div>
            <h3 className="text-2xl mb-4 text-coffee">Giờ Cử Hành</h3>
            <p className="text-4xl font-serif text-gold mb-2">10:30</p>
            <p className="text-coffee/60 uppercase tracking-widest text-xs">Sáng</p>
          </motion.div>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-xl border border-gold/20 flex flex-col items-center text-center scale-105 z-20 relative ring-1 ring-gold/10"
          >
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
              <Calendar className="text-gold w-8 h-8" />
            </div>
            <h3 className="text-2xl mb-4 text-coffee">Ngày Đại Hỷ</h3>
            <div className="mb-4">
              <p className="text-coffee/60 mb-1 uppercase tracking-tighter">Chủ Nhật</p>
              <p className="text-5xl font-serif text-coffee leading-tight">26 . 04</p>
              <p className="text-coffee/60 mt-1 uppercase tracking-widest leading-loose">Năm 2026</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gold/10 w-full">
              <p className="text-coffee/50 italic text-sm">(Tức ngày 10 tháng 3 năm Bính Ngọ)</p>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-sm border border-gold/10 flex flex-col items-center text-center hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-6">
              <MapPin className="text-gold w-8 h-8" />
            </div>
            <h3 className="text-2xl mb-4 text-coffee">Địa Điểm</h3>
            <p className="text-coffee/80 font-medium mb-1">Tầng 3 Khách Sạn Sơn Nam</p>
            <p className="text-coffee/60 text-sm italic mb-4">Số 26 Lê Hồng Phong, P. Nam Định, T. Ninh Bình</p>
            <a 
              href="https://www.google.com/maps/search/Kh%C3%A1ch+S%E1%BA%A1n+S%C6%A1n+Nam+Ninh+B%C3%ACnh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 px-6 py-2 border border-gold text-gold rounded-full text-sm font-medium hover:bg-gold hover:text-white transition-all uppercase tracking-widest"
            >
              Chỉ đường
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
