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
      // Simulate more realistic voice input timing
      timeoutId = setTimeout(() => {
        const enhancedTranscripts = [
          {
            hi: '2 किलो प्याज, 1 किलो आलू, और 500 ग्राम टमाटर चाहिए',
            en: '2 kg onions, 1 kg potatoes, and 500 grams tomatoes needed',
            items: ['प्याज', 'आलू', 'टमाटर']
          },
          {
            hi: '5 लीटर तेल, 2 किलो आटा, और चीनी मंगवाना है',
            en: '5 liters oil, 2 kg flour, and sugar required',
            items: ['तेल', 'आटा', 'चीनी']
          },
          {
            hi: '1 किलो चावल, हल्दी पाउडर, नमक, और दाल लेना है',
            en: '1 kg rice, turmeric powder, salt, and lentils needed',
            items: ['चावल', 'हल्दी', 'नमक', 'दाल']
          },
          {
            hi: 'टमाटर, धनिया, मिर्च, और अदरक चाहिए',
            en: 'Tomatoes, coriander, chili, and ginger needed',
            items: ['टमाटर', 'धनिया', 'मिर्च', 'अदरक']
          }
        ];
        
        const randomTranscript = enhancedTranscripts[Math.floor(Math.random() * enhancedTranscripts.length)];
        const displayText = language === 'hi' ? randomTranscript.hi : randomTranscript.en;
        
        setTranscript(displayText);
        setIsListening(false);
        setIsProcessing(true);
        
        // Process the order after 1.5 seconds for better UX
        setTimeout(() => {
          processVoiceOrder(displayText);
          setIsProcessing(false);
        }, 1500);
      }, 2500); // Reduced listening time for better UX
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isListening, language]);

  const processVoiceOrder = (text: string) => {
    // Enhanced AI-like processing with better item matching
    const allItems = [
      { id: 101, name: 'प्याज', nameEn: 'Onions', price: '₹25/kg', keywords: ['प्याज', 'onion', 'onions', 'pyaaz', 'pyaj'] },
      { id: 102, name: 'आलू', nameEn: 'Potatoes', price: '₹20/kg', keywords: ['आलू', 'potato', 'potatoes', 'aloo', 'alu'] },
      { id: 103, name: 'टमाटर', nameEn: 'Tomatoes', price: '₹30/kg', keywords: ['टमाटर', 'tomato', 'tomatoes', 'tamatar', 'tamater'] },
      { id: 104, name: 'तेल', nameEn: 'Oil', price: '₹120/L', keywords: ['तेल', 'oil', 'cooking oil', 'tel'] },
      { id: 105, name: 'आटा', nameEn: 'Flour', price: '₹35/kg', keywords: ['आटा', 'flour', 'wheat flour', 'atta', 'aata'] },
      { id: 106, name: 'चावल', nameEn: 'Rice', price: '₹45/kg', keywords: ['चावल', 'rice', 'basmati', 'chawal'] },
      { id: 107, name: 'दाल', nameEn: 'Lentils', price: '₹80/kg', keywords: ['दाल', 'lentils', 'dal', 'pulses'] },
      { id: 108, name: 'चीनी', nameEn: 'Sugar', price: '₹40/kg', keywords: ['चीनी', 'sugar', 'cheeni', 'chini'] },
      { id: 109, name: 'नमक', nameEn: 'Salt', price: '₹20/kg', keywords: ['नमक', 'salt', 'namak'] },
      { id: 110, name: 'हल्दी', nameEn: 'Turmeric', price: '₹150/kg', keywords: ['हल्दी', 'turmeric', 'haldi'] },
      { id: 111, name: 'धनिया', nameEn: 'Coriander', price: '₹60/kg', keywords: ['धनिया', 'coriander', 'dhania'] },
      { id: 112, name: 'मिर्च', nameEn: 'Chili', price: '₹80/kg', keywords: ['मिर्च', 'chili', 'mirch', 'pepper'] },
      { id: 113, name: 'अदरक', nameEn: 'Ginger', price: '₹100/kg', keywords: ['अदरक', 'ginger', 'adrak'] }
    ];

    // Advanced matching with partial word detection
    const lowerText = text.toLowerCase();
    const matchedItems: any[] = [];
    
    allItems.forEach(item => {
      const isMatched = item.keywords.some(keyword => {
        const keywordLower = keyword.toLowerCase();
        // Check for exact match or partial match (at least 3 characters)
        return lowerText.includes(keywordLower) || 
               (keywordLower.length >= 3 && lowerText.includes(keywordLower.substring(0, 3)));
      });
      
      if (isMatched) {
        matchedItems.push(item);
      }
    });

    // If no matches found, add some popular items based on transcript content
    let itemsToAdd = matchedItems;
    if (matchedItems.length === 0) {
      // Fallback to common items
      itemsToAdd = allItems.slice(0, 3);
    }
    
    // Add matched items to cart
    itemsToAdd.forEach(item => {
      addToCart(item);
    });

    // Enhanced success message with item names
    const itemNames = itemsToAdd.map(item => language === 'hi' ? item.name : item.nameEn);
    toast.success(
      language === 'hi' 
        ? `${itemsToAdd.length} आइटम जोड़े गए: ${itemNames.join(', ')}`
        : `${itemsToAdd.length} items added: ${itemNames.join(', ')}`
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="shadow-warm border-2 border-primary/20 w-full max-w-md">
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
                className="w-32 h-32 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-warm"
              >
                {isListening ? (
                  <Square className="w-12 h-12 animate-pulse" />
                ) : (
                  <Mic className="w-12 h-12" />
                )}
              </Button>
            </div>

            {/* Visual feedback for listening */}
            {isListening && (
              <div className="mb-4 flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-8 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-6 bg-primary/70 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-10 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-4 bg-primary/70 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-7 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}

            <p className="text-sm text-muted-foreground mb-4">
              {language === 'hi' 
                ? 'बटन दबाएं और अपना ऑर्डर बोलें'
                : 'Press the button and speak your order'
              }
            </p>

            {transcript && (
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-dashed border-2 border-primary/30 animate-fade-in">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-primary" />
                    {language === 'hi' ? 'पहचाना गया ऑर्डर:' : 'Recognized Order:'}
                  </h4>
                  <p className="text-sm font-medium text-foreground">{transcript}</p>
                  {isProcessing && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      {language === 'hi' ? 'प्रोसेसिंग...' : 'Processing...'}
                    </div>
                  )}
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
    </div>
  );
};