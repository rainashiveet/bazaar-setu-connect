import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'hi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  hi: {
    // Common
    'app.name': 'बाजारसेतु',
    'app.tagline': 'स्ट्रीट फूड वेंडर्स के लिए स्मार्ट समाधान',
    'language': 'भाषा',
    'continue': 'आगे बढ़ें',
    'login': 'लॉगिन',
    'signup': 'साइनअप',
    'mobile': 'मोबाइल नंबर',
    'otp': 'ओटीपी',
    'verify': 'सत्यापित करें',
    'dashboard': 'डैशबोर्ड',
    'orders': 'ऑर्डर',
    'inventory': 'इन्वेंटरी',
    'profile': 'प्रोफाइल',
    'logout': 'लॉगआउट',
    
    // Landing Page
    'landing.title': 'स्ट्रीट फूड वेंडर्स और सप्लायर्स को जोड़ता है',
    'landing.subtitle': 'AI के साथ बेहतर सोर्सिंग, बेहतर कीमत, बेहतर बिजनेस',
    'vendor.title': 'मैं एक वेंडर हूं',
    'vendor.subtitle': 'सामान खरीदना चाहते हैं',
    'supplier.title': 'मैं एक सप्लायर हूं',
    'supplier.subtitle': 'सामान बेचना चाहते हैं',
    
    // Vendor Interface
    'vendor.welcome': 'स्वागत है',
    'vendor.suggested': 'सुझावित आइटम',
    'vendor.reorder': 'फिर से ऑर्डर करें',
    'vendor.group_buy': 'ग्रुप खरीदारी',
    'vendor.cart': 'कार्ट',
    'vendor.voice_order': 'आवाज से ऑर्डर करें',
    
    // Supplier Interface
    'supplier.welcome': 'सप्लायर डैशबोर्ड',
    'supplier.add_product': 'प्रोडक्ट जोड़ें',
    'supplier.demand_trends': 'डिमांड ट्रेंड्स',
    'supplier.new_orders': 'नए ऑर्डर',
    'supplier.manage_inventory': 'इन्वेंटरी मैनेज करें',
  },
  en: {
    // Common
    'app.name': 'BazaarSetu',
    'app.tagline': 'Smart Solutions for Street Food Vendors',
    'language': 'Language',
    'continue': 'Continue',
    'login': 'Login',
    'signup': 'Sign Up',
    'mobile': 'Mobile Number',
    'otp': 'OTP',
    'verify': 'Verify',
    'dashboard': 'Dashboard',
    'orders': 'Orders',
    'inventory': 'Inventory',
    'profile': 'Profile',
    'logout': 'Logout',
    
    // Landing Page
    'landing.title': 'Connecting Street Food Vendors & Suppliers',
    'landing.subtitle': 'Better Sourcing, Better Prices, Better Business with AI',
    'vendor.title': 'I am a Vendor',
    'vendor.subtitle': 'Want to buy raw materials',
    'supplier.title': 'I am a Supplier',
    'supplier.subtitle': 'Want to sell raw materials',
    
    // Vendor Interface
    'vendor.welcome': 'Welcome',
    'vendor.suggested': 'Suggested Items',
    'vendor.reorder': 'Reorder',
    'vendor.group_buy': 'Group Buy',
    'vendor.cart': 'Cart',
    'vendor.voice_order': 'Voice Order',
    
    // Supplier Interface
    'supplier.welcome': 'Supplier Dashboard',
    'supplier.add_product': 'Add Product',
    'supplier.demand_trends': 'Demand Trends',
    'supplier.new_orders': 'New Orders',
    'supplier.manage_inventory': 'Manage Inventory',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('hi'); // Default to Hindi

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};