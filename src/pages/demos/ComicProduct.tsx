import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Share2, Heart, X, Minus, Plus } from 'lucide-react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { comics } from '../../data/comics';
import { useComicCart } from '../../context/ComicCartContext';
import { useState } from 'react';

export default function ComicProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = comics.find(c => c.id === id);
  const { addToCart, cartCount } = useComicCart();
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <Navigate to="/demo/comic-store" replace />;
  }

  const handleAddToCartClick = () => {
    setShowAddToCartModal(true);
  };

  const handleContinueShopping = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    }, quantity);
    setShowAddToCartModal(false);
    navigate('/demo/comic-store');
  };

  const handleViewCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    }, quantity);
    setShowAddToCartModal(false);
    navigate('/demo/comic-store/cart');
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

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

          <Link to="/demo/comic-store/cart" className="relative cursor-pointer group">
            <ShoppingCart className="w-6 h-6 group-hover:text-[#FFE600] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#FF0055] rounded-full flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[2/3] bg-gray-800 border-8 border-white rotate-2 shadow-[8px_8px_0px_0px_#FFE600]">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -left-6 bg-[#FF0055] text-white w-24 h-24 rounded-full flex items-center justify-center font-black text-xl rotate-[-12deg] shadow-lg animate-bounce">
              HOT!
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#FFE600] text-black font-bold px-3 py-1 uppercase tracking-wider text-sm">
                In Stock
              </span>
              <div className="flex text-[#FFE600]">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < product.rating ? 'fill-current' : 'text-gray-600'}`} 
                  />
                ))}
              </div>
            </div>

            <h1 className="font-comic text-5xl md:text-7xl mb-6 text-white leading-none">
              {product.title}
            </h1>

            <div className="text-3xl font-bold text-[#FFE600] mb-8 font-comic">
              {product.price}
            </div>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10 text-sm border-y border-gray-800 py-6">
              <div>
                <span className="block text-gray-500 uppercase tracking-wider font-bold mb-1">Publisher</span>
                <span className="text-white font-bold text-lg">{product.publisher}</span>
              </div>
              <div>
                <span className="block text-gray-500 uppercase tracking-wider font-bold mb-1">Writer</span>
                <span className="text-white font-bold text-lg">{product.writer}</span>
              </div>
              <div>
                <span className="block text-gray-500 uppercase tracking-wider font-bold mb-1">Artist</span>
                <span className="text-white font-bold text-lg">{product.artist}</span>
              </div>
              <div>
                <span className="block text-gray-500 uppercase tracking-wider font-bold mb-1">Format</span>
                <span className="text-white font-bold text-lg">Print Issue</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCartClick}
                className="flex-1 bg-[#FFE600] text-black font-black uppercase text-xl px-8 py-4 hover:bg-white hover:scale-105 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
              <div className="flex gap-4">
                <button className="bg-gray-800 p-4 hover:bg-[#FF0055] transition-colors border-2 border-transparent hover:border-white">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="bg-gray-800 p-4 hover:bg-[#FF0055] transition-colors border-2 border-transparent hover:border-white">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add to Cart Modal */}
      <AnimatePresence>
        {showAddToCartModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddToCartModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 5 }}
              className="relative bg-white border-4 border-black p-8 max-w-md w-full shadow-[8px_8px_0px_0px_#FFE600]"
            >
              <button 
                onClick={() => setShowAddToCartModal(false)}
                className="absolute top-4 right-4 hover:scale-110 transition-transform"
              >
                <X className="w-6 h-6 text-black" />
              </button>
              
              <h3 className="font-comic text-3xl text-black mb-6 uppercase text-center">Add to Stash?</h3>
              
              <div className="flex items-center justify-center gap-6 mb-8">
                <button 
                  onClick={decrementQuantity}
                  className="w-12 h-12 bg-gray-200 hover:bg-[#FF0055] hover:text-white rounded-full flex items-center justify-center transition-colors border-2 border-black font-bold"
                >
                  <Minus className="w-6 h-6" />
                </button>
                <span className="text-4xl font-black text-black w-16 text-center">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="w-12 h-12 bg-gray-200 hover:bg-[#FFE600] hover:text-black rounded-full flex items-center justify-center transition-colors border-2 border-black font-bold"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleContinueShopping}
                  className="w-full bg-black text-white font-black uppercase text-lg py-4 hover:bg-[#FF0055] transition-colors border-4 border-black"
                >
                  Continue Shopping
                </button>
                <button 
                  onClick={handleViewCart}
                  className="w-full bg-[#FFE600] text-black font-black uppercase text-lg py-4 hover:bg-white transition-colors border-4 border-black"
                >
                  View Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
