import { motion } from 'framer-motion';
import { ArrowLeft, ChefHat, Clock, MapPin, Phone, Star, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Restaurant() {
  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#2C1810] font-serif">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#FDF8F5]/90 backdrop-blur-md border-b border-[#E6D5CC]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-sans font-medium text-orange-800 hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          <span className="text-2xl font-bold italic tracking-wider">Trattoria Bella</span>
          <button className="bg-[#D94E1F] text-white px-6 py-2 rounded-full font-sans text-sm font-medium hover:bg-[#B53E16] transition-colors">
            Book Table
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-sans text-sm tracking-[0.2em] uppercase mb-4 block text-orange-200">Authentic Italian Cuisine</span>
            <h1 className="text-6xl md:text-8xl mb-6 font-serif italic">Taste of Tuscany</h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-10 text-white/90">
              Handmade pasta, wood-fired pizza, and the finest wines in the heart of the city.
            </p>
            <button className="bg-white text-[#2C1810] px-8 py-4 rounded-full font-sans font-semibold hover:bg-orange-50 transition-colors">
              View Our Menu
            </button>
          </motion.div>
        </div>
      </header>

      {/* Info Bar */}
      <div className="bg-[#2C1810] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center font-sans">
          <div className="flex flex-col items-center gap-3">
            <Clock className="w-6 h-6 text-[#D94E1F]" />
            <h3 className="font-semibold text-lg">Opening Hours</h3>
            <p className="text-white/70 text-sm">Mon-Sun: 11am - 11pm</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <MapPin className="w-6 h-6 text-[#D94E1F]" />
            <h3 className="font-semibold text-lg">Location</h3>
            <p className="text-white/70 text-sm">123 Culinary Ave, Food District</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Phone className="w-6 h-6 text-[#D94E1F]" />
            <h3 className="font-semibold text-lg">Reservations</h3>
            <p className="text-white/70 text-sm">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>

      {/* Featured Menu */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D94E1F] font-sans font-bold text-sm tracking-widest uppercase">Our Specialties</span>
            <h2 className="text-4xl md:text-5xl mt-3 mb-6 italic">Chef's Selection</h2>
            <div className="w-24 h-1 bg-[#D94E1F] mx-auto" />
          </div>

          <div className="grid gap-12">
            {[
              {
                name: "Tagliatelle al Tartufo",
                desc: "Fresh handmade pasta with black truffle cream sauce and parmesan.",
                price: "$24",
                image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800"
              },
              {
                name: "Osso Buco",
                desc: "Braised veal shanks cooked with vegetables, white wine and broth.",
                price: "$32",
                image: "https://images.unsplash.com/photo-1544510808-91bcbee1df55?auto=format&fit=crop&q=80&w=800"
              },
              {
                name: "Tiramisu Classico",
                desc: "Traditional coffee-flavoured Italian dessert.",
                price: "$12",
                image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 items-center group cursor-pointer"
              >
                <div className="w-full md:w-1/3 aspect-[4/3] overflow-hidden rounded-2xl">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <div className="flex items-baseline justify-between mb-2 border-b border-[#E6D5CC] pb-2 border-dashed">
                    <h3 className="text-2xl font-bold">{item.name}</h3>
                    <span className="text-xl font-sans font-semibold text-[#D94E1F]">{item.price}</span>
                  </div>
                  <p className="text-gray-600 font-sans leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#F5EBE0] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-8">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-[#D94E1F] fill-current" />)}
          </div>
          <blockquote className="text-3xl md:text-4xl italic leading-relaxed mb-8">
            "The best Italian food I've had outside of Rome. The atmosphere is magical and the service is impeccable."
          </blockquote>
          <cite className="font-sans font-bold text-gray-500 not-italic">— Food Critic Magazine</cite>
        </div>
      </section>
    </div>
  );
}
