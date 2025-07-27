import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Share2, 
  Gift, 
  Users, 
  Copy,
  MessageCircle,
  Star,
  Coins
} from "lucide-react";
import { toast } from "sonner";

export const ReferEarn = () => {
  const { language } = useLanguage();
  const [referralCode] = useState("VENDOR123"); // Generate unique code per user
  const [referredCount] = useState(3); // Mock referred users count
  const [earnings] = useState(60); // Mock earnings ₹20 x 3

  const shareText = language === 'hi' 
    ? `🍕 BazaarSetu से जुड़ें और स्ट्रीट फूड बिजनेस बढ़ाएं!\n\n💰 मेरा रेफरल कोड: ${referralCode}\n\n✅ समूह खरीदारी से बचत\n✅ वॉइस ऑर्डरिंग\n✅ मौसम के अनुसार सुझाव\n\nअभी जुड़ें: https://bazaarsetu.com/ref/${referralCode}`
    : `🍕 Join BazaarSetu and grow your street food business!\n\n💰 My referral code: ${referralCode}\n\n✅ Group buying savings\n✅ Voice ordering\n✅ Weather-smart suggestions\n\nJoin now: https://bazaarsetu.com/ref/${referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success(language === 'hi' ? 'रेफरल कोड कॉपी हो गया!' : 'Referral code copied!');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://bazaarsetu.com/ref/${referralCode}`);
    toast.success(language === 'hi' ? 'रेफरल लिंक कॉपी हो गया!' : 'Referral link copied!');
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSMSShare = () => {
    const smsUrl = `sms:?body=${encodeURIComponent(shareText)}`;
    window.open(smsUrl, '_blank');
  };

  return (
    <Card className="shadow-warm border-2 hover:border-primary/30 transition-all duration-300">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Gift className="w-6 h-6" />
          {language === 'hi' ? 'रेफर करें और कमाएं' : 'Refer & Earn'}
        </CardTitle>
        <p className="text-primary-foreground/80 text-sm">
          {language === 'hi' 
            ? 'हर नए विक्रेता के लिए ₹20 कैशबैक पाएं जो खरीदारी करता है'
            : '₹20 cashback for each new vendor who makes a purchase'
          }
        </p>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Earnings Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-success/10 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-success" />
              <span className="text-2xl font-bold text-success">{referredCount}</span>
            </div>
            <p className="text-xs text-success">
              {language === 'hi' ? 'रेफर किए गए' : 'Referred'}
            </p>
          </div>
          <div className="text-center p-3 bg-warning/10 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Coins className="w-4 h-4 text-warning" />
              <span className="text-2xl font-bold text-warning">₹{earnings}</span>
            </div>
            <p className="text-xs text-warning">
              {language === 'hi' ? 'कुल कमाई' : 'Total Earned'}
            </p>
          </div>
        </div>

        {/* Referral Code */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">
            {language === 'hi' ? 'आपका रेफरल कोड:' : 'Your Referral Code:'}
          </label>
          <div className="flex gap-2">
            <Input 
              value={referralCode} 
              readOnly 
              className="font-mono text-center font-bold"
            />
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCopyCode}
              className="px-3"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Referral Link */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">
            {language === 'hi' ? 'रेफरल लिंक:' : 'Referral Link:'}
          </label>
          <div className="flex gap-2">
            <Input 
              value={`bazaarsetu.com/ref/${referralCode}`} 
              readOnly 
              className="text-xs"
            />
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCopyLink}
              className="px-3"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">
            {language === 'hi' ? 'शेयर करें:' : 'Share:'}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="success" 
              onClick={handleWhatsAppShare}
              className="w-full"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSMSShare}
              className="w-full"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              SMS
            </Button>
          </div>
        </div>

        {/* How it Works */}
        <div className="space-y-2 pt-2 border-t">
          <h4 className="text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4 text-warning" />
            {language === 'hi' ? 'कैसे काम करता है:' : 'How it works:'}
          </h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>1. {language === 'hi' ? 'अपना कोड शेयर करें' : 'Share your code'}</p>
            <p>2. {language === 'hi' ? 'नया विक्रेता जुड़े और खरीदे' : 'New vendor joins & buys'}</p>
            <p>3. {language === 'hi' ? '₹20 कैशबैक पाएं' : 'Get ₹20 cashback'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};