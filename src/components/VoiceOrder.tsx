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
    // Check for weather-based smart suggestions first
    const lowerText = text.toLowerCase();
    if (lowerText.includes('आज क्या खरीदूं') || lowerText.includes('what should i buy today') || 
        lowerText.includes('what to buy') || lowerText.includes('क्या खरीदना चाहिए')) {
      
      // Mock weather-based suggestions
      const weatherSuggestions = [
        { id: 201, name: 'कुल्फी', nameEn: 'Kulfi', price: '₹5/piece', reason: 'गर्मी के लिए बेस्ट' },
        { id: 202, name: 'अदरक', nameEn: 'Ginger', price: '₹100/kg', reason: 'बारिश के लिए अच्छा' },
        { id: 203, name: 'ठंडे पेय', nameEn: 'Cold Drinks', price: '₹15/bottle', reason: 'गर्मी में डिमांड ज्यादा' }
      ];
      
      weatherSuggestions.forEach(item => addToCart(item));
      toast.success(language === 'hi' ? 'मौसम के अनुसार सुझाव जोड़े गए!' : 'Weather-based suggestions added!');
      return;
    }

    // Enhanced AI-like processing with better item matching
    const allItems = [
      { id: 101, name: 'प्याज', nameEn: 'Onions', price: '₹25/kg', keywords: ['प्याज', 'onion', 'onions', 'pyaaz', 'pyaj', 'kanda'] },
      { id: 102, name: 'आलू', nameEn: 'Potatoes', price: '₹20/kg', keywords: ['आलू', 'potato', 'potatoes', 'aloo', 'alu', 'batata'] },
      { id: 103, name: 'टमाटर', nameEn: 'Tomatoes', price: '₹30/kg', keywords: ['टमाटर', 'tomato', 'tomatoes', 'tamatar', 'tamater'] },
      { id: 104, name: 'तेल', nameEn: 'Oil', price: '₹120/L', keywords: ['तेल', 'oil', 'cooking oil', 'tel'] },
      { id: 105, name: 'आटा', nameEn: 'Flour', price: '₹35/kg', keywords: ['आटा', 'flour', 'wheat flour', 'atta', 'aata'] },
      { id: 106, name: 'चावल', nameEn: 'Rice', price: '₹45/kg', keywords: ['चावल', 'rice', 'basmati', 'chawal'] },
      { id: 107, name: 'दाल', nameEn: 'Lentils', price: '₹80/kg', keywords: ['दाल', 'lentils', 'dal', 'pulses'] },
      { id: 108, name: 'चीनी', nameEn: 'Sugar', price: '₹40/kg', keywords: ['चीनी', 'sugar', 'cheeni', 'chini'] },
      { id: 109, name: 'नमक', nameEn: 'Salt', price: '₹20/kg', keywords: ['नमक', 'salt', 'namak'] },
      { id: 110, name: 'हल्दी', nameEn: 'Turmeric', price: '₹150/kg', keywords: ['हल्दी', 'turmeric', 'haldi'] },
      { id: 111, name: 'धनिया', nameEn: 'Coriander', price: '₹60/kg', keywords: ['धनिया', 'coriander', 'dhania', 'cilantro'] },
      { id: 112, name: 'मिर्च', nameEn: 'Chili', price: '₹80/kg', keywords: ['मिर्च', 'chili', 'mirch', 'pepper', 'हरी मिर्च'] },
      { id: 113, name: 'अदरक', nameEn: 'Ginger', price: '₹100/kg', keywords: ['अदरक', 'ginger', 'adrak'] },
      // Weather-specific items
      { id: 114, name: 'कुल्फी', nameEn: 'Kulfi', price: '₹5/piece', keywords: ['कुल्फी', 'kulfi', 'ice cream'] },
      { id: 115, name: 'चाय', nameEn: 'Tea', price: '₹200/kg', keywords: ['चाय', 'tea', 'chai'] },
      { id: 116, name: 'पकौड़ा सामग्री', nameEn: 'Pakora Mix', price: '₹50/kg', keywords: ['पकौड़ा', 'pakora', 'fritter'] }
    ];

    // Quantity detection with enhanced patterns
    const quantityRegex = /(\d+(?:\.\d+)?)\s*(kg|kilo|किलो|gram|ग्राम|liter|लीटर|piece|पीस)/gi;
    const quantities: {[key: string]: string} = {};
    let match;
    
    while ((match = quantityRegex.exec(text)) !== null) {
      const [fullMatch, amount, unit] = match;
      quantities[match.index] = `${amount} ${unit}`;
    }

    // Advanced matching with partial word detection and fuzzy matching
    const matchedItems: any[] = [];
    
    allItems.forEach(item => {
      const isMatched = item.keywords.some(keyword => {
        const keywordLower = keyword.toLowerCase();
        // Check for exact match, partial match, or fuzzy match
        return lowerText.includes(keywordLower) || 
               (keywordLower.length >= 3 && lowerText.includes(keywordLower.substring(0, 3))) ||
               // Phonetic matching for common mispronunciations
               (keyword === 'प्याज' && (lowerText.includes('pyaz') || lowerText.includes('piaz'))) ||
               (keyword === 'आलू' && (lowerText.includes('aaloo') || lowerText.includes('potato'))) ||
               (keyword === 'टमाटर' && (lowerText.includes('tometo') || lowerText.includes('tamato')));
      });
      
      if (isMatched && !matchedItems.some(m => m.id === item.id)) {
        // Add quantity if detected
        const quantityValues = Object.values(quantities);
        const quantity = quantityValues.length > 0 ? quantityValues[0] : '1 kg';
        matchedItems.push({...item, quantity});
      }
    });

    // If no matches found, provide helpful suggestions
    let itemsToAdd = matchedItems;
    if (matchedItems.length === 0) {
      // Don't add fallback items, instead give feedback
      toast.info(
        language === 'hi' 
          ? 'कोई आइटम नहीं मिला। कृपया स्पष्ट रूप से बोलें या "आज क्या खरीदूं" पूछें।'
          : 'No items found. Please speak clearly or ask "what should I buy today".'
      );
      return;
    }
    
    // Add matched items to cart
    itemsToAdd.forEach(item => {
      addToCart(item);
    });

    // Enhanced success message with item names and quantities
    const itemDetails = itemsToAdd.map(item => {
      const name = language === 'hi' ? item.name : item.nameEn;
      return item.quantity ? `${name} (${item.quantity})` : name;
    });
    
    toast.success(
      language === 'hi' 
        ? `${itemsToAdd.length} आइटम जोड़े गए: ${itemDetails.join(', ')}`
        : `${itemsToAdd.length} items added: ${itemDetails.join(', ')}`
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

            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <p>
                {language === 'hi' 
                  ? 'बटन दबाएं और अपना ऑर्डर बोलें'
                  : 'Press the button and speak your order'
                }
              </p>
              <p className="text-xs">
                {language === 'hi' 
                  ? 'कहें: "2 किलो प्याज और 1 किलो आलू" या "आज क्या खरीदूं?"'
                  : 'Say: "2 kg onions and 1 kg potatoes" or "what should I buy today?"'
                }
              </p>
            </div>

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