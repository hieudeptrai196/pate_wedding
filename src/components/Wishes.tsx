import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageSquare, User, Heart } from 'lucide-react';

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

  // Load wishes from the server on mount
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await fetch(`/data/wishes.json?t=${Date.now()}`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setWishes(data);
          }
        } else {
          console.warn('Received non-JSON response from server, check if the file exists and the server is restarted.');
        }
      } catch (err) {
        console.error('Error loading wishes:', err);
        const saved = localStorage.getItem('wedding_wishes');
        if (saved) setWishes(JSON.parse(saved));
      }
    };

    fetchWishes();
    const interval = setInterval(fetchWishes, 10000);
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

    setWishes(prev => [newWish, ...prev]);
    
    try {
      await fetch('/api/save-wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWish)
      });
    } catch (err) {
      console.error('Failed to write to file:', err);
    }
    
    setName('');
    setMessage('');
    setSubmitted(true);
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-24 px-4 bg-white/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-coffee">Sổ Lưu Bút</h2>
          <p className="text-coffee/60 italic">Lời chúc của bạn sẽ được lưu giữ mãi mãi</p>
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
                    placeholder="Gửi lời chúc..."
                    className="w-full px-4 py-3 rounded-xl border border-gold/10 bg-cream/20 focus:border-gold outline-none transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-4 bg-coffee text-cream rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all flex items-center justify-center gap-2 text-xs shadow-md disabled:bg-green-500 disabled:opacity-100 disabled:cursor-default"
                >
                  {submitted ? 'Đã Gửi Thành Công! ♥' : 'Gửi Lời Chúc'}
                </button>
              </form>
            </div>
          </div>

          {/* List Side */}
          <div className="lg:col-span-3">
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {wishes.length > 0 ? (
                  wishes.map((wish) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-6 rounded-2xl border-l-4 border-gold shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-coffee">{wish.name}</h4>
                        <span className="text-[10px] text-coffee/30">{wish.date}</span>
                      </div>
                      <p className="text-coffee/70 text-sm italic">"{wish.message}"</p>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 bg-white/30 rounded-3xl border-2 border-dashed border-gold/20"
                  >
                    <Heart className="text-gold/20 w-16 h-16 mb-4" />
                    <p className="text-coffee/40 italic font-serif text-lg">Chưa có lời chúc nào...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
