import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  User, 
  Truck, 
  Phone, 
  Mail, 
  Lock, 
  MapPin, 
  FileText,
  QrCode,
  MessageCircle,
  X
} from "lucide-react";
import { toast } from "sonner";

interface AuthModalProps {
  onClose: () => void;
  onLogin: (userData: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const { language } = useLanguage();
  const [authType, setAuthType] = useState<'vendor' | 'supplier'>('vendor');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  
  // Form states
  const [vendorForm, setVendorForm] = useState({
    phone: '',
    otp: '',
    name: '',
    location: ''
  });
  
  const [supplierForm, setSupplierForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    gstNumber: '',
    pinCodes: '',
    contactPerson: ''
  });

  const handleVendorLogin = () => {
    // Mock OTP verification
    toast.success(language === 'hi' ? 'OTP भेजा गया!' : 'OTP sent!');
    
    // Simulate login after OTP
    setTimeout(() => {
      const userData = {
        id: '1',
        name: vendorForm.name || 'Vendor User',
        role: 'vendor',
        phone: vendorForm.phone,
        location: vendorForm.location
      };
      onLogin(userData);
      onClose();
      toast.success(language === 'hi' ? 'सफलतापूर्वक लॉग इन!' : 'Login successful!');
    }, 2000);
  };

  const handleSupplierRegister = () => {
    // Mock supplier registration
    if (supplierForm.password !== supplierForm.confirmPassword) {
      toast.error(language === 'hi' ? 'पासवर्ड मेल नहीं खाते' : 'Passwords do not match');
      return;
    }
    
    const userData = {
      id: '2',
      name: supplierForm.contactPerson || 'Supplier User',
      role: 'supplier',
      email: supplierForm.email,
      businessName: supplierForm.businessName,
      gstNumber: supplierForm.gstNumber
    };
    
    onLogin(userData);
    onClose();
    toast.success(language === 'hi' ? 'पंजीकरण सफल!' : 'Registration successful!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="shadow-warm border-2 border-primary/20 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {authType === 'vendor' ? <User className="w-6 h-6" /> : <Truck className="w-6 h-6" />}
              {language === 'hi' ? 'लॉग इन / साइन अप' : 'Login / Sign Up'}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-primary-foreground hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs value={authType} onValueChange={(value) => setAuthType(value as 'vendor' | 'supplier')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="vendor" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {language === 'hi' ? 'विक्रेता' : 'Vendor'}
              </TabsTrigger>
              <TabsTrigger value="supplier" className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                {language === 'hi' ? 'आपूर्तिकर्ता' : 'Supplier'}
              </TabsTrigger>
            </TabsList>

            {/* Vendor Login */}
            <TabsContent value="vendor" className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' 
                    ? 'स्ट्रीट फूड विक्रेताओं के लिए तुरंत लॉग इन'
                    : 'Quick login for street food vendors'
                  }
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="vendor-phone">{language === 'hi' ? 'फोन नंबर' : 'Phone Number'}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="vendor-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={vendorForm.phone}
                      onChange={(e) => setVendorForm({...vendorForm, phone: e.target.value})}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="vendor-name">{language === 'hi' ? 'नाम' : 'Name'}</Label>
                  <Input
                    id="vendor-name"
                    placeholder={language === 'hi' ? 'आपका नाम' : 'Your name'}
                    value={vendorForm.name}
                    onChange={(e) => setVendorForm({...vendorForm, name: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="vendor-location">{language === 'hi' ? 'स्थान' : 'Location'}</Label>
                  <Input
                    id="vendor-location"
                    placeholder={language === 'hi' ? 'आपका क्षेत्र' : 'Your area'}
                    value={vendorForm.location}
                    onChange={(e) => setVendorForm({...vendorForm, location: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="vendor" onClick={handleVendorLogin} className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {language === 'hi' ? 'OTP भेजें' : 'Send OTP'}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    {language === 'hi' ? 'WhatsApp' : 'WhatsApp'}
                  </Button>
                </div>

                <div className="text-center">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 mx-auto">
                    <QrCode className="w-4 h-4" />
                    {language === 'hi' ? 'QR कोड स्कैन करें' : 'Scan QR Code'}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Supplier Registration */}
            <TabsContent value="supplier" className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' 
                    ? 'कच्चे माल आपूर्तिकर्ताओं के लिए पंजीकरण'
                    : 'Registration for raw material suppliers'
                  }
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="supplier-email">{language === 'hi' ? 'ईमेल' : 'Email'}</Label>
                  <Input
                    id="supplier-email"
                    type="email"
                    placeholder="supplier@example.com"
                    value={supplierForm.email}
                    onChange={(e) => setSupplierForm({...supplierForm, email: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="supplier-business">{language === 'hi' ? 'व्यापार का नाम' : 'Business Name'}</Label>
                  <Input
                    id="supplier-business"
                    placeholder={language === 'hi' ? 'आपका व्यापार' : 'Your business'}
                    value={supplierForm.businessName}
                    onChange={(e) => setSupplierForm({...supplierForm, businessName: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="supplier-gst">{language === 'hi' ? 'GST नंबर' : 'GST Number'}</Label>
                  <Input
                    id="supplier-gst"
                    placeholder="22AAAAA0000A1Z5"
                    value={supplierForm.gstNumber}
                    onChange={(e) => setSupplierForm({...supplierForm, gstNumber: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="supplier-contact">{language === 'hi' ? 'संपर्क व्यक्ति' : 'Contact Person'}</Label>
                  <Input
                    id="supplier-contact"
                    placeholder={language === 'hi' ? 'संपर्क का नाम' : 'Contact name'}
                    value={supplierForm.contactPerson}
                    onChange={(e) => setSupplierForm({...supplierForm, contactPerson: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="supplier-pins">{language === 'hi' ? 'सेवा क्षेत्र पिन कोड' : 'Serviceable Pin Codes'}</Label>
                  <Input
                    id="supplier-pins"
                    placeholder="110001, 110002, 110003"
                    value={supplierForm.pinCodes}
                    onChange={(e) => setSupplierForm({...supplierForm, pinCodes: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="supplier-password">{language === 'hi' ? 'पासवर्ड' : 'Password'}</Label>
                  <Input
                    id="supplier-password"
                    type="password"
                    value={supplierForm.password}
                    onChange={(e) => setSupplierForm({...supplierForm, password: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="supplier-confirm">{language === 'hi' ? 'पासवर्ड पुष्टि' : 'Confirm Password'}</Label>
                  <Input
                    id="supplier-confirm"
                    type="password"
                    value={supplierForm.confirmPassword}
                    onChange={(e) => setSupplierForm({...supplierForm, confirmPassword: e.target.value})}
                  />
                </div>

                <Button variant="supplier" onClick={handleSupplierRegister} className="w-full">
                  {language === 'hi' ? 'पंजीकरण करें' : 'Register'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};