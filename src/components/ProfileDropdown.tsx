import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  User, 
  Settings, 
  Heart, 
  MapPin, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  Edit,
  Phone,
  Mail,
  Shield
} from "lucide-react";

interface ProfileDropdownProps {
  onClose: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const { user, logout } = useAuth();

  const profileMenuItems = [
    {
      id: 'edit-profile',
      icon: Edit,
      label: language === 'hi' ? 'प्रोफाइल संपादित करें' : 'Edit Profile',
      action: () => console.log('Edit profile clicked')
    },
    {
      id: 'orders',
      icon: CreditCard,
      label: language === 'hi' ? 'मेरे ऑर्डर' : 'My Orders',
      action: () => console.log('Orders clicked')
    },
    {
      id: 'favorites',
      icon: Heart,
      label: language === 'hi' ? 'पसंदीदा' : 'Favorites',
      action: () => console.log('Favorites clicked')
    },
    {
      id: 'addresses',
      icon: MapPin,
      label: language === 'hi' ? 'पते' : 'Addresses',
      action: () => console.log('Addresses clicked')
    },
    {
      id: 'settings',
      icon: Settings,
      label: language === 'hi' ? 'सेटिंग्स' : 'Settings',
      action: () => console.log('Settings clicked')
    },
    {
      id: 'help',
      icon: HelpCircle,
      label: language === 'hi' ? 'सहायता' : 'Help & Support',
      action: () => console.log('Help clicked')
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/20 flex items-start justify-end z-50 p-4 pt-16">
      <Card className="shadow-warm border-2 border-primary/20 w-80 animate-slide-in-right">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{user?.name || 'User'}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    <Shield className="w-3 h-3 mr-1" />
                    {(user as any)?.role === 'vendor' 
                      ? (language === 'hi' ? 'विक्रेता' : 'Vendor')
                      : (language === 'hi' ? 'आपूर्तिकर्ता' : 'Supplier')
                    }
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-primary-foreground hover:bg-white/20"
            >
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Profile Info */}
          <div className="p-4 border-b border-border">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{(user as any)?.phone || '+91 98765 43210'}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{(user as any)?.email || 'user@example.com'}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{language === 'hi' ? 'दिल्ली, भारत' : 'Delhi, India'}</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {profileMenuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors"
                >
                  <IconComponent className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Logout */}
          <div className="border-t border-border">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-destructive/10 text-destructive transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">
                {language === 'hi' ? 'लॉग आउट' : 'Logout'}
              </span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};