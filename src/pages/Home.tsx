import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code2, Camera, Utensils, ShoppingBag, ArrowRight, 
  Github, Linkedin, Mail, Smartphone, Globe, Database,
  Zap, Layers, Shield, ChevronRight, Command, Cpu
} from 'lucide-react';
import ProgrammingImg from '../context/Programming.jpg';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08090A] text-[#F2F2F3] font-sans selection:bg-[#5E6AD2] selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#08090A]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">DevStudio</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://www.fiverr.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#F2F2F3] text-black px-4 py-2 rounded-full text-[13px] font-medium hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Hire me on Fiverr
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
              DevStudio can take your ideas
              and bring them to life
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              From concept to deployment, we build high-performance mobile and web applications
              tailored to scale with your business needs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#demos" className="h-12 px-8 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center gap-2">
                Try demos
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
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">Made for modern <br /> product teams</h2>
            <p className="text-xl text-[#8A8F98] max-w-2xl">
              DevStudio is shaped by the practices and principles that distinguish world-class product teams.
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
                <h3 className="text-xl font-medium mb-2">Purpose-built for <br /> hospitality</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-white/60">Restaurant Demo</span>
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
                <h3 className="text-xl font-medium mb-2">Designed to move <br /> fast</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-white/60">Portfolio Demo</span>
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
                <h3 className="text-xl font-medium mb-2">Crafted to <br /> perfection</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-white/60">E-commerce Demo</span>
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
                title: "Custom Development",
                desc: "Tailored web applications built with modern technologies like React, TypeScript, and Node.js to meet your specific needs."
              },
              {
                icon: <Smartphone className="w-6 h-6 text-blue-400" />,
                title: "Responsive Design",
                desc: "Fluid and adaptive layouts that provide an optimal viewing experience across a wide range of devices, from mobile phones to desktop monitors."
              },
              {
                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                title: "Performance Optimization",
                desc: "Fast-loading, SEO-friendly websites optimized for speed and user experience, ensuring your visitors stay engaged."
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
                <span className="text-sm font-semibold">DevStudio</span>
              </div>
              <p className="text-[#8A8F98] text-sm leading-relaxed max-w-xs">
                Designed for the future of software development. Built with React, Tailwind, and Framer Motion.
              </p>
            </div>
            
            {[
              { title: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
              { title: "Company", links: ["About us", "Careers", "Blog", "Customers"] },
              { title: "Resources", links: ["Community", "Contact", "DPA", "Terms of service"] },
              { title: "Developers", links: ["API", "Status", "GitHub", "README"] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-sm font-medium text-white mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-sm text-[#8A8F98] hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.05] gap-4">
            <p className="text-xs text-[#8A8F98]">© {new Date().getFullYear()} DevStudio. All rights reserved.</p>
            <div className="flex gap-6">
              <Github className="w-4 h-4 text-[#8A8F98] hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-4 h-4 text-[#8A8F98] hover:text-white cursor-pointer transition-colors" />
              <Globe className="w-4 h-4 text-[#8A8F98] hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
