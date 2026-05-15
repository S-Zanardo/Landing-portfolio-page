import { motion } from 'framer-motion';
import { ArrowLeft, Wheat, Milk, Nut, Fish, Egg, Info, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const GOOGLE_SHEETS_CSV_URL: string = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2z_mLEfl3Zu6i-irGSqf2oWshwyO7efbCnurI3Peo2p_cbvBjgYPWs1oBeWRXcg9qZjO-XE6ewQVp/pub?output=csv";

const AllergenIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "Gluten": return <Wheat className="w-4 h-4" />;
    case "Milk": return <Milk className="w-4 h-4" />;
    case "Nuts": return <Nut className="w-4 h-4" />;
    case "Fish": return <Fish className="w-4 h-4" />;
    case "Egg": return <Egg className="w-4 h-4" />;
    default: return <Info className="w-4 h-4" />;
  }
};

export default function RestaurantMenu() {
  const [menuItems, setMenuItems] = useState<{category: string, items: any[]}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (GOOGLE_SHEETS_CSV_URL === "INSERISCI_QUI_IL_TUO_LINK_CSV_DEL_RISTORANTE") {
      setError("Link al CSV di Google Sheets non configurato. Inserisci un URL valido.");
      setIsLoading(false);
      return;
    }

    Papa.parse(GOOGLE_SHEETS_CSV_URL, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
      complete: (results) => {
        const data = results.data as any[];
        const validItems = data.filter(item => item && item.name && item.category);
        
        const grouped = validItems.reduce((acc, item) => {
          const category = item.category;
          if (!acc[category]) {
            acc[category] = { category: category, items: [] };
          }
          
          acc[category].items.push({
            id: item.id,
            name: item.name,
            description: item.description,
            price: typeof item.price === 'number' ? `$${item.price}` : item.price,
            allergens: item.allergens ? String(item.allergens).split(',').map(a => a.trim()) : [],
            image: item.image
          });
          
          return acc;
        }, {} as Record<string, {category: string, items: any[]}>);

        setMenuItems(Object.values(grouped));
        setIsLoading(false);
      },
      error: (err: any) => {
        console.error("Errore CSV:", err);
        setError(err.message);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDF8F5] flex items-center justify-center text-[#D94E1F] font-serif text-2xl">
        <Loader2 className="w-8 h-8 animate-spin mr-3" /> Loading menu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDF8F5] flex flex-col items-center justify-center text-[#2C1810] font-sans p-6 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-4 max-w-lg">
          <p className="font-bold">Cannot load menu.</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#2C1810] font-serif">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FDF8F5]/90 backdrop-blur-md border-b border-[#E6D5CC]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link to="/demo/restaurant" className="flex items-center gap-2 text-sm font-sans font-medium text-orange-800 hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 
            <span className="sm:hidden">Back</span>
          </Link>
          <span className="text-xl md:text-2xl font-bold italic tracking-wider">Our Menu</span>
          <div className="w-12 sm:w-24"></div> {/* Spacer for centering */}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {menuItems.map((category, index) => (
          <div key={index} className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl italic mb-6 md:mb-8 text-center text-[#D94E1F]">{category.category}</h2>
            <div className="grid gap-6 md:gap-8">
              {category.items.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#E6D5CC]/50 hover:shadow-md transition-shadow"
                >
                  <div className="w-full md:w-48 aspect-video md:aspect-square shrink-0 overflow-hidden rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg md:text-xl font-bold leading-tight">{item.name}</h3>
                        <span className="text-lg font-sans font-semibold text-[#D94E1F] ml-2">{item.price}</span>
                      </div>
                      <p className="text-gray-600 font-sans text-sm leading-relaxed mb-4">{item.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 pt-4 border-t border-[#E6D5CC]/30">
                      <span className="text-xs font-sans font-semibold text-gray-400 uppercase tracking-wider">Allergens:</span>
                      <div className="flex flex-wrap gap-2">
                        {item.allergens.map((allergen: string, i: number) => (
                          <div key={i} className="flex items-center gap-1 text-xs font-sans text-gray-500 bg-gray-100 px-2 py-1 rounded-full" title={allergen}>
                            <AllergenIcon name={allergen} />
                            <span>{allergen}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
