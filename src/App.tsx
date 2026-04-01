import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Camera, Utensils, ShoppingBag, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import { ComicCartProvider } from './context/ComicCartContext';

// Pages
import Home from './pages/Home';
import Restaurant from './pages/demos/Restaurant';
import RestaurantMenu from './pages/demos/RestaurantMenu';
import Photographer from './pages/demos/Photographer';
import ComicStore from './pages/demos/ComicStore';
import ComicProduct from './pages/demos/ComicProduct';
import ComicCart from './pages/demos/ComicCart';
import ComicSearch from './pages/demos/ComicSearch';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  // Scroll to top on route change
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
  
  return null;
}

import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <LanguageProvider>
        <ComicCartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo/restaurant" element={<Restaurant />} />
            <Route path="/demo/restaurant/menu" element={<RestaurantMenu />} />
            <Route path="/demo/photographer" element={<Photographer />} />
            <Route path="/demo/comic-store" element={<ComicStore />} />
            <Route path="/demo/comic-store/product/:id" element={<ComicProduct />} />
            <Route path="/demo/comic-store/cart" element={<ComicCart />} />
            <Route path="/demo/comic-store/search" element={<ComicSearch />} />
          </Routes>
        </ComicCartProvider>
      </LanguageProvider>
    </Router>
  );
}
