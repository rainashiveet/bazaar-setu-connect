import React from 'react';
import { TrendingUp, Star, Flame, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const trendingItems = [
  { id: 32, name: 'खीरा', nameEn: 'Cucumber', price: '₹25/kg', discount: '15% OFF', trending: true },
  { id: 33, name: 'ककड़ी', nameEn: 'Armenian Cucumber', price: '₹30/kg', trending: true },
  { id: 34, name: 'भिंडी', nameEn: 'Okra', price: '₹60/kg', discount: '10% OFF', trending: true },
  { id: 35, name: 'बैंगन', nameEn: 'Eggplant', price: '₹40/kg', trending: true },
];

const seasonalPicks = [
  { id: 36, name: 'सरसों का साग', nameEn: 'Mustard Greens', price: '₹20/bunch', seasonal: true },
  { id: 37, name: 'मेथी', nameEn: 'Fenugreek Leaves', price: '₹15/bunch', seasonal: true },
  { id: 38, name: 'पालक', nameEn: 'Spinach', price: '₹20/bunch', seasonal: true },
  { id: 39, name: 'बथुआ', nameEn: 'Lamb Quarters', price: '₹15/bunch', seasonal: true },
];

const quickSellers = [
  { id: 40, name: 'चाय पत्ती', nameEn: 'Tea Leaves', price: '₹120/250g', fastSelling: true },
  { id: 41, name: 'चीनी', nameEn: 'Sugar', price: '₹45/kg', fastSelling: true },
  { id: 42, name: 'नमक', nameEn: 'Salt', price: '₹20/kg', fastSelling: true },
  { id: 43, name: 'दाल', nameEn: 'Lentils', price: '₹80/kg', fastSelling: true },
];

const recommendations = [
  { id: 44, name: 'गुड़', nameEn: 'Jaggery', price: '₹60/500g', recommended: true },
  { id: 45, name: 'तिल', nameEn: 'Sesame Seeds', price: '₹150/250g', recommended: true },
  { id: 46, name: 'मूंगफली', nameEn: 'Peanuts', price: '₹100/250g', recommended: true },
  { id: 47, name: 'खजूर', nameEn: 'Dates', price: '₹200/250g', recommended: true },
];

export const SuggestedPage: React.FC = () => {
  const { language } = useLanguage();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    try {
      addToCart({
        id: item.id,
        name: item.name,
        nameEn: item.nameEn,
        price: item.price,
        discount: item.discount
      });
      toast.success(language === 'hi' ? 'कार्ट में जोड़ा गया!' : 'Added to cart!');
    } catch (error) {
      toast.error(language === 'hi' ? 'कार्ट में जोड़ने में त्रुटि!' : 'Error adding to cart!');
    }
  };

  const ItemCard = ({ item, icon: Icon, badgeText }: any) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">
                {language === 'hi' ? item.name : item.nameEn}
              </h3>
              {Icon && <Icon className="h-4 w-4 text-orange-500" />}
            </div>
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ? item.nameEn : item.name}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p className="font-semibold text-primary">{item.price}</p>
              {item.discount && (
                <Badge variant="destructive" className="text-xs">
                  {item.discount}
                </Badge>
              )}
            </div>
            {badgeText && (
              <Badge variant="secondary" className="text-xs mt-1">
                {badgeText}
              </Badge>
            )}
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
  );

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-background">
      <div className="p-4 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold">
          {language === 'hi' ? 'सुझाए गए आइटम' : 'Suggested Items'}
        </h1>

        {/* Trending Items */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold">
              {language === 'hi' ? 'ट्रेंडिंग अभी' : 'Trending Now'}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {trendingItems.map((item) => (
              <ItemCard 
                key={item.id} 
                item={item} 
                icon={Flame}
                badgeText={language === 'hi' ? 'ट्रेंडिंग' : 'Trending'}
              />
            ))}
          </div>
        </section>

        {/* Seasonal Picks */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-green-500" />
            <h2 className="text-lg font-semibold">
              {language === 'hi' ? 'मौसमी चुनिंदा' : 'Seasonal Picks'}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {seasonalPicks.map((item) => (
              <ItemCard 
                key={item.id} 
                item={item}
                badgeText={language === 'hi' ? 'मौसमी' : 'Seasonal'}
              />
            ))}
          </div>
        </section>

        {/* Quick Sellers */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">
              {language === 'hi' ? 'तेज़ी से बिकने वाले' : 'Quick Sellers'}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {quickSellers.map((item) => (
              <ItemCard 
                key={item.id} 
                item={item}
                badgeText={language === 'hi' ? 'तेज़ बिक्री' : 'Fast Selling'}
              />
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold">
              {language === 'hi' ? 'आपके लिए सुझाव' : 'Recommended for You'}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {recommendations.map((item) => (
              <ItemCard 
                key={item.id} 
                item={item}
                badgeText={language === 'hi' ? 'सुझावित' : 'Recommended'}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};