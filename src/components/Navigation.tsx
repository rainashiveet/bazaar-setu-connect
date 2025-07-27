import React from 'react';
import { Home, Search, ShoppingCart, RotateCcw, Lightbulb, Cloud, Package, Gift } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const { language } = useLanguage();
  const { getTotalItems } = useCart();

  const navItems = [
    { id: 'home', icon: Home, label: language === 'hi' ? 'होम' : 'Home' },
    { id: 'search', icon: Search, label: language === 'hi' ? 'खोजें' : 'Search' },
    { id: 'cart', icon: ShoppingCart, label: language === 'hi' ? 'कार्ट' : 'Cart', badge: getTotalItems() },
    { id: 'reorder', icon: RotateCcw, label: language === 'hi' ? 'फिर ऑर्डर' : 'Reorder' },
    { id: 'suggested', icon: Lightbulb, label: language === 'hi' ? 'सुझाव' : 'Suggested' },
    { id: 'weather', icon: Cloud, label: language === 'hi' ? 'मौसम' : 'Weather' },
    { id: 'bulk', icon: Package, label: language === 'hi' ? 'थोक' : 'Bulk' },
    { id: 'coupons', icon: Gift, label: language === 'hi' ? 'कूपन' : 'Coupons' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="grid grid-cols-4 gap-1 p-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors relative",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};