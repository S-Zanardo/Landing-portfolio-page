import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Search, Menu, Zap, Star, X, Loader2, Heart, Skull, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import comicSpeechBubble from '../../context/comic-bubble.png';
import { useComicCart } from '../../context/ComicCartContext';
import { useCatalog } from './useCatalog';

const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTNByb9NJb5wmvrS4aylrokNm0E3Hz18UFh39rzEs2uiO_lYXMrXfyjRrS-0PCSbujivMLtxgnFJ-63/pub?output=csv";

export default function ComicStore() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const { cartCount, addToCart } = useComicCart();
  const { items: comics, isLoading, error } = useCatalog(GOOGLE_SHEETS_CSV_URL);

  // Catalog Modal State
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [catalogForm, setCatalogForm] = useState({ name: '', email: '', address: '' });
  const [isSubmittingCatalog, setIsSubmittingCatalog] = useState(false);
  const [catalogSuccess, setCatalogSuccess] = useState(false);

  // Configurator State
  const [keychainColor, setKeychainColor] = useState('#FF0055');
  const [keychainSymbol, setKeychainSymbol] = useState('zap');
  const [keychainText, setKeychainText] = useState('HERO');

  const generateKeychainSvg = (color: string, symbol: string, text: string) => {
    let symbolSvg = '';
    if (symbol === 'zap') symbolSvg = '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />';
    else if (symbol === 'star') symbolSvg = '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="black" />';
    else if (symbol === 'heart') symbolSvg = '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="black" />';
    else if (symbol === 'skull') symbolSvg = '<circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/>';

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="200" height="300">
        <rect width="200" height="300" fill="#1f2937" />
        <g transform="translate(100, 150)">
          <!-- Keychain Ring -->
          <rect x="-12" y="-85" width="24" height="40" rx="12" fill="none" stroke="#9ca3af" stroke-width="6" />
          <!-- Drop Shadow -->
          <circle cx="5" cy="5" r="60" fill="black" />
          <!-- Keychain Body -->
          <circle cx="0" cy="0" r="60" fill="${color}" stroke="black" stroke-width="6" />
          <!-- Symbol -->
          <g transform="translate(-16, -30) scale(1.33)" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${symbolSvg}
          </g>
          <!-- Text -->
          <text x="0" y="25" font-family="Impact, Arial Black, sans-serif" font-weight="900" font-size="18" fill="black" text-anchor="middle" letter-spacing="1">
            ${(text || 'HERO').toUpperCase()}
          </text>
        </g>
      </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  };

  const handleAddCustomKeychain = () => {
    addToCart({
      id: `custom-keychain-${Date.now()}`,
      title: `Custom ${keychainText || 'Hero'} Keychain`,
      price: "$12.99",
      image: generateKeychainSvg(keychainColor, keychainSymbol, keychainText)
    }, 1);
    alert('Custom Keychain added to cart! 💥');
  };

  const handleCatalogSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    console.log("Catalog submission started:", catalogForm);
    setIsSubmittingCatalog(true);
    
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log("Checking EmailJS Keys for Comic Store:", { 
        hasServiceId: !!serviceId, 
        hasTemplateId: !!templateId, 
        hasPublicKey: !!publicKey 
      });

      if (serviceId && templateId && publicKey) {
        const response = await emailjs.send(
          serviceId,
          templateId,
          {
            user_name: catalogForm.name,
            user_email: catalogForm.email,
            project_type: "📖 Comic Store Free Catalog Request",
            message: `Please send the catalog to the following address:\n${catalogForm.address}`
          },
          publicKey
        );
        console.log("EmailJS Success Response:", response);
      } else {
        console.warn("EmailJS keys missing. Simulating email sending. Please check your environment variables.");
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setCatalogSuccess(true);
      setCatalogForm({ name: '', email: '', address: '' });
      
      setTimeout(() => {
        setCatalogSuccess(false);
        setShowCatalogModal(false);
      }, 4000);
      
    } catch (error: any) {
      console.error("Failed to send email:", error);
      alert(`Errore durante l'invio: ${error?.text || error?.message || "Unknown error"}`);
    } finally {
      setIsSubmittingCatalog(false);
    }
  };

  const isCatalogValid = 
    catalogForm.name.trim() !== '' && 
    catalogForm.address.trim() !== '' && 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(catalogForm.email);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-[#FFE600] font-comic text-3xl">
        <Loader2 className="w-10 h-10 animate-spin mr-4" /> Loading comics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-[#FF0055] font-comic text-xl">
        Error loading catalog: {error}
      </div>
    );
  }

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
            <div className="flex flex-wrap gap-4">
              <Link to="/demo/comic-store/search">
                <button className="bg-[#FFE600] text-black font-black uppercase text-xl px-10 py-4 skew-x-[-10deg] hover:bg-white hover:scale-105 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  <span className="block skew-x-[10deg]">Shop Now</span>
                </button>
              </Link>
              <button 
                onClick={() => setShowCatalogModal(true)}
                className="bg-[#FF0055] text-white font-black uppercase text-xl px-10 py-4 skew-x-[-10deg] hover:bg-white hover:text-[#FF0055] hover:scale-105 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                <span className="block skew-x-[10deg]">Free Catalog</span>
              </button>
            </div>
          </div>
          
          <motion.img 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            src={comicSpeechBubble}
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
              <Link to={`/demo/comic-store/product/${item.id || i}`} key={item.id || `store-${i}`}>
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

      {/* Custom Keychain Configurator */}
      <section className="py-20 px-6 bg-[#111] border-y-8 border-black shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Wrench className="w-10 h-10 text-[#FFE600]" />
            <h2 className="font-comic text-5xl text-white">Build Your Gear</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Preview Area */}
            <div className="bg-[#1a1a1a] p-8 flex flex-col items-center justify-center min-h-[450px] border-4 border-gray-800 rounded-3xl relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              <div className="absolute top-4 left-4 bg-black text-[#FFE600] font-bold px-3 py-1 text-sm uppercase tracking-wider">Preview</div>
              
              <motion.div 
                className="relative w-48 h-48 rounded-full border-8 border-black flex flex-col items-center justify-center shadow-[10px_10px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: keychainColor }}
                animate={{ backgroundColor: keychainColor }}
                transition={{ duration: 0.3 }}
              >
                {/* Keychain Ring */}
                <div className="absolute -top-12 w-10 h-16 border-8 border-gray-400 rounded-full bg-transparent z-[-1]" />
                
                {keychainSymbol === 'zap' && <Zap className="w-16 h-16 text-black mb-2" />}
                {keychainSymbol === 'star' && <Star className="w-16 h-16 text-black fill-current mb-2" />}
                {keychainSymbol === 'heart' && <Heart className="w-16 h-16 text-black fill-current mb-2" />}
                {keychainSymbol === 'skull' && <Skull className="w-16 h-16 text-black mb-2" />}
                
                <span className="font-comic text-black font-black uppercase tracking-widest px-4 text-center truncate w-full text-xl text-shadow-sm">
                  {keychainText || 'YOUR TEXT'}
                </span>
              </motion.div>
            </div>

            {/* Controls Area */}
            <div className="space-y-8 bg-gray-900 p-8 border-4 border-black shadow-[8px_8px_0px_0px_#FFE600]">
              <div>
                <h3 className="font-comic text-2xl mb-4 text-[#FFE600] uppercase tracking-wide">1. Choose Color</h3>
                <div className="flex gap-4">
                  {['#FF0055', '#FFE600', '#00A2FF', '#00FF66', '#FFFFFF'].map(c => (
                    <button 
                      key={c}
                      onClick={() => setKeychainColor(c)}
                      className={`w-12 h-12 rounded-full border-4 ${keychainColor === c ? 'border-white scale-110' : 'border-black'} transition-all hover:scale-105`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-comic text-2xl mb-4 text-[#FFE600] uppercase tracking-wide">2. Pick a Symbol</h3>
                <div className="flex gap-4">
                  {['zap', 'star', 'heart', 'skull'].map(s => (
                    <button
                      key={s}
                      onClick={() => setKeychainSymbol(s)}
                      className={`w-14 h-14 bg-gray-800 rounded-xl border-4 flex items-center justify-center ${keychainSymbol === s ? 'border-white text-white' : 'border-black text-gray-500'} hover:border-white hover:text-white transition-colors`}
                    >
                      {s === 'zap' && <Zap className="w-7 h-7" />}
                      {s === 'star' && <Star className="w-7 h-7 fill-current" />}
                      {s === 'heart' && <Heart className="w-7 h-7 fill-current" />}
                      {s === 'skull' && <Skull className="w-7 h-7" />}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-comic text-2xl mb-4 text-[#FFE600] uppercase tracking-wide">3. Add Your Alias</h3>
                <input
                  type="text"
                  maxLength={10}
                  value={keychainText}
                  onChange={(e) => setKeychainText(e.target.value.toUpperCase())}
                  placeholder="MAX 10 CHARACTERS"
                  className="w-full bg-white text-black font-black uppercase text-xl px-6 py-4 border-4 border-black focus:outline-none focus:border-[#FF0055]"
                />
              </div>
              <div className="pt-4">
                <button 
                  onClick={handleAddCustomKeychain}
                  className="w-full bg-[#FF0055] text-white font-black uppercase text-2xl py-5 hover:bg-white hover:text-black transition-colors border-4 border-black shadow-[6px_6px_0px_0px_#FFE600] flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart - $12.99
                </button>
              </div>
            </div>
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

      {/* Catalog Request Modal */}
      <AnimatePresence>
        {showCatalogModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmittingCatalog && setShowCatalogModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              className="relative bg-white border-4 border-black p-8 max-w-lg w-full shadow-[12px_12px_0px_0px_rgba(255,0,85,1)]"
            >
              <button 
                onClick={() => setShowCatalogModal(false)}
                className="absolute top-4 right-4 hover:scale-110 transition-transform bg-black text-white rounded-full p-1"
                disabled={isSubmittingCatalog}
              >
                <X className="w-5 h-5" />
              </button>
              
              {catalogSuccess ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="font-comic text-3xl text-black mb-4 uppercase">KABOOM!</h3>
                  <p className="text-black font-bold text-lg">
                    Your free catalog is on its way! Keep an eye on your mailbox.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="font-comic text-3xl text-black uppercase mb-2">Get a Free Catalog!</h3>
                    <p className="text-gray-600 font-bold">Enter your details and we'll ship our latest comic catalog right to your door.</p>
                  </div>
                  
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="block text-black font-black uppercase mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={catalogForm.name}
                        onChange={(e) => setCatalogForm({...catalogForm, name: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border-4 border-black font-bold text-black focus:outline-none focus:border-[#FF0055] transition-colors"
                        placeholder="Peter Parker"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-black font-black uppercase mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={catalogForm.email}
                        onChange={(e) => setCatalogForm({...catalogForm, email: e.target.value})}
                        className={`w-full px-4 py-3 bg-gray-50 border-4 font-bold text-black focus:outline-none transition-colors ${
                          catalogForm.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(catalogForm.email)
                            ? 'border-red-500 focus:border-red-500 bg-red-50'
                            : 'border-black focus:border-[#FF0055]'
                        }`}
                        placeholder="spidey@dailybugle.com"
                        required
                      />
                      {catalogForm.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(catalogForm.email) && (
                        <p className="text-red-500 text-xs font-bold mt-1 uppercase">Invalid email format</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-black font-black uppercase mb-1">Shipping Address</label>
                      <textarea 
                        value={catalogForm.address}
                        onChange={(e) => setCatalogForm({...catalogForm, address: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border-4 border-black font-bold text-black focus:outline-none focus:border-[#FF0055] transition-colors resize-none"
                        placeholder="20 Ingram Street, Queens, NY"
                        rows={3}
                        required
                      />
                    </div>
                    
                    <button 
                      type="button"
                      onClick={handleCatalogSubmit}
                      disabled={isSubmittingCatalog || !isCatalogValid}
                      className="w-full bg-[#FFE600] text-black font-black uppercase text-xl px-8 py-4 hover:bg-[#FF0055] hover:text-white transition-all border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                    >
                      {isSubmittingCatalog ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" /> Sending...
                        </>
                      ) : (
                        'Send My Catalog!'
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
