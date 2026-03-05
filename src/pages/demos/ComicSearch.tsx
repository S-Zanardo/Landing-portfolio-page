import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { comics } from '../../data/comics';
import { useComicCart } from '../../context/ComicCartContext';

export default function ComicSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const { cartCount } = useComicCart();

  const filteredComics = comics.filter(comic => 
    comic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-comic text-5xl mb-8 text-center text-white">Find Your Next Adventure</h1>
        
        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <input
            type="text"
            placeholder="Search comics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-black font-bold text-xl px-6 py-4 border-4 border-black focus:outline-none focus:border-[#FFE600] shadow-[8px_8px_0px_0px_#FF0055]"
            autoFocus
          />
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-black" />
        </div>

        {/* Results */}
        {searchTerm && (
          <p className="text-gray-400 mb-8 font-bold uppercase tracking-wide">
            Found {filteredComics.length} results for "{searchTerm}"
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {filteredComics.map((item) => (
            <Link to={`/demo/comic-store/product/${item.id}`} key={item.id}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[2/3] mb-4 overflow-hidden border-4 border-transparent group-hover:border-[#FFE600] transition-colors bg-gray-800">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-[#FFE600] transition-colors">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{item.price}</span>
                  <div className="flex text-[#FFE600]">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < item.rating ? 'fill-current' : 'text-gray-600'}`} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {filteredComics.length === 0 && searchTerm && (
          <div className="text-center py-20">
            <h2 className="font-comic text-3xl text-gray-500 mb-4">No comics found!</h2>
            <p className="text-xl text-gray-400">Try searching for something else like "Spider-Man" or "Batman".</p>
          </div>
        )}
      </div>
    </div>
  );
}
