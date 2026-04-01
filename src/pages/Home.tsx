import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code2, Camera, Utensils, ShoppingBag, ArrowRight, 
  Github, Linkedin, Mail, Smartphone, Globe, Database,
  Zap, Layers, Shield, ChevronRight, Command, Cpu
} from 'lucide-react';
import ProgrammingImg from '../context/Programming.jpg';

import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'it' : 'en');
  };

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F2F2F3] font-sans selection:bg-[#5E6AD2] selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#08090A]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Zanardo DEV</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-full bg-[#F2F2F3] flex items-center justify-center hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden"
              title={language === 'en' ? "Switch to Italian" : "Passa all'inglese"}
            >
              {language === 'en' ? (
                <img src="https://flagcdn.com/w80/it.png" alt="Italian Flag" className="w-full h-full object-cover" />
              ) : (
                <img src="https://flagcdn.com/w80/us.png" alt="USA Flag" className="w-full h-full object-cover" />
              )}
            </button>
            <a 
              href="https://it.fiverr.com/s/jjzYjko" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#F2F2F3] text-black px-4 py-2 rounded-full text-[13px] font-medium hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] text-center flex items-center justify-center"
            >
              {t('hireMe')}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={ProgrammingImg} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#08090A]" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-medium tracking-[-0.02em] leading-[1.1] mb-8 pb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent drop-shadow-2xl">
              {t('heroTitle')}
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#demos" className="h-12 px-8 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center gap-2">
                {t('tryDemos')}
                <ChevronRight className="w-4 h-4 opacity-50" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Bento Grid Demos */}
      <section id="demos" className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">{t('madeFor')}</h2>
            <p className="text-xl text-[#8A8F98] max-w-2xl">
              {t('madeForDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Restaurant */}
            <Link to="/demo/restaurant" className="group relative h-[480px] rounded-3xl bg-[#0F1115] border border-white/[0.08] overflow-hidden hover:border-white/[0.15] transition-all">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000" 
                alt="Restaurant"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mb-4 backdrop-blur-md">
                  <Utensils className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">{t('restaurantTitle')}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-white/60">{t('restaurantSubtitle')}</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2: Photographer */}
            <Link to="/demo/photographer" className="group relative h-[480px] rounded-3xl bg-[#0F1115] border border-white/[0.08] overflow-hidden hover:border-white/[0.15] transition-all">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=1000" 
                alt="Photographer"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-4 backdrop-blur-md">
                  <Camera className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">{t('photographerTitle')}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-white/60">{t('photographerSubtitle')}</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 3: Comic Store */}
            <Link to="/demo/comic-store" className="group relative h-[480px] rounded-3xl bg-[#0F1115] border border-white/[0.08] overflow-hidden hover:border-white/[0.15] transition-all">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=1000" 
                alt="Comic Store"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center mb-4 backdrop-blur-md">
                  <ShoppingBag className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">{t('comicStoreTitle')}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-white/60">{t('comicStoreSubtitle')}</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>



      {/* Grid Features */}
      <section className="py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 className="w-6 h-6 text-purple-400" />,
                title: t('customDevTitle'),
                desc: t('customDevDesc')
              },
              {
                icon: <Smartphone className="w-6 h-6 text-blue-400" />,
                title: t('responsiveDesignTitle'),
                desc: t('responsiveDesignDesc')
              },
              {
                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                title: t('perfOptTitle'),
                desc: t('perfOptDesc')
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#0F1115] border border-white/[0.08] hover:bg-white/[0.02] transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-[#8A8F98] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/[0.05] bg-[#050505]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-6 gap-12 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                  <Code2 className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-semibold">Zanardo DEV</span>
              </div>
              <p className="text-[#8A8F98] text-sm leading-relaxed max-w-xs">
                {t('footerDesc')}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-white mb-4">{t('demos')}</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/demo/restaurant" className="text-sm text-[#8A8F98] hover:text-white transition-colors">
                    {t('restaurant')}
                  </Link>
                </li>
                <li>
                  <Link to="/demo/photographer" className="text-sm text-[#8A8F98] hover:text-white transition-colors">
                    {t('portfolio')}
                  </Link>
                </li>
                <li>
                  <Link to="/demo/comic-store" className="text-sm text-[#8A8F98] hover:text-white transition-colors">
                    {t('ecommerce')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-white mb-4">{t('socials')}</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://github.com/S-Zanardo" target="_blank" rel="noopener noreferrer" className="text-sm text-[#8A8F98] hover:text-white transition-colors flex items-center gap-2">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/simone-zanardo-122b0b148/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#8A8F98] hover:text-white transition-colors flex items-center gap-2">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </li>
                <li>
              <a href="https://it.fiverr.com/s/jjzYjko" target="_blank" rel="noopener noreferrer" className="text-sm text-[#8A8F98] hover:text-white transition-colors flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Fiverr
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.05] gap-4">
            <p className="text-xs text-[#8A8F98]">© {new Date().getFullYear()} Zanardo DEV. {t('rightsReserved')}</p>
            <div className="flex gap-6">
              <a href="https://github.com/S-Zanardo" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 text-[#8A8F98] hover:text-white cursor-pointer transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/simone-zanardo-122b0b148/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 text-[#8A8F98] hover:text-white cursor-pointer transition-colors" />
              </a>
              <a href="https://it.fiverr.com/s/jjzYjko" target="_blank" rel="noopener noreferrer">
                <Globe className="w-4 h-4 text-[#8A8F98] hover:text-white cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
