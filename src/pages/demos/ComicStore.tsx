import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Search, Menu, Zap, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { comics } from '../../data/comics';
import { useComicCart } from '../../context/ComicCartContext';

export default function ComicStore() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const { cartCount } = useComicCart();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubscribe = () => {
    if (validateEmail(email)) {
      setIsError(false);
      setShowModal(true);
      setEmail('');
    } else {
      setIsError(true);
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans overflow-x-hidden">
      {/* Top Bar */}
      <div className="bg-[#FFE600] text-black py-2 px-4 text-center font-bold uppercase tracking-wider text-sm">
        Free shipping on orders over $50! 💥
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1a1a1a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <span className="font-comic text-4xl tracking-wider text-[#FFE600] -rotate-2 inline-block">
              POW! COMICS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-bold uppercase tracking-wide text-sm">
            <a href="#" className="hover:text-[#FFE600] transition-colors">New Releases</a>
            <a href="#" className="hover:text-[#FFE600] transition-colors">Marvel</a>
            <a href="#" className="hover:text-[#FFE600] transition-colors">DC</a>
            <a href="#" className="hover:text-[#FFE600] transition-colors">Manga</a>
            <a href="#" className="hover:text-[#FFE600] transition-colors text-[#FF0055]">Sale</a>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/demo/comic-store/cart" className="relative cursor-pointer group">
              <ShoppingCart className="w-6 h-6 group-hover:text-[#FFE600]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#FF0055] rounded-full flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[600px] bg-[#2a2a2a] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/comic-dots.png')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-transparent to-[#1a1a1a]" />
        
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block bg-[#FF0055] text-white px-4 py-1 font-bold uppercase tracking-wider mb-6 -rotate-2"
            >
              Issue #1 Available Now
            </motion.div>
            <h1 className="font-comic text-7xl md:text-9xl mb-6 leading-[0.9] text-white text-shadow-lg">
              SPIDER-MAN <br />
              <span className="text-[#FFE600]">UNLEASHED</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              The web-slinger returns in an all-new series that will change the Marvel universe forever!
            </p>
            <Link to="/demo/comic-store/search">
              <button className="bg-[#FFE600] text-black font-black uppercase text-xl px-10 py-4 skew-x-[-10deg] hover:bg-white hover:scale-105 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <span className="block skew-x-[10deg]">Shop Now</span>
              </button>
            </Link>
          </div>
          
          <motion.img 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            src="https://png.pngtree.com/png-clipart/20230414/original/pngtree-comic-style-speech-bubble-png-image_9054593.png"
            className="absolute right-0 top-20 w-[600px] hidden lg:block drop-shadow-2xl rotate-12 opacity-50"
            alt="Comic Effect"
          />
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-comic text-5xl text-white">Trending Now</h2>
            <a href="#" className="text-[#FFE600] font-bold uppercase tracking-wide hover:underline">View All</a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {comics.map((item, i) => (
              <Link to={`/demo/comic-store/product/${item.id}`} key={item.id}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[2/3] mb-4 overflow-hidden border-4 border-transparent group-hover:border-[#FFE600] transition-colors bg-gray-800">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-[#FF0055] text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-[#FFE600] transition-colors">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{item.price}</span>
                    <div className="flex text-[#FFE600]">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#FFE600] py-20 px-6 text-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Zap className="w-16 h-16 mx-auto mb-6 text-black animate-pulse" />
          <h2 className="font-comic text-6xl mb-6">Join the Squad!</h2>
          <p className="text-xl font-bold mb-8 max-w-xl mx-auto">
            Get the latest updates on new releases, exclusive events, and member-only discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-20">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 bg-white border-4 border-black font-bold text-black placeholder:text-gray-500 focus:outline-none focus:border-[#FF0055]"
            />
            <button 
              onClick={handleSubscribe}
              className="bg-black text-white font-black uppercase px-8 py-4 hover:bg-[#FF0055] transition-colors border-4 border-black"
            >
              Subscribe
            </button>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-black rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-black rotate-45" />
        </div>
      </section>

      {/* Subscription Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              className={`relative bg-white border-4 border-black p-8 max-w-md w-full text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${isError ? 'border-[#FF0055]' : 'border-[#FFE600]'}`}
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 hover:scale-110 transition-transform"
              >
                <X className="w-6 h-6 text-black" />
              </button>
              
              {isError ? (
                <>
                  <div className="text-6xl mb-4">💥</div>
                  <h3 className="font-comic text-3xl text-black mb-2 uppercase">Oops!</h3>
                  <p className="text-black font-bold text-lg">Please enter a valid email address to join the squad!</p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="font-comic text-3xl text-black mb-2 uppercase">BOOM! You're In!</h3>
                  <p className="text-black font-bold text-lg">Thanks for subscribing! Get ready for some epic updates.</p>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
