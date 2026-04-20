import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageSquare, User, Heart } from 'lucide-react';

// URL Google Script của bạn
const GGS_URL = 'https://script.google.com/macros/s/AKfycbzsjQIyuljbyfd5KpSdRBsSEpUeOeFPZTFp7S0sYCe5pVFEmODoYhnUXcuMt0MgndWgtA/exec';

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
  const [loading, setLoading] = useState(true);

  // Load wishes from Google Sheets on mount
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await fetch(`${GGS_URL}?t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          setWishes(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to fetch from Google Sheets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishes();
    const interval = setInterval(fetchWishes, 20000); 
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: Date.now(),
      name: name.trim().slice(0, 30),
      message: message.trim().slice(0, 200),
      date: new Date().toLocaleDateString('vi-VN', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Update UI instantly
    setWishes(prev => [newWish, ...prev]);
    setName('');
    setMessage('');
    setSubmitted(true);

    // Send to Google Sheets
    try {
      // Note: fetch with mode 'no-cors' for Google Script POST
      // This won't return a readable response but will successfully send the data
      fetch(GGS_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWish)
      });
    } catch (err) {
      console.error('Failed to send to Google Sheets:', err);
    }
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-24 px-4 bg-white/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-coffee">Sổ Lưu Bút</h2>
          <p className="text-coffee/60 italic">Cảm ơn bạn đã gửi những lời chúc tốt đẹp nhất</p>
          <div className="w-24 h-1 bg-gold/30 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:h-[500px]">
          {/* Form Side */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gold/10 h-full flex flex-col">
              <h3 className="text-xl font-serif mb-6 text-coffee flex items-center gap-2">
                <MessageSquare className="text-gold w-5 h-5" />
                Gửi Lời Chúc
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
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
                      rows={5}
                      placeholder="Gửi lời chúc hạnh phúc..."
                      className="w-full px-4 py-3 rounded-xl border border-gold/10 bg-cream/20 focus:border-gold outline-none transition-all text-sm resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-4 bg-coffee text-cream rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all flex items-center justify-center gap-2 text-xs shadow-md disabled:bg-green-500 mt-4"
                >
                  {submitted ? 'Đã Gửi Thành Công!' : 'Gửi Lời Chúc'}
                </button>
              </form>
            </div>
          </div>

          {/* List Side */}
          <div className="lg:col-span-3 h-full">
            <div className="bg-cream/20 rounded-3xl border border-gold/5 h-full overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gold/5 bg-white/30 flex justify-between items-center">
                <p className="text-[10px] uppercase font-bold tracking-widest text-coffee/40">Danh sách lời chúc ({wishes.length})</p>
                {loading && <div className="w-3 h-3 border-2 border-gold border-t-transparent rounded-full animate-spin" />}
              </div>
              <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {wishes.length > 0 ? (
                    wishes.map((wish) => (
                      <motion.div
                        key={wish.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-5 rounded-2xl border-l-4 border-gold shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-sm text-coffee">{wish.name}</h4>
                          <span className="text-[9px] text-coffee/30 uppercase">{wish.date}</span>
                        </div>
                        <p className="text-coffee/70 text-xs leading-relaxed italic">"{wish.message}"</p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center py-10 opacity-30">
                      <Heart className="w-12 h-12 mb-2" />
                      <p className="text-xs italic">Chưa có lời chúc nào...</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
