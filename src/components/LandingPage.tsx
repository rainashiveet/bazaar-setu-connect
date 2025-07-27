import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import { 
  Users, 
  Truck, 
  ShoppingCart, 
  MapPin, 
  Star,
  Zap,
  Shield,
  Clock,
  Package
} from "lucide-react";

interface LandingPageProps {
  onSelectUserType?: (type: 'vendor' | 'supplier') => void;
}

export const LandingPage = ({ onSelectUserType }: LandingPageProps) => {
  const { language } = useLanguage();
  const { login } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  const handleLogin = (userData: any) => {
    login(userData.mobile, '123456', userData.role);
  };

  const handleUserTypeSelect = (type: 'vendor' | 'supplier') => {
    if (onSelectUserType) {
      onSelectUserType(type);
    } else {
      setShowAuth(true);
    }
  };

  const features = [
    {
      icon: Users,
      title: language === 'hi' ? 'ग्रुप खरीदारी' : 'Group Buying',
      description: language === 'hi' 
        ? 'मिलकर खरीदें, ज्यादा बचाएं' 
        : 'Buy together, save more',
      color: 'text-primary'
    },
    {
      icon: Zap,
      title: language === 'hi' ? 'वॉइस ऑर्डर' : 'Voice Orders',
      description: language === 'hi' 
        ? 'बोलकर ऑर्डर करें' 
        : 'Order by speaking',
      color: 'text-success'
    },
    {
      icon: MapPin,
      title: language === 'hi' ? 'लोकल कनेक्शन' : 'Local Connection',
      description: language === 'hi' 
        ? 'आपके आस-पास के विक्रेता' 
        : 'Vendors near you',
      color: 'text-warning'
    },
    {
      icon: Shield,
      title: language === 'hi' ? 'सुरक्षित भुगतान' : 'Secure Payments',
      description: language === 'hi' 
        ? 'विश्वसनीय लेन-देन' 
        : 'Trusted transactions',
      color: 'text-secondary'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-primary p-4 rounded-2xl shadow-warm">
              <Package className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            {language === 'hi' 
              ? 'स्ट्रीट फूड मार्केटप्लेस' 
              : 'Street Food Marketplace'
            }
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'hi' 
              ? 'विक्रेताओं और आपूर्तिकर्ताओं को जोड़ने वाला प्लेटफॉर्म। स्मार्ट ऑर्डरिंग, ग्रुप खरीदारी, और बेहतर कीमतें।'
              : 'Connecting vendors and suppliers. Smart ordering, group buying, and better prices for everyone.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              variant="vendor"
              onClick={() => handleUserTypeSelect('vendor')}
              className="text-lg px-8 py-4"
            >
              <Users className="w-6 h-6 mr-2" />
              {language === 'hi' ? 'विक्रेता के रूप में शुरू करें' : 'Start as Vendor'}
            </Button>
            <Button 
              size="xl" 
              variant="supplier"
              onClick={() => handleUserTypeSelect('supplier')}
              className="text-lg px-8 py-4"
            >
              <Truck className="w-6 h-6 mr-2" />
              {language === 'hi' ? 'आपूर्तिकर्ता बनें' : 'Become Supplier'}
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="shadow-warm border-2 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center ${feature.color}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">
                {language === 'hi' ? 'सक्रिय विक्रेता' : 'Active Vendors'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-foreground/80">
                {language === 'hi' ? 'विश्वसनीय आपूर्तिकर्ता' : 'Trusted Suppliers'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-primary-foreground/80">
                {language === 'hi' ? 'सफल ऑर्डर' : 'Successful Orders'}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="shadow-warm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">
              {language === 'hi' 
                ? 'आज ही शुरू करें' 
                : 'Get Started Today'
              }
            </CardTitle>
            <p className="text-muted-foreground">
              {language === 'hi' 
                ? 'अपने व्यापार को डिजिटल बनाएं और अधिक ग्राहकों तक पहुंचें'
                : 'Digitize your business and reach more customers'
              }
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              size="lg" 
              onClick={() => setShowAuth(true)}
              className="text-lg px-8"
            >
              <Star className="w-5 h-5 mr-2" />
              {language === 'hi' ? 'अभी जुड़ें' : 'Join Now'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal 
          onClose={() => setShowAuth(false)} 
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};