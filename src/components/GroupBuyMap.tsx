import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, Users, MapPin, ShoppingCart, Timer } from "lucide-react";
import { toast } from "sonner";
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';

// Import marker images explicitly
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Delete the default icon to prevent conflicts
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Set the default icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface GroupOrder {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    addressEn: string;
  };
  expiresAt: Date;
  minQuantity: number;
  currentQuantity: number;
  participants: number;
  estimatedSavings: string;
  items: {
    name: string;
    nameEn: string;
    quantity: number;
    price: string;
  }[];
  contributions: {
    vendorId: string;
    vendorName: string;
    amount: string;
    items: string[];
  }[];
}

const mockGroupOrders: GroupOrder[] = [
  {
    id: '1',
    title: 'सब्जी थोक ऑर्डर - CP मार्केट',
    titleEn: 'Vegetable Bulk Order - CP Market',
    description: 'प्याज, आलू, टमाटर का बल्क ऑर्डर',
    descriptionEn: 'Bulk order for onions, potatoes, tomatoes',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'कनॉट प्लेस, नई दिल्ली',
      addressEn: 'Connaught Place, New Delhi'
    },
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
    minQuantity: 100,
    currentQuantity: 75,
    participants: 8,
    estimatedSavings: '₹500-800',
    items: [
      { name: 'प्याज', nameEn: 'Onions', quantity: 50, price: '₹20/kg' },
      { name: 'आलू', nameEn: 'Potatoes', quantity: 30, price: '₹18/kg' },
      { name: 'टमाटर', nameEn: 'Tomatoes', quantity: 20, price: '₹25/kg' }
    ],
    contributions: [
      { vendorId: '1', vendorName: 'राम चाट', amount: '₹450', items: ['प्याज 15kg', 'आलू 10kg'] },
      { vendorId: '2', vendorName: 'शर्मा स्नैक्स', amount: '₹320', items: ['टमाटर 8kg', 'प्याज 5kg'] },
      { vendorId: '3', vendorName: 'गुप्ता डोसा', amount: '₹280', items: ['आलू 12kg'] }
    ]
  },
  {
    id: '2',
    title: 'तेल और मसाले का ऑर्डर',
    titleEn: 'Oil & Spices Order',
    description: 'खाना पकाने का तेल और गरम मसाला',
    descriptionEn: 'Cooking oil and garam masala',
    location: {
      lat: 28.6562,
      lng: 77.2410,
      address: 'कश्मीरी गेट, दिल्ली',
      addressEn: 'Kashmiri Gate, Delhi'
    },
    expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
    minQuantity: 50,
    currentQuantity: 42,
    participants: 5,
    estimatedSavings: '₹200-400',
    items: [
      { name: 'सरसों का तेल', nameEn: 'Mustard Oil', quantity: 25, price: '₹140/L' },
      { name: 'गरम मसाला', nameEn: 'Garam Masala', quantity: 15, price: '₹80/100g' }
    ],
    contributions: [
      { vendorId: '4', vendorName: 'अग्रवाल चाट', amount: '₹350', items: ['तेल 3L'] },
      { vendorId: '5', vendorName: 'मिश्रा पकौड़े', amount: '₹240', items: ['गरम मसाला 200g'] }
    ]
  }
];

const CountdownTimer: React.FC<{ expiresAt: Date }> = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const expiry = expiresAt.getTime();
      const difference = expiry - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeLeft(language === 'hi' ? `${days} दिन बचे` : `${days} days left`);
        } else if (hours > 0) {
          setTimeLeft(language === 'hi' ? `${hours} घंटे बचे` : `${hours} hours left`);
        } else {
          setTimeLeft(language === 'hi' ? `${minutes} मिनट बचे` : `${minutes} minutes left`);
        }
      } else {
        setTimeLeft(language === 'hi' ? 'समाप्त' : 'Expired');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, language]);

  const isUrgent = new Date().getTime() > (expiresAt.getTime() - 24 * 60 * 60 * 1000);

  return (
    <Badge variant={isUrgent ? "destructive" : "secondary"} className="flex items-center gap-1">
      <Timer className="w-3 h-3" />
      {timeLeft}
    </Badge>
  );
};

const GroupBuyMap: React.FC = () => {
  const { language } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState<GroupOrder | null>(null);
  const [userLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // Mock user location

  const mapCenter = useMemo(() => [userLocation.lat, userLocation.lng] as [number, number], [userLocation]);

  const handleJoinOrder = (order: GroupOrder) => {
    toast.success(language === 'hi' 
      ? `${order.title} में शामिल हो गए!` 
      : `Joined ${order.titleEn}!`
    );
  };

  const handleViewDetails = (order: GroupOrder) => {
    setSelectedOrder(order);
  };

  const getProgressPercentage = (current: number, min: number) => {
    return Math.min((current / min) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="shadow-warm">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl">
            <MapPin className="w-6 h-6" />
            {language === 'hi' ? 'पास के ग्रुप ऑर्डर' : 'Nearby Group Orders'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-96 w-full relative">
            <MapContainer
              center={mapCenter}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
              className="rounded-b-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {mockGroupOrders.map((order) => (
                <Marker
                  key={order.id}
                  position={[order.location.lat, order.location.lng]}
                >
                  <Popup>
                    <div className="space-y-3 min-w-64">
                      <h3 className="font-semibold text-sm">
                        {language === 'hi' ? order.title : order.titleEn}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === 'hi' ? order.description : order.descriptionEn}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {order.participants}
                        </span>
                        <CountdownTimer expiresAt={order.expiresAt} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-xs">
                          {language === 'hi' ? 'प्रगति:' : 'Progress:'} {order.currentQuantity}/{order.minQuantity}
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getProgressPercentage(order.currentQuantity, order.minQuantity)}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="vendor"
                          onClick={() => handleJoinOrder(order)}
                          className="text-xs"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          {language === 'hi' ? 'शामिल हों' : 'Join'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(order)}
                          className="text-xs"
                        >
                          {language === 'hi' ? 'विवरण' : 'Details'}
                        </Button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Card className="shadow-warm border-2 border-primary/20">
          <CardHeader className="bg-gradient-secondary text-secondary-foreground rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <span>{language === 'hi' ? selectedOrder.title : selectedOrder.titleEn}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedOrder(null)}
                className="text-secondary-foreground hover:bg-white/20"
              >
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <CountdownTimer expiresAt={selectedOrder.expiresAt} />
              <span className="text-sm text-muted-foreground">
                {language === 'hi' ? 'बचत:' : 'Savings:'} {selectedOrder.estimatedSavings}
              </span>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{language === 'hi' ? 'प्रगति' : 'Progress'}</span>
                <span>{selectedOrder.currentQuantity}/{selectedOrder.minQuantity}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage(selectedOrder.currentQuantity, selectedOrder.minQuantity)}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <h4 className="font-semibold">{language === 'hi' ? 'आइटम्स:' : 'Items:'}</h4>
              <div className="grid gap-2">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="font-medium">
                      {language === 'hi' ? item.name : item.nameEn} ({item.quantity}kg)
                    </span>
                    <span className="text-primary font-semibold">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendor Contributions */}
            <div className="space-y-2">
              <h4 className="font-semibold">{language === 'hi' ? 'योगदान:' : 'Contributions:'}</h4>
              <div className="space-y-2">
                {selectedOrder.contributions.map((contribution, index) => (
                  <div key={index} className="flex justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{contribution.vendorName}</div>
                      <div className="text-xs text-muted-foreground">
                        {contribution.items.join(', ')}
                      </div>
                    </div>
                    <div className="text-primary font-semibold">{contribution.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="w-full"
              variant="vendor"
              onClick={() => handleJoinOrder(selectedOrder)}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {language === 'hi' ? 'इस ऑर्डर में शामिल हों' : 'Join This Order'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GroupBuyMap;