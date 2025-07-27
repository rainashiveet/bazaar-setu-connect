import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { 
  ShoppingCart, 
  RotateCcw, 
  Users, 
  Mic, 
  TrendingDown, 
  Bell,
  Star,
  Package,
  LogOut,
  Map
} from "lucide-react";
import { toast } from "sonner";
import GroupBuyMap from "./GroupBuyMap";
import { Cart } from "./Cart";
import { VoiceOrder } from "./VoiceOrder";

const suggestedItems = [
  { id: 1, name: 'प्याज', nameEn: 'Onions', price: '₹25/kg', trending: true, discount: '10% off' },
  { id: 2, name: 'आलू', nameEn: 'Potatoes', price: '₹20/kg', trending: false, discount: null },
  { id: 3, name: 'टमाटर', nameEn: 'Tomatoes', price: '₹30/kg', trending: true, discount: '15% off' },
  { id: 4, name: 'तेल', nameEn: 'Oil', price: '₹120/L', trending: false, discount: null },
  { id: 5, name: 'आटा', nameEn: 'Flour', price: '₹35/kg', trending: false, discount: '5% off' },
  { id: 6, name: 'चावल', nameEn: 'Rice', price: '₹45/kg', trending: true, discount: null },
];

const recentOrders = [
  { id: 1, items: 'प्याज, आलू, टमाटर', itemsEn: 'Onions, Potatoes, Tomatoes', date: '2 days ago', amount: '₹450' },
  { id: 2, items: 'तेल, आटा', itemsEn: 'Oil, Flour', date: '5 days ago', amount: '₹280' },
];

export const VendorDashboard = () => {
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();
  const { addToCart, getTotalItems } = useCart();
  const [showVoiceOrder, setShowVoiceOrder] = useState(false);
  const [showGroupBuy, setShowGroupBuy] = useState(false);

  // Listen for custom events to close modals
  React.useEffect(() => {
    const handleCloseGroupBuy = () => {
      setShowGroupBuy(false);
    };

    window.addEventListener('closeGroupBuy', handleCloseGroupBuy);
    return () => {
      window.removeEventListener('closeGroupBuy', handleCloseGroupBuy);
    };
  }, []);

  const handleAddToCart = (item: any) => {
    console.log('Add to cart clicked for item:', item);
    addToCart(item);
    toast.success(`${language === 'hi' ? item.name : item.nameEn} ${language === 'hi' ? 'कार्ट में जोड़ा गया' : 'added to cart'}`);
  };

  const handleReorder = (order: any) => {
    // Add mock items from the order to cart
    const mockItems = [
      { id: 201, name: 'प्याज', nameEn: 'Onions', price: '₹25/kg' },
      { id: 202, name: 'आलू', nameEn: 'Potatoes', price: '₹20/kg' },
      { id: 203, name: 'टमाटर', nameEn: 'Tomatoes', price: '₹30/kg' },
    ];
    mockItems.forEach(item => addToCart(item));
    toast.success(`${language === 'hi' ? 'फिर से ऑर्डर किया गया:' : 'Reordered:'} ${language === 'hi' ? order.items : order.itemsEn}`);
  };

  const handleVoiceOrder = () => {
    console.log('Voice order button clicked');
    setShowVoiceOrder(true);
    toast.info(language === 'hi' ? 'वॉइस ऑर्डर खोला गया' : 'Voice order opened');
  };

  const handleGroupBuy = () => {
    console.log('Group buy button clicked');
    setShowGroupBuy(true);
    toast.info(language === 'hi' ? 'ग्रुप खरीदारी खोली गई' : 'Group buy opened');
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-gradient-primary p-4 shadow-warm">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary-foreground">
              {t('vendor.welcome')}, {user?.name}!
            </h1>
            <p className="text-primary-foreground/80">
              {new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 relative">
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-warning text-warning-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              className="text-primary-foreground hover:bg-white/20"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="vendor" 
            size="xl" 
            onClick={handleVoiceOrder}
            className="h-24 flex-col gap-2"
          >
            <Mic className="w-8 h-8" />
            <span className="text-base">{language === 'hi' ? 'आवाज से ऑर्डर करें' : 'Voice Order'}</span>
          </Button>
          <Button 
            variant="supplier" 
            size="xl" 
            onClick={handleGroupBuy}
            className="h-24 flex-col gap-2"
          >
            <Users className="w-8 h-8" />
            <span className="text-base">{language === 'hi' ? 'ग्रुप खरीदारी' : 'Group Buy'}</span>
          </Button>
        </div>

        {/* AI Suggested Items */}
        <Card className="shadow-warm">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Star className="w-6 h-6" />
              {language === 'hi' ? 'सुझावित आइटम' : 'Suggested Items'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestedItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg">
                          {language === 'hi' ? item.name : item.nameEn}
                        </h4>
                        <p className="text-2xl font-bold text-primary">{item.price}</p>
                      </div>
                      {item.trending && (
                        <div className="bg-success/10 text-success px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                          <TrendingDown className="w-3 h-3" />
                          Trending
                        </div>
                      )}
                    </div>
                    {item.discount && (
                      <div className="bg-warning/10 text-warning px-2 py-1 rounded mb-3 text-sm font-semibold">
                        {item.discount}
                      </div>
                    )}
                    <Button 
                      variant="vendor" 
                      size="sm" 
                      onClick={() => handleAddToCart(item)}
                      className="w-full"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Voice Order Modal */}
        {showVoiceOrder && <VoiceOrder onClose={() => setShowVoiceOrder(false)} />}

        {/* Cart */}
        <Cart />

        {/* Group Buy Map */}
        {showGroupBuy && <GroupBuyMap />}

        {/* Recent Orders - Quick Reorder */}
        <Card className="shadow-warm">
          <CardHeader className="bg-gradient-secondary text-secondary-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <RotateCcw className="w-6 h-6" />
              {language === 'hi' ? 'फिर से ऑर्डर करें' : 'Reorder'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Card key={order.id} className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="font-semibold">
                          {language === 'hi' ? order.items : order.itemsEn}
                        </h4>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                        <p className="text-lg font-bold text-primary">{order.amount}</p>
                      </div>
                      <Button 
                        variant="supplier" 
                        onClick={() => handleReorder(order)}
                        className="ml-4"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};