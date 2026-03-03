import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Instagram, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Photographer() {
  const images = [
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=1000"
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-[1800px] mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase hover:opacity-50 transition-opacity">
            <ArrowLeft className="w-3 h-3" /> Portfolio
          </Link>
          <span className="text-xl font-bold tracking-[0.2em] uppercase">Elena Vance</span>
          <div className="flex gap-6 text-xs font-medium tracking-widest uppercase">
            <a href="#" className="hover:opacity-50 transition-opacity">Work</a>
            <a href="#" className="hover:opacity-50 transition-opacity">About</a>
            <a href="#" className="hover:opacity-50 transition-opacity">Contact</a>
          </div>
        </div>
      </nav>

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
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-[3/4] bg-gray-100 relative group overflow-hidden cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Gallery ${i}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs tracking-widest uppercase">View Project</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-gray-100">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <h3 className="text-2xl font-light mb-6">Let's work together</h3>
            <a href="mailto:hello@elenavance.com" className="text-4xl underline decoration-1 underline-offset-8 hover:text-gray-600 transition-colors">
              hello@elenavance.com
            </a>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="w-12 h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
