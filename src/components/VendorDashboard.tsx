import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { SearchPage } from '@/components/SearchPage';
import { CartPage } from '@/components/CartPage';
import { ReorderPage } from '@/components/ReorderPage';
import { SuggestedPage } from '@/components/SuggestedPage';
import { BulkOrderPage } from '@/components/BulkOrderPage';
import { CouponsPage } from '@/components/CouponsPage';
import { WeatherWidget } from '@/components/WeatherWidget';
import { SmartBuyingAdvice } from '@/components/SmartBuyingAdvice';
import { ReferEarn } from '@/components/ReferEarn';
import { VoiceOrder } from '@/components/VoiceOrder';
import GroupBuyMap from '@/components/GroupBuyMap';
import { NotificationCenter } from '@/components/NotificationCenter';
import { ProfileDropdown } from '@/components/ProfileDropdown';

export const VendorDashboard = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [showVoiceOrder, setShowVoiceOrder] = useState(false);
  const [showGroupBuy, setShowGroupBuy] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'search': return <SearchPage onVoiceOrder={() => setShowVoiceOrder(true)} />;
      case 'cart': return <CartPage />;
      case 'reorder': return <ReorderPage />;
      case 'suggested': return <SuggestedPage />;
      case 'weather': return <SmartBuyingAdvice />;
      case 'bulk': return <BulkOrderPage />;
      case 'coupons': return <CouponsPage />;
      default: return (
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="p-4 space-y-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">
                {language === 'hi' 
                  ? `नमस्ते ${user?.name || 'विक्रेता'}!` 
                  : `Hello ${user?.name || 'Vendor'}!`}
              </h1>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
              </p>
            </div>
            <WeatherWidget />
            <SmartBuyingAdvice />
            <ReferEarn />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {renderCurrentPage()}
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {/* Modals */}
      {showVoiceOrder && <VoiceOrder onClose={() => setShowVoiceOrder(false)} />}
      {showNotifications && <NotificationCenter onClose={() => setShowNotifications(false)} />}
      {showProfile && <ProfileDropdown onClose={() => setShowProfile(false)} />}
      {showGroupBuy && <GroupBuyMap />}
    </div>
  );
};