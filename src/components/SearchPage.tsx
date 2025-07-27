import React, { useState, useMemo } from 'react';
import { Search, Filter, Mic } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const allItems = [
  // Vegetables
  { id: 1, name: 'टमाटर', nameEn: 'Tomatoes', price: '₹40/kg', category: 'vegetables', trending: true },
  { id: 2, name: 'प्याज', nameEn: 'Onions', price: '₹30/kg', category: 'vegetables' },
  { id: 3, name: 'आलू', nameEn: 'Potatoes', price: '₹25/kg', category: 'vegetables' },
  { id: 4, name: 'हरी मिर्च', nameEn: 'Green Chili', price: '₹80/kg', category: 'vegetables' },
  { id: 5, name: 'धनिया', nameEn: 'Coriander', price: '₹20/bunch', category: 'vegetables' },
  { id: 6, name: 'पुदीना', nameEn: 'Mint', price: '₹15/bunch', category: 'vegetables' },
  { id: 7, name: 'अदरक', nameEn: 'Ginger', price: '₹120/kg', category: 'vegetables' },
  { id: 8, name: 'लहसुन', nameEn: 'Garlic', price: '₹200/kg', category: 'vegetables' },
  { id: 9, name: 'गाजर', nameEn: 'Carrots', price: '₹35/kg', category: 'vegetables' },
  { id: 10, name: 'मटर', nameEn: 'Green Peas', price: '₹60/kg', category: 'vegetables' },

  // Spices & Condiments
  { id: 11, name: 'चाट मसाला', nameEn: 'Chat Masala', price: '₹80/100g', category: 'spices' },
  { id: 12, name: 'गरम मसाला', nameEn: 'Garam Masala', price: '₹120/100g', category: 'spices' },
  { id: 13, name: 'हल्दी पाउडर', nameEn: 'Turmeric Powder', price: '₹60/250g', category: 'spices' },
  { id: 14, name: 'लाल मिर्च पाउडर', nameEn: 'Red Chili Powder', price: '₹100/250g', category: 'spices' },
  { id: 15, name: 'जीरा पाउडर', nameEn: 'Cumin Powder', price: '₹150/250g', category: 'spices' },
  { id: 16, name: 'धनिया पाउडर', nameEn: 'Coriander Powder', price: '₹80/250g', category: 'spices' },

  // Street Food Ingredients
  { id: 17, name: 'तेल', nameEn: 'Cooking Oil', price: '₹140/L', category: 'ingredients', trending: true },
  { id: 18, name: 'आटा', nameEn: 'Wheat Flour', price: '₹45/kg', category: 'ingredients' },
  { id: 19, name: 'बेसन', nameEn: 'Gram Flour', price: '₹80/kg', category: 'ingredients' },
  { id: 20, name: 'चावल', nameEn: 'Rice', price: '₹55/kg', category: 'ingredients' },
  { id: 21, name: 'चना', nameEn: 'Chickpeas', price: '₹70/kg', category: 'ingredients' },
  { id: 22, name: 'राजमा', nameEn: 'Kidney Beans', price: '₹120/kg', category: 'ingredients' },
  { id: 23, name: 'पापड़', nameEn: 'Papad', price: '₹180/pack', category: 'ingredients' },

  // Dairy & Fresh
  { id: 24, name: 'दूध', nameEn: 'Milk', price: '₹55/L', category: 'dairy' },
  { id: 25, name: 'दही', nameEn: 'Yogurt', price: '₹60/500g', category: 'dairy' },
  { id: 26, name: 'पनीर', nameEn: 'Paneer', price: '₹280/250g', category: 'dairy' },
  { id: 27, name: 'मक्खन', nameEn: 'Butter', price: '₹120/100g', category: 'dairy' },

  // Snacks & Ready Items
  { id: 28, name: 'पानी पुरी', nameEn: 'Pani Puri Shells', price: '₹40/pack', category: 'snacks' },
  { id: 29, name: 'भेल मिक्स', nameEn: 'Bhel Mix', price: '₹60/500g', category: 'snacks' },
  { id: 30, name: 'सेव', nameEn: 'Sev', price: '₹80/250g', category: 'snacks' },
  { id: 31, name: 'चटनी', nameEn: 'Chutney', price: '₹25/bottle', category: 'snacks' },
];

const categories = [
  { id: 'all', name: 'सभी', nameEn: 'All' },
  { id: 'vegetables', name: 'सब्जियां', nameEn: 'Vegetables' },
  { id: 'spices', name: 'मसाले', nameEn: 'Spices' },
  { id: 'ingredients', name: 'सामग्री', nameEn: 'Ingredients' },
  { id: 'dairy', name: 'डेयरी', nameEn: 'Dairy' },
  { id: 'snacks', name: 'स्नैक्स', nameEn: 'Snacks' },
];

interface SearchPageProps {
  onVoiceOrder: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onVoiceOrder }) => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = useMemo(() => {
    let items = allItems;
    
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return items;
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (item: typeof allItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      nameEn: item.nameEn,
      price: item.price
    });
    toast.success(language === 'hi' ? 'कार्ट में जोड़ा गया!' : 'Added to cart!');
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-background">
      <div className="p-4 space-y-4">
        {/* Search Header */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={language === 'hi' ? 'आइटम खोजें...' : 'Search items...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={onVoiceOrder} variant="outline" size="icon">
            <Mic className="h-4 w-4" />
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {language === 'hi' ? category.name : category.nameEn}
            </Button>
          ))}
        </div>

        {/* Search Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {language === 'hi' 
                ? `${filteredItems.length} आइटम मिले` 
                : `${filteredItems.length} items found`}
            </h3>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              {language === 'hi' ? 'फिल्टर' : 'Filter'}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">
                          {language === 'hi' ? item.name : item.nameEn}
                        </h4>
                        {item.trending && (
                          <Badge variant="secondary" className="text-xs">
                            {language === 'hi' ? 'ट्रेंडिंग' : 'Trending'}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'hi' ? item.nameEn : item.name}
                      </p>
                      <p className="font-semibold text-primary mt-1">{item.price}</p>
                    </div>
                    <Button 
                      onClick={() => handleAddToCart(item)}
                      size="sm"
                    >
                      {language === 'hi' ? 'जोड़ें' : 'Add'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {language === 'hi' 
                  ? 'कोई आइटम नहीं मिला' 
                  : 'No items found'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};