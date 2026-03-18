import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChefHat, Clock, MapPin, Phone, Star, Utensils, X, Calendar, Users, Check, Mail, BookOpen, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Restaurant() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [bookingStep, setBookingStep] = useState<'select' | 'confirm' | 'success'>('select');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Generate time slots (11am to 10pm)
  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
    "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"
  ];

  const handleBook = async () => {
    setIsSubmitting(true);
    
    try {
      // Check if EmailJS is configured
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log("Checking EmailJS Keys:", { 
        hasServiceId: !!serviceId, 
        hasTemplateId: !!templateId, 
        hasPublicKey: !!publicKey 
      });

      if (serviceId && templateId && publicKey) {
        const response = await emailjs.send(
          serviceId,
          templateId,
          {
            user_email: email,
            date: selectedDate?.toLocaleDateString(),
            time: selectedTime,
            party_size: partySize,
          },
          publicKey
        );
        console.log("EmailJS Success Response:", response);
      } else {
        // Fallback simulation if keys are missing
        console.warn("EmailJS keys missing. Simulating email sending. Please check your environment variables.");
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setBookingStep('success');
      setTimeout(() => {
        setIsReservationOpen(false);
        setBookingStep('select');
        setSelectedDate(null);
        setSelectedTime(null);
        setEmail('');
      }, 3000);
    } catch (error: any) {
      console.error("Failed to send email:", error);
      const errorMessage = error?.text || error?.message || "Unknown error occurred";
      alert(`Errore durante l'invio dell'email: ${errorMessage}\n\nControlla la console per maggiori dettagli.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#2C1810] font-serif">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#FDF8F5]/90 backdrop-blur-md border-b border-[#E6D5CC]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-2 text-sm font-sans font-medium text-orange-800 hover:text-orange-600 transition-colors z-10">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to Portfolio</span>
          </Link>
          <div className="absolute inset-x-0 h-full flex items-center justify-center pointer-events-none px-28 sm:px-0">
            <span className="text-xl md:text-2xl font-bold italic tracking-wider text-center leading-tight">Trattoria Bella</span>
          </div>
          <button 
            onClick={() => setIsReservationOpen(true)}
            className="bg-[#D94E1F] text-white p-3 rounded-full hover:bg-[#B53E16] transition-colors z-10 flex items-center justify-center"
            title="Book Table"
          >
            <BookOpen className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Reservation Modal */}
      <AnimatePresence>
        {isReservationOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReservationOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-[#2C1810] text-white p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-serif italic">Reserve a Table</h3>
                  <p className="text-white/60 text-sm font-sans">Trattoria Bella</p>
                </div>
                <button 
                  onClick={() => setIsReservationOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {bookingStep === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Reservation Confirmed!</h4>
                    <p className="text-gray-600 font-sans">
                      We look forward to seeing you on {selectedDate?.toLocaleDateString()} at {selectedTime}.
                      <br />
                      <span className="text-sm mt-2 block text-gray-500">A confirmation email has been sent to {email}.</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Party Size */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-sans font-bold text-gray-500 uppercase tracking-wider mb-4">
                        <Users className="w-4 h-4" /> Party Size
                      </label>
                      <div className="flex gap-3 overflow-x-auto p-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                          <button
                            key={size}
                            onClick={() => setPartySize(size)}
                            className={`w-12 h-12 rounded-full font-sans font-bold flex items-center justify-center transition-all ${
                              partySize === size 
                                ? 'bg-[#D94E1F] text-white shadow-lg scale-110' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-sans font-bold text-gray-500 uppercase tracking-wider mb-4">
                        <Calendar className="w-4 h-4" /> Select Date
                      </label>
                      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                        {dates.map((date, i) => {
                          const isSelected = selectedDate?.toDateString() === date.toDateString();
                          const isToday = i === 0;
                          
                          return (
                            <button
                              key={i}
                              onClick={() => setSelectedDate(date)}
                              className={`flex-shrink-0 w-20 p-3 rounded-2xl border transition-all flex flex-col items-center gap-1 ${
                                isSelected
                                  ? 'border-[#D94E1F] bg-[#D94E1F]/5 ring-2 ring-[#D94E1F]/20'
                                  : 'border-gray-200 hover:border-[#D94E1F]/50'
                              }`}
                            >
                              <span className={`text-xs font-sans font-bold uppercase ${isSelected ? 'text-[#D94E1F]' : 'text-gray-400'}`}>
                                {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                              </span>
                              <span className={`text-xl font-bold ${isSelected ? 'text-[#D94E1F]' : 'text-gray-900'}`}>
                                {date.getDate()}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div className={!selectedDate ? 'opacity-50 pointer-events-none' : ''}>
                      <label className="flex items-center gap-2 text-sm font-sans font-bold text-gray-500 uppercase tracking-wider mb-4">
                        <Clock className="w-4 h-4" /> Select Time
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-3 rounded-lg text-sm font-sans font-medium transition-all ${
                              selectedTime === time
                                ? 'bg-[#2C1810] text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className={!selectedTime ? 'opacity-50 pointer-events-none' : ''}>
                      <label className="flex items-center gap-2 text-sm font-sans font-bold text-gray-500 uppercase tracking-wider mb-4">
                        <Mail className="w-4 h-4" /> Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={`w-full p-4 rounded-xl border font-sans focus:outline-none transition-all ${
                          email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50 text-red-900'
                            : 'border-gray-200 focus:border-[#D94E1F] focus:ring-1 focus:ring-[#D94E1F]'
                        }`}
                        required
                      />
                      {email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                        <p className="text-red-500 text-xs mt-2 font-sans font-medium">Inserisci un indirizzo email valido.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              {bookingStep !== 'success' && (
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                  <div className="text-sm font-sans">
                    {selectedDate && selectedTime ? (
                      <span className="text-[#2C1810] font-medium">
                        {selectedDate.toLocaleDateString()} at {selectedTime}
                        <br />
                        <span className="text-gray-500">{partySize} Guests</span>
                      </span>
                    ) : (
                      <span className="text-gray-400">Select date & time</span>
                    )}
                  </div>
                  <button
                    disabled={!selectedDate || !selectedTime || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || isSubmitting}
                    onClick={handleBook}
                    className="bg-[#D94E1F] text-white px-8 py-3 rounded-full font-sans font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#B53E16] transition-colors shadow-lg shadow-orange-900/20 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
            <Link to="/demo/restaurant/menu" className="bg-white text-[#2C1810] px-8 py-4 rounded-full font-sans font-semibold hover:bg-orange-50 transition-colors inline-block">
              View Our Menu
            </Link>
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
