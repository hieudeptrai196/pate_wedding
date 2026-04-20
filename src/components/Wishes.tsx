import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageSquare, User, Send } from 'lucide-react';

interface Wish {
  id: number;
  name: string;
  message: string;
  date: string;
}

export const Wishes = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Load wishes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wedding_wishes');
    if (saved) {
      setWishes(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: Date.now(),
      name: name.trim().slice(0, 30), // Max 30 chars
      message: message.trim().slice(0, 200), // Max 200 chars
      date: new Date().toLocaleDateString('vi-VN', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem('wedding_wishes', JSON.stringify(updatedWishes));
    
    setName('');
    setMessage('');
    setSubmitted(true);
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-24 px-4 bg-white/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-coffee">Sổ Lưu Bút</h2>
          <p className="text-coffee/60 italic">Hãy gửi những lời chúc tốt đẹp nhất dành cho cặp đôi</p>
          <div className="w-24 h-1 bg-gold/30 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gold/10 sticky top-10">
              <h3 className="text-xl font-serif mb-6 text-coffee flex items-center gap-2">
                <MessageSquare className="text-gold w-5 h-5" />
                Gửi Lời Chúc
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-coffee/40 uppercase tracking-widest mb-1">
                    Tên của bạn *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/40 w-4 h-4" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={30}
                      placeholder="Nhập tên..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/10 bg-cream/20 focus:border-gold outline-none transition-all text-sm"
                    />
                  </div>
                  <p className="text-[10px] text-coffee/30 mt-1 text-right">{name.length}/30</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-coffee/40 uppercase tracking-widest mb-1">
                    Lời chúc *
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={200}
                    rows={4}
                    placeholder="Gửi lời chúc hạnh phúc..."
                    className="w-full px-4 py-3 rounded-xl border border-gold/10 bg-cream/20 focus:border-gold outline-none transition-all text-sm resize-none"
                  />
                  <p className="text-[10px] text-coffee/30 mt-1 text-right">{message.length}/200</p>
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-4 bg-coffee text-cream rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all flex items-center justify-center gap-2 text-xs shadow-md disabled:bg-green-500 disabled:opacity-100"
                >
                  {submitted ? (
                    'Đã Gửi Thành Công! ♥'
                  ) : (
                    <>
                      Gửi Lời Chúc
                      <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* List Side */}
          <div className="lg:col-span-3">
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {wishes.length > 0 ? (
                  wishes.map((wish) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white p-6 rounded-2xl border-l-4 border-gold shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-coffee">{wish.name}</h4>
                        <span className="text-[10px] text-coffee/30 uppercase tracking-tighter">{wish.date}</span>
                      </div>
                      <p className="text-coffee/70 text-sm leading-relaxed italic">"{wish.message}"</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white/30 rounded-2xl border border-dashed border-gold/20">
                    <p className="text-coffee/40 italic">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
