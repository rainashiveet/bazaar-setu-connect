import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Mic, MicOff, Volume2, Square } from "lucide-react";
import { toast } from "sonner";

interface VoiceOrderProps {
  onClose: () => void;
}

export const VoiceOrder: React.FC<VoiceOrderProps> = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { language } = useLanguage();
  const { addToCart } = useCart();

  // Mock voice recognition functionality
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isListening) {
      // Simulate voice input after 3 seconds
      timeoutId = setTimeout(() => {
        const mockTranscripts = [
          language === 'hi' 
            ? '2 किलो प्याज, 1 किलो आलू, और 500 ग्राम टमाटर चाहिए'
            : '2 kg onions, 1 kg potatoes, and 500 grams tomatoes',
          language === 'hi'
            ? '5 लीटर तेल और 2 किलो आटा मंगवाना है'
            : '5 liters oil and 2 kg flour needed',
          language === 'hi'
            ? '1 किलो चावल, हल्दी पाउडर, और नमक लेना है'
            : '1 kg rice, turmeric powder, and salt required'
        ];
        
        const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
        setTranscript(randomTranscript);
        setIsListening(false);
        setIsProcessing(true);
        
        // Process the order after 2 seconds
        setTimeout(() => {
          processVoiceOrder(randomTranscript);
          setIsProcessing(false);
        }, 2000);
      }, 3000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isListening, language]);

  const processVoiceOrder = (text: string) => {
    // Mock processing - in real app, this would use AI to parse the voice input
    const mockItems = [
      { id: 1, name: 'प्याज', nameEn: 'Onions', price: '₹25/kg' },
      { id: 2, name: 'आलू', nameEn: 'Potatoes', price: '₹20/kg' },
      { id: 3, name: 'टमाटर', nameEn: 'Tomatoes', price: '₹30/kg' },
      { id: 4, name: 'तेल', nameEn: 'Oil', price: '₹120/L' },
      { id: 5, name: 'आटा', nameEn: 'Flour', price: '₹35/kg' },
    ];

    // Add 2-3 random items based on voice input
    const itemsToAdd = mockItems.slice(0, Math.floor(Math.random() * 3) + 1);
    
    itemsToAdd.forEach(item => {
      addToCart(item);
    });

    toast.success(
      language === 'hi' 
        ? `${itemsToAdd.length} आइटम कार्ट में जोड़े गए!`
        : `${itemsToAdd.length} items added to cart!`
    );
  };

  const startListening = () => {
    setTranscript('');
    setIsListening(true);
    toast.info(language === 'hi' ? 'सुन रहा हूँ...' : 'Listening...');
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <Card className="shadow-warm border-2 border-primary/20">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-6 h-6" />
            {language === 'hi' ? 'वॉइस ऑर्डर' : 'Voice Order'}
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
      <CardContent className="p-6 space-y-6">
        <div className="text-center">
          <div className="mb-4">
            {isListening ? (
              <Badge variant="destructive" className="animate-pulse">
                <MicOff className="w-4 h-4 mr-1" />
                {language === 'hi' ? 'सुन रहा हूँ...' : 'Listening...'}
              </Badge>
            ) : isProcessing ? (
              <Badge variant="secondary" className="animate-pulse">
                <Volume2 className="w-4 h-4 mr-1" />
                {language === 'hi' ? 'प्रोसेसिंग...' : 'Processing...'}
              </Badge>
            ) : (
              <Badge variant="outline">
                {language === 'hi' ? 'तैयार' : 'Ready'}
              </Badge>
            )}
          </div>

          <div className="mb-6">
            <Button
              variant={isListening ? "destructive" : "vendor"}
              size="lg"
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              className="w-32 h-32 rounded-full text-lg"
            >
              {isListening ? (
                <Square className="w-12 h-12" />
              ) : (
                <Mic className="w-12 h-12" />
              )}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {language === 'hi' 
              ? 'बटन दबाएं और अपना ऑर्डर बोलें'
              : 'Press the button and speak your order'
            }
          </p>

          {transcript && (
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">
                  {language === 'hi' ? 'आपका ऑर्डर:' : 'Your Order:'}
                </h4>
                <p className="text-sm">{transcript}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {language === 'hi' 
              ? 'उदाहरण: "2 किलो प्याज, 1 किलो आलू चाहिए"'
              : 'Example: "2 kg onions, 1 kg potatoes needed"'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};