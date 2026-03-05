import { motion } from 'framer-motion';
import { ArrowLeft, Wheat, Milk, Nut, Fish, Egg, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    category: "Starters",
    items: [
      {
        id: 1,
        name: "Bruschetta al Pomodoro",
        description: "Toasted homemade bread topped with fresh tomatoes, garlic, basil, and extra virgin olive oil.",
        price: "$12",
        allergens: ["Gluten"],
        image: "https://images.unsplash.com/photo-1572695157363-bc31c5d4efb5?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 2,
        name: "Calamari Fritti",
        description: "Crispy fried squid rings served with lemon wedges and marinara sauce.",
        price: "$16",
        allergens: ["Gluten", "Molluscs", "Egg"],
        image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 3,
        name: "Caprese Salad",
        description: "Fresh mozzarella, vine-ripened tomatoes, and basil, drizzled with balsamic glaze.",
        price: "$14",
        allergens: ["Milk"],
        image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    category: "Mains",
    items: [
      {
        id: 4,
        name: "Tagliatelle al Tartufo",
        description: "Fresh handmade pasta with black truffle cream sauce and parmesan.",
        price: "$24",
        allergens: ["Gluten", "Milk", "Egg"],
        image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 5,
        name: "Osso Buco",
        description: "Braised veal shanks cooked with vegetables, white wine and broth.",
        price: "$32",
        allergens: ["Celery"],
        image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 6,
        name: "Grilled Salmon",
        description: "Atlantic salmon fillet served with roasted asparagus and lemon butter sauce.",
        price: "$28",
        allergens: ["Fish", "Milk"],
        image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 7,
        name: "Risotto ai Funghi",
        description: "Creamy arborio rice cooked with porcini mushrooms, white wine, and parmesan.",
        price: "$22",
        allergens: ["Milk"],
        image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    category: "Desserts",
    items: [
      {
        id: 8,
        name: "Tiramisu Classico",
        description: "Traditional coffee-flavoured Italian dessert.",
        price: "$12",
        allergens: ["Gluten", "Milk", "Egg"],
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 9,
        name: "Panna Cotta",
        description: "Silky vanilla cream pudding topped with berry coulis.",
        price: "$10",
        allergens: ["Milk"],
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800"
      }
    ]
  }
];

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
                        {item.allergens.map((allergen, i) => (
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
