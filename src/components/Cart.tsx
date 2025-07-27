import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShoppingCart, Plus, Minus, Trash2, Receipt } from "lucide-react";
import { toast } from "sonner";

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { language } = useLanguage();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error(language === 'hi' ? 'कार्ट खाली है!' : 'Cart is empty!');
      return;
    }
    
    toast.success(language === 'hi' 
      ? `ऑर्डर प्लेस किया गया! कुल: ₹${getTotalPrice()}`
      : `Order placed! Total: ₹${getTotalPrice()}`
    );
    clearCart();
  };

  if (items.length === 0) {
    return (
      <Card className="shadow-warm">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="w-6 h-6" />
            {language === 'hi' ? 'कार्ट' : 'Cart'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            {language === 'hi' ? 'आपका कार्ट खाली है' : 'Your cart is empty'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-warm">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center justify-between text-xl">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            {language === 'hi' ? 'कार्ट' : 'Cart'}
          </div>
          <Badge variant="secondary" className="bg-white/20 text-primary-foreground">
            {items.length} {language === 'hi' ? 'आइटम्स' : 'items'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="border-2 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">
                    {language === 'hi' ? item.name : item.nameEn}
                  </h4>
                  <p className="text-primary font-bold">{item.price}</p>
                  {item.discount && (
                    <Badge variant="outline" className="text-warning border-warning mt-1">
                      {item.discount}
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {language === 'hi' ? 'कुल:' : 'Total:'}
                  </p>
                  <p className="font-bold text-primary">
                    ₹{(parseFloat(item.price.replace('₹', '').replace('/kg', '').replace('/L', '')) * item.quantity).toFixed(0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">
              {language === 'hi' ? 'कुल राशि:' : 'Total Amount:'}
            </span>
            <span className="text-2xl font-bold text-primary">
              ₹{getTotalPrice().toFixed(0)}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={clearCart}
              className="flex-1"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {language === 'hi' ? 'साफ़ करें' : 'Clear'}
            </Button>
            <Button
              variant="vendor"
              onClick={handleCheckout}
              className="flex-2"
            >
              <Receipt className="w-4 h-4 mr-2" />
              {language === 'hi' ? 'ऑर्डर करें' : 'Checkout'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};