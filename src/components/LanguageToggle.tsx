import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
      className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm"
    >
      <Globe className="w-4 h-4 mr-2" />
      {language === 'hi' ? 'English' : 'हिंदी'}
    </Button>
  );
};