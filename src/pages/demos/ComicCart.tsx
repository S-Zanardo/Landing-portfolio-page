import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trash2, ShoppingBag, CheckCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useComicCart } from '../../context/ComicCartContext';
import { useState } from 'react';

export default function ComicCart() {
  const { items, removeFromCart, clearCart, cartTotal } = useComicCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false);

  const processCheckout = () => {
    setShowUpsellModal(false);
    setShowCheckoutModal(true);
    setTimeout(() => {
      clearCart();
    }, 2000); // Simulate processing time before clearing cart
  };

  const handleCheckout = () => {
    if (cartTotal < 50) {
      setShowUpsellModal(true);
    } else {
      processCheckout();
    }
  };

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

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckoutModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              className="relative bg-white border-4 border-black p-12 max-w-md w-full text-center shadow-[8px_8px_0px_0px_#FFE600]"
            >
              <button 
                onClick={() => setShowCheckoutModal(false)}
                className="absolute top-4 right-4 hover:scale-110 transition-transform"
              >
                <X className="w-6 h-6 text-black" />
              </button>
              
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="font-comic text-4xl text-black mb-4 uppercase">Order Placed!</h3>
              <p className="text-black font-bold text-xl mb-2">Your comics are on their way!</p>
              <p className="text-gray-600">Thanks for shopping with POW! COMICS.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
