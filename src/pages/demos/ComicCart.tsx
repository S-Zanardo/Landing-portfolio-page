import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trash2, ShoppingBag, CheckCircle, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useComicCart } from '../../context/ComicCartContext';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ComicCart() {
  const { items, removeFromCart, clearCart, cartTotal } = useComicCart();
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  
  // Checkout Form State
  const [showCheckoutFormModal, setShowCheckoutFormModal] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '', address: '' });
  const [isSubmittingCheckout, setIsSubmittingCheckout] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const processCheckout = () => {
    setShowUpsellModal(false);
    setShowCheckoutFormModal(true);
  };

  const handleCheckout = () => {
    if (cartTotal < 50) {
      setShowUpsellModal(true);
    } else {
      processCheckout();
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    console.log("Checkout submission started with form:", checkoutForm);
    setIsSubmittingCheckout(true);
    
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log("Checking EmailJS Keys for Checkout:", { 
        hasServiceId: !!serviceId, 
        hasTemplateId: !!templateId, 
        hasPublicKey: !!publicKey 
      });

      const orderDetails = items.map(item => `${item.quantity}x ${item.title} (${item.price})`).join('\n');
      const total = (cartTotal + (cartTotal > 50 ? 0 : 15)).toFixed(2);

      const templateParams = {
        user_name: checkoutForm.name,
        user_email: checkoutForm.email,
        project_type: "📖 Comic Store Order",
        message: `Shipping Address:\n${checkoutForm.address}\n\nOrder Details:\n${orderDetails}\n\nTotal: $${total}`
      };

      console.log("Sending to EmailJS with params:", templateParams);

      if (serviceId && templateId && publicKey) {
        const response = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          publicKey
        );
        console.log("EmailJS Success Response:", response);
      } else {
        console.warn("EmailJS keys missing. Simulating email sending.");
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      console.log("Checkout process completed successfully. Clearing cart and showing success message.");
      setCheckoutSuccess(true);
      setCheckoutForm({ name: '', email: '', address: '' });
      clearCart();
      
      setTimeout(() => {
        setCheckoutSuccess(false);
        setShowCheckoutFormModal(false);
      }, 4000);
      
    } catch (error: any) {
      console.error("Failed to send order email:", error);
      alert(`Errore durante l'invio dell'ordine: ${error?.text || error?.message || "Unknown error"}`);
    } finally {
      setIsSubmittingCheckout(false);
    }
  };

  const isCheckoutValid = 
    checkoutForm.name.trim() !== '' && 
    checkoutForm.address.trim() !== '' && 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutForm.email);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1a1a1a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/demo/comic-store" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Link>
          
          <Link to="/demo/comic-store" className="font-comic text-2xl tracking-wider text-[#FFE600] -rotate-2 hover:scale-110 transition-transform">
            POW! COMICS
          </Link>

          <div className="w-6" /> {/* Spacer for centering logo */}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-comic text-5xl mb-12 text-center">Your Stash</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-600" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty!</h2>
            <p className="text-gray-400 mb-8">Time to fill it with some epic adventures.</p>
            <Link 
              to="/demo/comic-store"
              className="inline-block bg-[#FFE600] text-black font-black uppercase text-xl px-8 py-4 hover:bg-white hover:scale-105 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-gray-800 p-4 flex gap-6 items-center border-2 border-transparent hover:border-[#FFE600] transition-colors"
              >
                <div className="w-24 aspect-[2/3] flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover border-2 border-white"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-comic text-xl mb-1">{item.title}</h3>
                  <p className="text-[#FFE600] font-bold text-lg">{item.price}</p>
                  <p className="text-sm text-gray-400 mt-1">Quantity: {item.quantity}</p>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 hover:bg-[#FF0055] hover:text-white rounded-full transition-colors group"
                  title="Remove item"
                >
                  <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </motion.div>
            ))}

            <div className="border-t border-gray-700 pt-8 mt-8 space-y-4">
              <div className="flex justify-between items-center text-xl text-gray-400">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xl text-gray-400">
                <span>Shipping</span>
                <span>{cartTotal > 50 ? 'FREE' : '$15.00'}</span>
              </div>
              <div className="flex justify-between items-center text-3xl font-bold pt-4 border-t border-gray-700">
                <span>Total</span>
                <span className="text-[#FFE600]">${(cartTotal + (cartTotal > 50 ? 0 : 15)).toFixed(2)}</span>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-[#FFE600] text-black font-black uppercase text-2xl py-6 hover:bg-white hover:scale-[1.02] transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] mt-8"
              >
                Checkout Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upsell Modal */}
      <AnimatePresence>
        {showUpsellModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpsellModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              className="relative bg-white border-4 border-black p-8 max-w-md w-full text-center shadow-[8px_8px_0px_0px_#FFE600]"
            >
              <button 
                onClick={() => setShowUpsellModal(false)}
                className="absolute top-4 right-4 hover:scale-110 transition-transform"
              >
                <X className="w-6 h-6 text-black" />
              </button>
              
              <div className="text-6xl mb-6">😱</div>
              <h3 className="font-comic text-3xl text-black mb-4 uppercase">Wait!</h3>
              <p className="text-black font-bold text-xl mb-6">
                You are only <span className="text-[#FF0055]">${(50 - cartTotal).toFixed(2)}</span> away from <br/>
                <span className="bg-[#FFE600] px-2">FREE SHIPPING!</span>
              </p>

              <div className="flex flex-col gap-4">
                <Link to="/demo/comic-store" className="w-full">
                  <button className="w-full bg-[#FFE600] text-black font-black uppercase text-xl px-8 py-4 hover:bg-white hover:scale-105 transition-all shadow-[4px_4px_0px_0px_black] border-2 border-black">
                    Continue Shopping
                  </button>
                </Link>
                
                <button 
                  onClick={processCheckout}
                  className="w-full text-gray-400 font-bold uppercase text-sm py-2 hover:text-black transition-colors underline"
                >
                  Checkout & Pay Shipping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Form Modal */}
      <AnimatePresence>
        {showCheckoutFormModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmittingCheckout && setShowCheckoutFormModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              className="relative bg-white border-4 border-black p-8 max-w-lg w-full shadow-[12px_12px_0px_0px_rgba(255,0,85,1)]"
            >
              <button 
                onClick={() => setShowCheckoutFormModal(false)}
                className="absolute top-4 right-4 hover:scale-110 transition-transform bg-black text-white rounded-full p-1"
                disabled={isSubmittingCheckout}
              >
                <X className="w-5 h-5" />
              </button>
              
              {checkoutSuccess ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-6">🚀</div>
                  <h3 className="font-comic text-4xl text-black mb-4 uppercase">Order Placed!</h3>
                  <p className="text-black font-bold text-xl mb-2">Your comics are on their way!</p>
                  <p className="text-gray-600">Thanks for shopping with POW! COMICS.</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="font-comic text-3xl text-black uppercase mb-2">Complete Order</h3>
                    <p className="text-gray-600 font-bold">Where should we send your epic loot?</p>
                  </div>
                  
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="block text-black font-black uppercase mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={checkoutForm.name}
                        onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border-4 border-black font-bold text-black focus:outline-none focus:border-[#FF0055] transition-colors"
                        placeholder="Peter Parker"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-black font-black uppercase mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                        className={`w-full px-4 py-3 bg-gray-50 border-4 font-bold text-black focus:outline-none transition-colors ${
                          checkoutForm.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutForm.email)
                            ? 'border-red-500 focus:border-red-500 bg-red-50'
                            : 'border-black focus:border-[#FF0055]'
                        }`}
                        placeholder="spidey@dailybugle.com"
                        required
                      />
                      {checkoutForm.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutForm.email) && (
                        <p className="text-red-500 text-xs font-bold mt-1 uppercase">Invalid email format</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-black font-black uppercase mb-1">Shipping Address</label>
                      <textarea 
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border-4 border-black font-bold text-black focus:outline-none focus:border-[#FF0055] transition-colors resize-none"
                        placeholder="20 Ingram Street, Queens, NY"
                        rows={3}
                        required
                      />
                    </div>
                    
                    <button 
                      type="button"
                      onClick={handleCheckoutSubmit}
                      disabled={isSubmittingCheckout || !isCheckoutValid}
                      className="w-full bg-[#FFE600] text-black font-black uppercase text-xl px-8 py-4 hover:bg-[#FF0055] hover:text-white transition-all border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                    >
                      {isSubmittingCheckout ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" /> Processing...
                        </>
                      ) : (
                        `Pay $${(cartTotal + (cartTotal > 50 ? 0 : 15)).toFixed(2)}`
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
