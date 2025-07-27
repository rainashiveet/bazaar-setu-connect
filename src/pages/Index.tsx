import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { LandingPage } from "@/components/LandingPage";
import { LoginForm } from "@/components/LoginForm";
import { VendorDashboard } from "@/components/VendorDashboard";
import { SupplierDashboard } from "@/components/SupplierDashboard";

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();
  const [selectedUserType, setSelectedUserType] = useState<'vendor' | 'supplier' | null>(null);

  if (isAuthenticated && user) {
    return user.type === 'vendor' ? <VendorDashboard /> : <SupplierDashboard />;
  }

  if (selectedUserType) {
    return (
      <LoginForm 
        userType={selectedUserType} 
        onBack={() => setSelectedUserType(null)} 
      />
    );
  }

  return <LandingPage onSelectUserType={setSelectedUserType} />;
};

const Index = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="relative">
          <LanguageToggle />
          <AppContent />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Index;
