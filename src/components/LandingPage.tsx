import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShoppingCart, Package, Sparkles, Users, TrendingUp, MessageCircle } from "lucide-react";

interface LandingPageProps {
  onSelectUserType: (type: 'vendor' | 'supplier') => void;
}

export const LandingPage = ({ onSelectUserType }: LandingPageProps) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-primary p-4 rounded-2xl shadow-warm">
              <Package className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            {t('app.name')}
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            {t('app.tagline')}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
            {t('landing.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('landing.subtitle')}
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card 
            className="group cursor-pointer transition-all duration-300 hover:shadow-warm hover:scale-105 border-2 hover:border-primary/30"
            onClick={() => onSelectUserType('vendor')}
          >
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-primary p-6 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {t('vendor.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('vendor.subtitle')}
              </p>
              <Button variant="vendor" size="lg" className="w-full">
                {t('continue')}
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="group cursor-pointer transition-all duration-300 hover:shadow-success hover:scale-105 border-2 hover:border-secondary/30"
            onClick={() => onSelectUserType('supplier')}
          >
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-secondary p-6 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Package className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {t('supplier.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('supplier.subtitle')}
              </p>
              <Button variant="supplier" size="lg" className="w-full">
                {t('continue')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="text-center p-6">
            <div className="bg-primary/10 p-4 rounded-2xl w-16 h-16 mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">AI-Powered</h4>
            <p className="text-sm text-muted-foreground">Smart predictions & recommendations</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-secondary/10 p-4 rounded-2xl w-16 h-16 mx-auto mb-4">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Group Buying</h4>
            <p className="text-sm text-muted-foreground">Better prices through collaboration</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-accent/10 p-4 rounded-2xl w-16 h-16 mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-accent" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">WhatsApp Integration</h4>
            <p className="text-sm text-muted-foreground">Simple notifications & ordering</p>
          </div>
        </div>
      </div>
    </div>
  );
};