import React, { useState } from 'react';
import { Package, TrendingDown, Calculator, Truck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const bulkItems = [
  { 
    id: 50, 
    name: 'बासमती चावल', 
    nameEn: 'Basmati Rice', 
    price: '₹120/kg', 
    bulkPrice: '₹100/kg',
    minQuantity: 25,
    savings: '17%'
  },
  { 
    id: 51, 
    name: 'तेल (सरसों)', 
    nameEn: 'Mustard Oil', 
    price: '₹160/L', 
    bulkPrice: '₹140/L',
    minQuantity: 15,
    savings: '13%'
  },
  { 
    id: 52, 
    name: 'आटा', 
    nameEn: 'Wheat Flour', 
    price: '₹45/kg', 
    bulkPrice: '₹38/kg',
    minQuantity: 50,
    savings: '16%'
  },
  { 
    id: 53, 
    name: 'चना दाल', 
    nameEn: 'Chana Dal', 
    price: '₹90/kg', 
    bulkPrice: '₹78/kg',
    minQuantity: 20,
    savings: '13%'
  },
  { 
    id: 54, 
    name: 'चीनी', 
    nameEn: 'Sugar', 
    price: '₹48/kg', 
    bulkPrice: '₹42/kg',
    minQuantity: 30,
    savings: '13%'
  },
  { 
    id: 55, 
    name: 'प्याज', 
    nameEn: 'Onions', 
    price: '₹35/kg', 
    bulkPrice: '₹28/kg',
    minQuantity: 50,
    savings: '20%'
  },
];

const bulkCategories = [
  { id: 'staples', name: 'मुख्य सामग्री', nameEn: 'Staples', icon: Package },
  { id: 'spices', name: 'मसाले', nameEn: 'Spices', icon: Package },
  { id: 'oils', name: 'तेल', nameEn: 'Oils', icon: Package },
  { id: 'grains', name: 'अनाज', nameEn: 'Grains', icon: Package },
];

export const BulkOrderPage: React.FC = () => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: quantity
    }));
  };

  const handleAddToBulkCart = (item: typeof bulkItems[0]) => {
    const quantity = quantities[item.id] || item.minQuantity;
    
    if (quantity < item.minQuantity) {
      toast.error(
        language === 'hi' 
          ? `न्यूनतम मात्रा ${item.minQuantity} होनी चाहिए`
          : `Minimum quantity should be ${item.minQuantity}`
      );
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: item.id,
        name: item.name,
        nameEn: item.nameEn,
        price: item.bulkPrice
      });
    }
    
    toast.success(
      language === 'hi' 
        ? `${quantity} ${item.name} थोक कार्ट में जोड़ा गया!`
        : `${quantity} ${item.nameEn} added to bulk cart!`
    );
  };

  const calculateSavings = (item: typeof bulkItems[0], quantity: number) => {
    const regularPrice = parseFloat(item.price.replace('₹', '').replace('/kg', '').replace('/L', ''));
    const bulkPrice = parseFloat(item.bulkPrice.replace('₹', '').replace('/kg', '').replace('/L', ''));
    return (regularPrice - bulkPrice) * quantity;
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-background">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Package className="h-6 w-6" />
            {language === 'hi' ? 'थोक ऑर्डर' : 'Bulk Orders'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'hi' 
              ? 'बड़ी मात्रा में खरीदें और पैसे बचाएं'
              : 'Buy in large quantities and save money'}
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center p-3">
            <TrendingDown className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-xs font-medium">
              {language === 'hi' ? 'कम कीमत' : 'Lower Prices'}
            </p>
          </Card>
          <Card className="text-center p-3">
            <Truck className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-xs font-medium">
              {language === 'hi' ? 'मुफ्त डिलीवरी' : 'Free Delivery'}
            </p>
          </Card>
          <Card className="text-center p-3">
            <Calculator className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-xs font-medium">
              {language === 'hi' ? 'अधिक बचत' : 'More Savings'}
            </p>
          </Card>
        </div>

        {/* Bulk Items */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            {language === 'hi' ? 'थोक आइटम' : 'Bulk Items'}
          </h2>
          <div className="space-y-4">
            {bulkItems.map((item) => {
              const quantity = quantities[item.id] || item.minQuantity;
              const savings = calculateSavings(item, quantity);
              
              return (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base mb-1">
                          {language === 'hi' ? item.name : item.nameEn}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {language === 'hi' ? item.nameEn : item.name}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.savings} {language === 'hi' ? 'बचत' : 'OFF'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {language === 'hi' ? 'नियमित कीमत' : 'Regular Price'}
                        </p>
                        <p className="line-through text-sm">{item.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {language === 'hi' ? 'थोक कीमत' : 'Bulk Price'}
                        </p>
                        <p className="font-semibold text-primary">{item.bulkPrice}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${item.id}`}>
                        {language === 'hi' ? 'मात्रा' : 'Quantity'} 
                        <span className="text-xs text-muted-foreground ml-1">
                          (min: {item.minQuantity})
                        </span>
                      </Label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min={item.minQuantity}
                        value={quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || item.minQuantity)}
                        placeholder={item.minQuantity.toString()}
                      />
                    </div>

                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>{language === 'hi' ? 'कुल बचत:' : 'Total Savings:'}</span>
                        <span className="font-semibold text-green-600">
                          ₹{savings.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{language === 'hi' ? 'कुल कीमत:' : 'Total Cost:'}</span>
                        <span className="font-semibold">
                          ₹{(parseFloat(item.bulkPrice.replace('₹', '').replace('/kg', '').replace('/L', '')) * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleAddToBulkCart(item)}
                      className="w-full"
                      disabled={quantity < item.minQuantity}
                    >
                      {language === 'hi' ? 'थोक कार्ट में जोड़ें' : 'Add to Bulk Cart'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Contact for Custom Bulk Orders */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold mb-2">
              {language === 'hi' ? 'कस्टम थोक ऑर्डर चाहिए?' : 'Need Custom Bulk Orders?'}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {language === 'hi' 
                ? 'विशेष मात्रा या कीमत के लिए हमसे संपर्क करें'
                : 'Contact us for special quantities or pricing'}
            </p>
            <Button variant="outline">
              {language === 'hi' ? 'संपर्क करें' : 'Contact Us'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};