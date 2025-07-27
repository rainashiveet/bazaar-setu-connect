import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bell, X, Package, Users, Star, AlertCircle } from "lucide-react";

interface NotificationCenterProps {
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'Order Update',
    titleHi: 'ऑर्डर अपडेट',
    message: 'Your order #1234 has been dispatched',
    messageHi: 'आपका ऑर्डर #1234 भेज दिया गया है',
    time: '2 mins ago',
    unread: true,
    icon: Package,
    color: 'text-primary'
  },
  {
    id: 2,
    type: 'group',
    title: 'Group Buy Alert',
    titleHi: 'ग्रुप खरीदारी अलर्ट',
    message: 'New group buy for rice - 20% off!',
    messageHi: 'चावल के लिए नई ग्रुप खरीदारी - 20% छूट!',
    time: '1 hour ago',
    unread: true,
    icon: Users,
    color: 'text-success'
  },
  {
    id: 3,
    type: 'offer',
    title: 'Special Offer',
    titleHi: 'विशेष ऑफर',
    message: 'Get 15% off on vegetables today',
    messageHi: 'आज सब्जियों पर 15% छूट पाएं',
    time: '3 hours ago',
    unread: false,
    icon: Star,
    color: 'text-warning'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Price Alert',
    titleHi: 'मूल्य अलर्ट',
    message: 'Onion prices have decreased by 10%',
    messageHi: 'प्याज की कीमतें 10% कम हो गई हैं',
    time: '5 hours ago',
    unread: false,
    icon: AlertCircle,
    color: 'text-destructive'
  }
];

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const [notificationList, setNotificationList] = useState(notifications);

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const unreadCount = notificationList.filter(n => n.unread).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="shadow-warm border-2 border-primary/20 w-full max-w-md max-h-[80vh] overflow-hidden">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-6 h-6" />
              {language === 'hi' ? 'सूचनाएं' : 'Notifications'}
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-warning text-warning-foreground">
                  {unreadCount}
                </Badge>
              )}
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
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-primary-foreground hover:bg-white/20 self-start text-xs"
            >
              {language === 'hi' ? 'सभी को पढ़ा हुआ मार्क करें' : 'Mark all as read'}
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0 max-h-[60vh] overflow-y-auto">
          <div className="space-y-1">
            {notificationList.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${
                    notification.unread ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${notification.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">
                          {language === 'hi' ? notification.titleHi : notification.title}
                        </h4>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {language === 'hi' ? notification.messageHi : notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};