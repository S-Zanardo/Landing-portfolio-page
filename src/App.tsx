import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Camera, Utensils, ShoppingBag, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';

// Pages
import Home from './pages/Home';
import Restaurant from './pages/demos/Restaurant';
import Photographer from './pages/demos/Photographer';
import ComicStore from './pages/demos/ComicStore';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  // Scroll to top on route change
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
  
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo/restaurant" element={<Restaurant />} />
        <Route path="/demo/photographer" element={<Photographer />} />
        <Route path="/demo/comic-store" element={<ComicStore />} />
      </Routes>
    </Router>
  );
}
