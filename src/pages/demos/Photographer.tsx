import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, Instagram, Mail, Twitter, Menu, X, Linkedin, Loader2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function GalleryItem({ item, index }: { item: { src: string, description: string }, index: number, key?: React.Key }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isEven = index % 2 === 0;

  const handlePointerDown = () => {
    if (isExpanded) return;
    timerRef.current = setTimeout(() => {
      setIsExpanded(true);
    }, 500);
  };

  const handlePointerUpOrLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileTap={!isExpanded ? { scale: 0.98, rotate: [-1, 1.5, -1.5, 1, 0], transition: { duration: 0.4 } } : {}}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave}
      onPointerCancel={handlePointerUpOrLeave}
      className="aspect-[3/4] bg-gray-100 relative group overflow-hidden cursor-pointer"
    >
      <motion.div 
        className="absolute top-0 h-full"
        initial={{ left: '0%', width: '100%' }}
        animate={{ 
          left: isExpanded ? (isEven ? '0%' : '65%') : '0%',
          width: isExpanded ? '35%' : '100%' 
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <img 
          src={item.src} 
          alt={`Gallery ${index}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        {!isExpanded && (
          <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-xs tracking-widest uppercase bg-black/50 px-2 py-1 backdrop-blur-sm">Hold 0.5s to view</span>
          </div>
        )}
      </motion.div>

      <motion.div 
        className={`absolute top-0 h-full bg-[#FAFAFA] flex flex-col justify-center p-6 ${isEven ? 'border-l text-right' : 'border-r text-left'} border-gray-200`}
        initial={{ left: isEven ? '100%' : '-65%', width: '65%' }}
        animate={{ left: isExpanded ? (isEven ? '35%' : '0%') : (isEven ? '100%' : '-65%') }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-3">Project Details</h4>
        <p className="text-xs sm:text-sm font-light leading-relaxed text-gray-600">
          {item.description}
        </p>
        {isExpanded && (
          <button 
            onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }} 
            className={`absolute top-4 ${isEven ? 'right-4' : 'left-4'} p-2 text-gray-400 hover:text-black transition-colors`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Photographer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'work' | 'contact'>('work');
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const portfolioItems = [
    {
      src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000",
      description: "A self-portrait capturing the essence of the observer. The camera becomes an extension of the eye, framing the world through a mechanical lens."
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000",
      description: "Ethereal landscapes from the highlands. The mist rolling over the layered hills evokes a sense of timeless isolation and natural grandeur."
    },
    {
      src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1000",
      description: "Deep within the pine woods. The morning fog weaves through the tall, dark trunks, creating a moody and mysterious atmosphere."
    },
    {
      src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1000",
      description: "A lifestyle portrait in the open fields. The soft natural light and the gentle breeze capture a moment of pure freedom and connection with nature."
    },
    {
      src: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&q=80&w=1000",
      description: "A striking fashion portrait focusing on bold expressions and minimalist aesthetics. The interplay of light and shadow highlights the subject's features."
    },
    {
      src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=1000",
      description: "A quiet path through the dense forest. The muted tones and atmospheric fog invite the viewer into a serene, almost melancholic woodland journey."
    }
  ];

  const handleNavClick = (tab: 'work' | 'contact' | 'about') => {
    setIsMenuOpen(false);
    if (tab === 'about') {
      document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission started with data:", formData);
    setIsSubmitting(true);
    
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log("Checking EmailJS Keys for Photographer:", { 
        hasServiceId: !!serviceId, 
        hasTemplateId: !!templateId, 
        hasPublicKey: !!publicKey 
      });

      if (serviceId && templateId && publicKey) {
        const response = await emailjs.send(
          serviceId,
          templateId,
          {
            user_name: `${formData.firstName} ${formData.lastName}`,
            user_email: formData.email,
            message: formData.message,
            project_type: "📸 Photography Portfolio Inquiry"
          },
          publicKey
        );
        console.log("EmailJS Success Response:", response);
      } else {
        console.warn("EmailJS keys missing. Simulating email sending. Please check your environment variables.");
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setIsSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      
      setTimeout(() => {
        setIsSuccess(false);
        setActiveTab('work');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 4000);
      
    } catch (error: any) {
      console.error("Failed to send email:", error);
      alert(`Errore durante l'invio del messaggio: ${error?.text || error?.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = 
    formData.firstName.trim() !== '' && 
    formData.lastName.trim() !== '' && 
    formData.message.trim() !== '' && 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-[1800px] mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase hover:opacity-50 transition-opacity z-50">
            <ArrowLeft className="w-3 h-3" /> Portfolio
          </Link>
          
          {/* Desktop Name */}
          <span className="hidden md:block text-xl font-bold tracking-[0.2em] uppercase">Elena Vance</span>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 text-xs font-medium tracking-widest uppercase">
            <button onClick={() => handleNavClick('work')} className={`${activeTab === 'work' ? 'opacity-100' : 'opacity-50'} hover:opacity-100 transition-opacity`}>Work</button>
            <button onClick={() => handleNavClick('about')} className="opacity-50 hover:opacity-100 transition-opacity">About</button>
            <button onClick={() => handleNavClick('contact')} className={`${activeTab === 'contact' ? 'opacity-100' : 'opacity-50'} hover:opacity-100 transition-opacity`}>Contact</button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-2xl font-light tracking-widest uppercase md:hidden"
          >
            <button onClick={() => handleNavClick('work')} className={activeTab === 'work' ? 'font-medium' : ''}>Work</button>
            <button onClick={() => handleNavClick('about')}>About</button>
            <button onClick={() => handleNavClick('contact')} className={activeTab === 'contact' ? 'font-medium' : ''}>Contact</button>
          </motion.div>
        )}
      </AnimatePresence>

      {activeTab === 'work' ? (
        <>
          {/* Hero */}
          <div className="pt-40 pb-20 px-6 max-w-[1800px] mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-light tracking-tighter mb-8 max-w-4xl"
            >
              Capturing <br />
              <span className="italic font-serif">Silence</span> in <br />
              Motion.
            </motion.h1>
          </div>

          {/* Gallery */}
          <div className="px-6 pb-20 max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioItems.map((item, i) => (
                <GalleryItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Contact Form */
        <div className="pt-40 pb-20 px-6 max-w-3xl mx-auto min-h-[70vh]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-light tracking-tighter mb-12"
          >
            Let's <span className="italic font-serif">Connect</span>
          </motion.h1>
          
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-50 p-12 text-center border border-gray-100 flex flex-col items-center justify-center"
            >
              <CheckCircle2 className="w-16 h-16 text-black mb-6" />
              <h3 className="text-2xl font-light mb-4">Message Sent Successfully</h3>
              <p className="text-gray-500 font-light">Thank you for your inquiry. I will get back to you soon.</p>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-gray-500">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border-b border-black pb-2 focus:outline-none focus:border-gray-400 transition-colors bg-transparent" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-gray-500">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border-b border-black pb-2 focus:outline-none focus:border-gray-400 transition-colors bg-transparent" 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase text-gray-500">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border-b pb-2 focus:outline-none transition-colors bg-transparent ${
                    formData.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                      ? 'border-red-500 text-red-600 focus:border-red-500'
                      : 'border-black focus:border-gray-400'
                  }`} 
                  required 
                />
                {formData.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                  <p className="text-red-500 text-xs mt-1">Inserisci un indirizzo email valido.</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase text-gray-500">Project Description</label>
                <textarea 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border-b border-black pb-2 focus:outline-none focus:border-gray-400 transition-colors bg-transparent resize-none" 
                  required 
                  placeholder="Tell me about your vision..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting || !isFormValid}
                className="bg-black text-white px-8 py-4 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : (
                  'Send Inquiry'
                )}
              </button>
            </motion.form>
          )}
        </div>
      )}

      {/* Footer / About Section */}
      <footer id="about-section" className="py-20 px-6 border-t border-gray-100">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-light mb-6">About</h3>
            <div className="mb-8">
              <span className="text-xl font-bold tracking-[0.2em] uppercase block mb-4">Elena Vance</span>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                I am a contemporary photographer based in New York, specializing in capturing the subtle interplay between light, shadow, and human emotion. With over a decade of experience in editorial and fine art photography, my work seeks to find stillness in a chaotic world. Let's create something beautiful together.
              </p>
            </div>
            <a href="mailto:hello@elenavance.com" className="text-xl sm:text-2xl md:text-3xl underline decoration-1 underline-offset-8 hover:text-gray-600 transition-colors break-all sm:break-normal">
              hello@elenavance.com
            </a>
          </div>
          
          <div className="flex gap-4 w-full justify-start md:w-auto md:justify-end flex-wrap">
            <a href="#" className="w-12 h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
