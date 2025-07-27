import React from 'react';
import { Clock, RotateCcw, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const recentOrders = [
  {
    id: 1,
    date: '2024-01-15',
    items: [
      { id: 1, name: 'टमाटर', nameEn: 'Tomatoes', price: '₹40/kg', quantity: 2 },
      { id: 2, name: 'प्याज', nameEn: 'Onions', price: '₹30/kg', quantity: 3 },
      { id: 17, name: 'तेल', nameEn: 'Cooking Oil', price: '₹140/L', quantity: 1 },
    ],
    total: 250
  },
  {
    id: 2,
    date: '2024-01-12',
    items: [
      { id: 11, name: 'चाट मसाला', nameEn: 'Chat Masala', price: '₹80/100g', quantity: 2 },
      { id: 12, name: 'गरम मसाला', nameEn: 'Garam Masala', price: '₹120/100g', quantity: 1 },
      { id: 4, name: 'हरी मिर्च', nameEn: 'Green Chili', price: '₹80/kg', quantity: 1 },
    ],
    total: 360
  },
  {
    id: 3,
    date: '2024-01-10',
    items: [
      { id: 18, name: 'आटा', nameEn: 'Wheat Flour', price: '₹45/kg', quantity: 5 },
      { id: 24, name: 'दूध', nameEn: 'Milk', price: '₹55/L', quantity: 2 },
      { id: 25, name: 'दही', nameEn: 'Yogurt', price: '₹60/500g', quantity: 2 },
    ],
    total: 455
  },
];

const frequentlyOrdered = [
  { id: 1, name: 'टमाटर', nameEn: 'Tomatoes', price: '₹40/kg', orderCount: 8 },
  { id: 17, name: 'तेल', nameEn: 'Cooking Oil', price: '₹140/L', orderCount: 6 },
  { id: 2, name: 'प्याज', nameEn: 'Onions', price: '₹30/kg', orderCount: 7 },
  { id: 18, name: 'आटा', nameEn: 'Wheat Flour', price: '₹45/kg', orderCount: 5 },
];

export const ReorderPage: React.FC = () => {
  const { language } = useLanguage();
  const { addToCart } = useCart();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN');
  };

  const handleReorder = (order: typeof recentOrders[0]) => {
    try {
      order.items.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          addToCart({
            id: item.id,
            name: item.name,
            nameEn: item.nameEn,
            price: item.price
          });
        }
      });
      toast.success(language === 'hi' ? 'ऑर्डर फिर से जोड़ा गया!' : 'Order added to cart!');
    } catch (error) {
      toast.error(language === 'hi' ? 'दोबारा ऑर्डर करने में त्रुटि!' : 'Error reordering!');
    }
  };

  const handleAddToCart = (item: typeof frequentlyOrdered[0]) => {
    try {
      addToCart({
        id: item.id,
        name: item.name,
        nameEn: item.nameEn,
        price: item.price
      });
      toast.success(language === 'hi' ? 'कार्ट में जोड़ा गया!' : 'Added to cart!');
    } catch (error) {
      toast.error(language === 'hi' ? 'कार्ट में जोड़ने में त्रुटि!' : 'Error adding to cart!');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-background">
      <div className="p-4 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold">
          {language === 'hi' ? 'फिर से ऑर्डर करें' : 'Reorder'}
        </h1>

        {/* Frequently Ordered */}
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            {language === 'hi' ? 'अक्सर ऑर्डर किए जाने वाले' : 'Frequently Ordered'}
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {frequentlyOrdered.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">
                          {language === 'hi' ? item.name : item.nameEn}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {item.orderCount}x
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'hi' ? item.nameEn : item.name}
                      </p>
                      <p className="font-semibold text-primary">{item.price}</p>
                    </div>
                    <Button 
                      onClick={() => handleAddToCart(item)}
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {language === 'hi' ? 'जोड़ें' : 'Add'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Orders */}
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {language === 'hi' ? 'हाल के ऑर्डर' : 'Recent Orders'}
          </h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {language === 'hi' ? 'ऑर्डर' : 'Order'} #{order.id}
                    </CardTitle>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.date)}
                      </p>
                      <p className="font-semibold">₹{order.total}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {language === 'hi' ? item.name : item.nameEn} x{item.quantity}
                        </span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={() => handleReorder(order)}
                    className="w-full"
                    variant="outline"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {language === 'hi' ? 'फिर से ऑर्डर करें' : 'Reorder'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};