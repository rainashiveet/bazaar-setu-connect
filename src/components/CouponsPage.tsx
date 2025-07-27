import React, { useState } from 'react';
import { Gift, Copy, Clock, Star, Percent, Package, Cloud, Users, Mic } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const availableCoupons = [
  {
    id: 1,
    code: 'FIRST50',
    title: 'पहली खरीदारी',
    titleEn: 'First Purchase',
    description: 'पहली खरीदारी पर ₹50 की छूट',
    descriptionEn: '₹50 off on first purchase',
    discount: 50,
    minOrder: 200,
    type: 'flat',
    expiresIn: '7 days',
    isNew: true
  },
  {
    id: 2,
    code: 'BULK20',
    title: 'थोक छूट',
    titleEn: 'Bulk Discount',
    description: 'थोक ऑर्डर पर 20% तक की छूट',
    descriptionEn: 'Up to 20% off on bulk orders',
    discount: 20,
    minOrder: 1000,
    type: 'percentage',
    expiresIn: '15 days',
    category: 'bulk'
  },
  {
    id: 3,
    code: 'WEATHER15',
    title: 'मौसम स्पेशल',
    titleEn: 'Weather Special',
    description: 'मौसम के अनुसार खरीदारी पर 15% छूट',
    descriptionEn: '15% off on weather-based shopping',
    discount: 15,
    minOrder: 300,
    type: 'percentage',
    expiresIn: '5 days',
    category: 'weather'
  },
  {
    id: 4,
    code: 'REFER100',
    title: 'रेफर करें',
    titleEn: 'Refer & Earn',
    description: 'दोस्त को रेफर करने पर ₹100 कैशबैक',
    descriptionEn: '₹100 cashback on friend referral',
    discount: 100,
    minOrder: 0,
    type: 'cashback',
    expiresIn: 'No expiry',
    category: 'referral'
  },
  {
    id: 5,
    code: 'VOICE25',
    title: 'वॉइस ऑर्डर',
    titleEn: 'Voice Order',
    description: 'वॉइस से ऑर्डर करने पर ₹25 छूट',
    descriptionEn: '₹25 off on voice orders',
    discount: 25,
    minOrder: 150,
    type: 'flat',
    expiresIn: '10 days',
    category: 'voice'
  }
];

const usedCoupons = [
  {
    id: 101,
    code: 'WELCOME10',
    title: 'स्वागत छूट',
    titleEn: 'Welcome Discount',
    usedOn: '2024-01-10',
    savedAmount: 50
  },
  {
    id: 102,
    code: 'MONSOON30',
    title: 'मानसून स्पेशल',
    titleEn: 'Monsoon Special',
    usedOn: '2024-01-05',
    savedAmount: 120
  }
];

export const CouponsPage: React.FC = () => {
  const { language } = useLanguage();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(language === 'hi' ? 'कूपन कॉपी किया गया!' : 'Coupon copied!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatExpiryTime = (expiresIn: string) => {
    if (expiresIn === 'No expiry') {
      return language === 'hi' ? 'कोई समय सीमा नहीं' : 'No expiry';
    }
    return expiresIn;
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'bulk': return <Package className="h-4 w-4" />;
      case 'weather': return <Cloud className="h-4 w-4" />;
      case 'referral': return <Users className="h-4 w-4" />;
      case 'voice': return <Mic className="h-4 w-4" />;
      default: return <Percent className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-background">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            {language === 'hi' ? 'कूपन और ऑफर' : 'Coupons & Offers'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'hi' 
              ? 'आपकी बचत के लिए विशेष छूट'
              : 'Special discounts for your savings'}
          </p>
        </div>

        {/* Available Coupons */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            {language === 'hi' ? 'उपलब्ध कूपन' : 'Available Coupons'}
          </h2>
          <div className="space-y-4">
            {availableCoupons.map((coupon) => (
              <Card key={coupon.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-base">
                          {language === 'hi' ? coupon.title : coupon.titleEn}
                        </CardTitle>
                        {coupon.isNew && (
                          <Badge variant="destructive" className="text-xs">
                            {language === 'hi' ? 'नया' : 'New'}
                          </Badge>
                        )}
                        {coupon.category && getCategoryIcon(coupon.category)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'hi' ? coupon.description : coupon.descriptionEn}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-dashed border-2 border-dashed border-primary/30 rounded-lg p-3 bg-primary/5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-lg">{coupon.code}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(coupon.code)}
                        className="h-8"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        {copiedCode === coupon.code 
                          ? (language === 'hi' ? 'कॉपी किया!' : 'Copied!') 
                          : (language === 'hi' ? 'कॉपी' : 'Copy')}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">
                        {language === 'hi' ? 'छूट' : 'Discount'}
                      </p>
                      <p className="font-semibold text-primary">
                        {coupon.type === 'flat' ? `₹${coupon.discount}` : `${coupon.discount}%`}
                        {coupon.type === 'cashback' ? ' Cashback' : ' OFF'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        {language === 'hi' ? 'न्यूनतम ऑर्डर' : 'Min Order'}
                      </p>
                      <p className="font-semibold">
                        {coupon.minOrder > 0 ? `₹${coupon.minOrder}` : 'No minimum'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      {language === 'hi' ? 'समाप्ति:' : 'Expires in:'} {formatExpiryTime(coupon.expiresIn)}
                    </span>
                  </div>

                  <Button className="w-full">
                    {language === 'hi' ? 'अभी उपयोग करें' : 'Use Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Used Coupons */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            {language === 'hi' ? 'उपयोग किए गए कूपन' : 'Used Coupons'}
          </h2>
          <div className="space-y-3">
            {usedCoupons.map((coupon) => (
              <Card key={coupon.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">
                        {language === 'hi' ? coupon.title : coupon.titleEn}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'hi' ? 'उपयोग किया गया:' : 'Used on:'} {coupon.usedOn}
                      </p>
                      <p className="text-sm font-semibold text-green-600">
                        {language === 'hi' ? 'बचत:' : 'Saved:'} ₹{coupon.savedAmount}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {language === 'hi' ? 'उपयोग किया गया' : 'Used'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Total Savings */}
        <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold mb-2">
              {language === 'hi' ? 'कुल बचत' : 'Total Savings'}
            </h3>
            <p className="text-2xl font-bold text-green-600">
              ₹{usedCoupons.reduce((total, coupon) => total + coupon.savedAmount, 0)}
            </p>
            <p className="text-sm text-muted-foreground">
              {language === 'hi' ? 'कूपन से बचाई गई राशि' : 'Amount saved through coupons'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};