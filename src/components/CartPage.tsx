import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Wallet } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { initiatePayment, mockPayment } from '@/services/paymentService';

export const CartPage: React.FC = () => {
  const { language } = useLanguage();
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error(language === 'hi' ? 'कार्ट खाली है!' : 'Cart is empty!');
      return;
    }
    setIsPaymentDialogOpen(true);
  };

  const processPayment = async (method: 'razorpay' | 'mock') => {
    setIsProcessing(true);
    const totalAmount = getTotalPrice();
    
    try {
      let success = false;
      
      if (method === 'razorpay') {
        success = await initiatePayment({
          amount: totalAmount,
          description: `Order for ${items.length} items`,
          prefill: {
            name: 'Customer',
            email: 'customer@example.com',
            contact: '9999999999'
          }
        });
      } else {
        success = await mockPayment(totalAmount);
      }

      if (success) {
        toast.success(language === 'hi' ? 'भुगतान सफल! ऑर्डर प्लेस किया गया!' : 'Payment successful! Order placed!');
        clearCart();
        setIsPaymentDialogOpen(false);
      } else {
        toast.error(language === 'hi' ? 'भुगतान असफल!' : 'Payment failed!');
      }
    } catch (error) {
      toast.error(language === 'hi' ? 'भुगतान में त्रुटि!' : 'Payment error!');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: string) => {
    return parseFloat(price.replace('₹', '').replace('/kg', '').replace('/L', '').replace('/pack', '').replace('/bunch', '').replace('/100g', '').replace('/250g', '').replace('/500g', '').replace('/bottle', ''));
  };

  if (items.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto pb-20 bg-background">
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            {language === 'hi' ? 'आपका कार्ट खाली है' : 'Your cart is empty'}
          </h2>
          <p className="text-muted-foreground text-center">
            {language === 'hi' 
              ? 'खरीदारी शुरू करने के लिए आइटम जोड़ें' 
              : 'Add items to start shopping'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-background">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {language === 'hi' ? 'मेरा कार्ट' : 'My Cart'}
          </h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearCart}
            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            {language === 'hi' ? 'साफ करें' : 'Clear'}
          </Button>
        </div>

        {/* Cart Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {language === 'hi' ? item.name : item.nameEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.price}
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      ₹{(formatPrice(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {language === 'hi' ? 'ऑर्डर सारांश' : 'Order Summary'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>{language === 'hi' ? 'उप-योग' : 'Subtotal'}</span>
              <span>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{language === 'hi' ? 'डिलीवरी चार्ज' : 'Delivery Fee'}</span>
              <span className="text-green-600">
                {language === 'hi' ? 'मुफ्त' : 'Free'}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>{language === 'hi' ? 'कुल' : 'Total'}</span>
              <span>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            
            <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="w-full mt-4" 
                  onClick={handleCheckout}
                  size="lg"
                >
                  {language === 'hi' 
                    ? `₹${getTotalPrice().toFixed(2)} - ऑर्डर करें` 
                    : `Place Order - ₹${getTotalPrice().toFixed(2)}`}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {language === 'hi' ? 'भुगतान विधि चुनें' : 'Choose Payment Method'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      {language === 'hi' ? 'कुल राशि:' : 'Total Amount:'}
                    </p>
                    <p className="text-2xl font-bold">₹{getTotalPrice().toFixed(2)}</p>
                  </div>
                  
                  <Button
                    className="w-full h-12"
                    onClick={() => processPayment('razorpay')}
                    disabled={isProcessing}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    {language === 'hi' ? 'Razorpay से भुगतान करें' : 'Pay with Razorpay'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full h-12"
                    onClick={() => processPayment('mock')}
                    disabled={isProcessing}
                  >
                    <Wallet className="h-5 w-5 mr-2" />
                    {language === 'hi' ? 'डेमो भुगतान' : 'Demo Payment'}
                  </Button>
                  
                  {isProcessing && (
                    <p className="text-center text-sm text-muted-foreground">
                      {language === 'hi' ? 'भुगतान प्रक्रिया में...' : 'Processing payment...'}
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12">
            {language === 'hi' ? 'सेव फॉर लेटर' : 'Save for Later'}
          </Button>
          <Button variant="outline" className="h-12">
            {language === 'hi' ? 'शेयर कार्ट' : 'Share Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};