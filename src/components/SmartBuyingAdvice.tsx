import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  TrendingUp, 
  TrendingDown, 
  ThumbsUp, 
  ThumbsDown,
  ShoppingCart,
  AlertTriangle,
  Zap,
  Cloud,
  Sun,
  CloudRain
} from "lucide-react";
import { toast } from "sonner";

interface SmartAdvice {
  buyInBulk: Array<{
    id: string;
    name: string;
    nameEn: string;
    reason: string;
    reasonEn: string;
    emoji: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  avoidStocking: Array<{
    id: string;
    name: string;
    nameEn: string;
    reason: string;
    reasonEn: string;
    emoji: string;
    risk: 'high' | 'medium' | 'low';
  }>;
}

// AI-powered suggestions based on weather patterns
const getSmartAdvice = (weather: any): SmartAdvice => {
  const advice: SmartAdvice = {
    buyInBulk: [],
    avoidStocking: []
  };

  // High humidity logic (>75%)
  if (weather.humidity > 75) {
    advice.avoidStocking.push({
      id: 'tomatoes',
      name: 'टमाटर',
      nameEn: 'Tomatoes',
      reason: 'नमी के कारण जल्दी खराब हो जाएंगे',
      reasonEn: 'Will spoil quickly due to humidity',
      emoji: '🍅',
      risk: 'high'
    });
    advice.avoidStocking.push({
      id: 'leafy-greens',
      name: 'हरी पत्तेदार सब्जियां',
      nameEn: 'Leafy Greens',
      reason: 'नमी में पत्ते मुरझा जाते हैं',
      reasonEn: 'Leaves wilt in humidity',
      emoji: '🥬',
      risk: 'medium'
    });
    advice.avoidStocking.push({
      id: 'onions',
      name: 'प्याज',
      nameEn: 'Onions',
      reason: 'नमी में अंकुरण की समस्या',
      reasonEn: 'Sprouting issues in humidity',
      emoji: '🧅',
      risk: 'medium'
    });
    advice.avoidStocking.push({
      id: 'potatoes',
      name: 'आलू',
      nameEn: 'Potatoes',
      reason: 'नमी में हरे हो जाते हैं',
      reasonEn: 'Turn green in humidity',
      emoji: '🥔',
      risk: 'medium'
    });
    advice.buyInBulk.push({
      id: 'dry-spices',
      name: 'सूखे मसाले',
      nameEn: 'Dry Spices',
      reason: 'नमी में भी टिकाऊ रहते हैं',
      reasonEn: 'Stay fresh even in humidity',
      emoji: '🌶️',
      priority: 'medium'
    });
  }

  // Hot weather logic (>30°C)
  if (weather.temperature > 30) {
    advice.buyInBulk.push({
      id: 'kulfi-ice',
      name: 'कुल्फी/आइस',
      nameEn: 'Kulfi/Ice',
      reason: 'गर्मी में अच्छी बिक्री',
      reasonEn: 'Good sales in hot weather',
      emoji: '🍦',
      priority: 'high'
    });
    advice.buyInBulk.push({
      id: 'cold-drinks',
      name: 'ठंडे पेय',
      nameEn: 'Cold Drinks',
      reason: 'गर्मी में मांग बढ़ती है',
      reasonEn: 'Demand increases in heat',
      emoji: '🥤',
      priority: 'high'
    });
    advice.buyInBulk.push({
      id: 'watermelon',
      name: 'तरबूज',
      nameEn: 'Watermelon',
      reason: 'गर्मी में अच्छी मांग',
      reasonEn: 'High demand in summer',
      emoji: '🍉',
      priority: 'high'
    });
    advice.buyInBulk.push({
      id: 'cucumber',
      name: 'खीरा',
      nameEn: 'Cucumber',
      reason: 'ठंडक देता है, अच्छी बिक्री',
      reasonEn: 'Cooling effect, good sales',
      emoji: '🥒',
      priority: 'medium'
    });
    advice.buyInBulk.push({
      id: 'mint-coriander',
      name: 'पुदीना/धनिया',
      nameEn: 'Mint/Coriander',
      reason: 'चटनी और शरबत की मांग',
      reasonEn: 'Demand for chutneys and drinks',
      emoji: '🌿',
      priority: 'medium'
    });
    advice.buyInBulk.push({
      id: 'lemons',
      name: 'नींबू',
      nameEn: 'Lemons',
      reason: 'नींबू पानी की मांग बढ़ती है',
      reasonEn: 'Lemonade demand increases',
      emoji: '🍋',
      priority: 'high'
    });
    advice.avoidStocking.push({
      id: 'chocolate',
      name: 'चॉकलेट',
      nameEn: 'Chocolate',
      reason: 'गर्मी में पिघल जाएगी',
      reasonEn: 'Will melt in heat',
      emoji: '🍫',
      risk: 'high'
    });
    advice.avoidStocking.push({
      id: 'dairy-products',
      name: 'दूध उत्पाद',
      nameEn: 'Dairy Products',
      reason: 'गर्मी में जल्दी खराब हो जाते हैं',
      reasonEn: 'Spoil quickly in heat',
      emoji: '🥛',
      risk: 'high'
    });
    advice.avoidStocking.push({
      id: 'meat',
      name: 'मांस/मछली',
      nameEn: 'Meat/Fish',
      reason: 'गर्मी में संक्रमण का खतरा',
      reasonEn: 'Infection risk in heat',
      emoji: '🐟',
      risk: 'high'
    });
  }

  // Rainy weather logic
  if (weather.condition === 'rainy') {
    advice.buyInBulk.push({
      id: 'ginger-tea',
      name: 'अदरक/चाय',
      nameEn: 'Ginger/Tea',
      reason: 'बारिश में गर्म चीजों की मांग',
      reasonEn: 'Hot items in demand during rain',
      emoji: '☕',
      priority: 'high'
    });
    advice.buyInBulk.push({
      id: 'pakoras',
      name: 'पकौड़े के लिए सामग्री',
      nameEn: 'Pakora Ingredients',
      reason: 'बारिश में तली हुई चीजें पसंद',
      reasonEn: 'Fried items preferred in rain',
      emoji: '🥙',
      priority: 'medium'
    });
    advice.buyInBulk.push({
      id: 'corn',
      name: 'भुट्टा',
      nameEn: 'Corn',
      reason: 'बारिश में भुट्टा खाने का मूड',
      reasonEn: 'Perfect weather for roasted corn',
      emoji: '🌽',
      priority: 'high'
    });
    advice.buyInBulk.push({
      id: 'samosa-ingredients',
      name: 'समोसा सामग्री',
      nameEn: 'Samosa Ingredients',
      reason: 'बारिश में गर्म नाश्ते की मांग',
      reasonEn: 'Hot snacks in demand',
      emoji: '🥟',
      priority: 'medium'
    });
    advice.buyInBulk.push({
      id: 'hot-soup',
      name: 'सूप सामग्री',
      nameEn: 'Soup Ingredients',
      reason: 'गर्म सूप की मांग बढ़ती है',
      reasonEn: 'Hot soup demand increases',
      emoji: '🍲',
      priority: 'medium'
    });
    advice.avoidStocking.push({
      id: 'street-chaat',
      name: 'स्ट्रीट चाट',
      nameEn: 'Street Chaat',
      reason: 'बारिश में स्वच्छता की समस्या',
      reasonEn: 'Hygiene issues in rain',
      emoji: '🥗',
      risk: 'high'
    });
    advice.avoidStocking.push({
      id: 'fresh-fruits',
      name: 'ताजे फल',
      nameEn: 'Fresh Fruits',
      reason: 'बारिश में जल्दी खराब हो जाते हैं',
      reasonEn: 'Spoil quickly in rain',
      emoji: '🍎',
      risk: 'medium'
    });
  }

  // Cool weather logic (<25°C)
  if (weather.temperature < 25) {
    advice.buyInBulk.push({
      id: 'winter-vegetables',
      name: 'सर्दी की सब्जियां',
      nameEn: 'Winter Vegetables',
      reason: 'ठंड में अच्छी क्वालिटी मिलती है',
      reasonEn: 'Better quality in cool weather',
      emoji: '🥕',
      priority: 'medium'
    });
    advice.buyInBulk.push({
      id: 'hot-tea-coffee',
      name: 'चाय/कॉफी',
      nameEn: 'Tea/Coffee',
      reason: 'ठंड में गर्म पेय की मांग',
      reasonEn: 'Hot beverages in demand',
      emoji: '☕',
      priority: 'high'
    });
    advice.buyInBulk.push({
      id: 'jaggery',
      name: 'गुड़',
      nameEn: 'Jaggery',
      reason: 'सर्दी में गुड़ की चाय पसंद',
      reasonEn: 'Jaggery tea preferred in winter',
      emoji: '🍯',
      priority: 'medium'
    });
    advice.buyInBulk.push({
      id: 'groundnuts',
      name: 'मूंगफली',
      nameEn: 'Groundnuts',
      reason: 'सर्दी में मूंगफली की अच्छी मांग',
      reasonEn: 'Good demand for groundnuts',
      emoji: '🥜',
      priority: 'medium'
    });
    advice.buyInBulk.push({
      id: 'sweet-potato',
      name: 'शकरकंद',
      nameEn: 'Sweet Potato',
      reason: 'सर्दी में भुना शकरकंद पसंद',
      reasonEn: 'Roasted sweet potato popular',
      emoji: '🍠',
      priority: 'medium'
    });
    advice.buyInBulk.push({
      id: 'carrots-radish',
      name: 'गाजर/मूली',
      nameEn: 'Carrots/Radish',
      reason: 'सर्दी की मुख्य सब्जियां',
      reasonEn: 'Main winter vegetables',
      emoji: '🥕',
      priority: 'medium'
    });
    advice.avoidStocking.push({
      id: 'ice-items',
      name: 'बर्फ वाली चीजें',
      nameEn: 'Ice Items',
      reason: 'ठंड में मांग कम होती है',
      reasonEn: 'Low demand in cold weather',
      emoji: '🧊',
      risk: 'medium'
    });
  }

  // Very hot weather (>35°C)
  if (weather.temperature > 35) {
    advice.buyInBulk.push({
      id: 'coconut-water',
      name: 'नारियल पानी',
      nameEn: 'Coconut Water',
      reason: 'तेज गर्मी में बेहतरीन मांग',
      reasonEn: 'Excellent demand in extreme heat',
      emoji: '🥥',
      priority: 'high'
    });
    advice.buyInBulk.push({
      id: 'sugarcane-juice',
      name: 'गन्ने का रस',
      nameEn: 'Sugarcane Juice',
      reason: 'गर्मी में सबसे ज्यादा मांग',
      reasonEn: 'Highest demand in heat',
      emoji: '🧃',
      priority: 'high'
    });
  }

  return advice;
};

// Mock weather for demo
const mockWeather = {
  temperature: 32,
  humidity: 78,
  condition: 'cloudy'
};

export const SmartBuyingAdvice = () => {
  const { language } = useLanguage();
  const [feedback, setFeedback] = useState<{[key: string]: 'helpful' | 'not-helpful' | null}>({});
  const [advice] = useState(() => getSmartAdvice(mockWeather));

  const handleFeedback = (itemId: string, isHelpful: boolean) => {
    setFeedback(prev => ({
      ...prev,
      [itemId]: isHelpful ? 'helpful' : 'not-helpful'
    }));
    
    toast.success(
      language === 'hi' 
        ? isHelpful ? 'धन्यवाद! आपकी प्रतिक्रिया दर्ज हो गई' : 'फीडबैक के लिए धन्यवाद'
        : isHelpful ? 'Thanks! Your feedback is recorded' : 'Thanks for your feedback'
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4">
      {/* Buy in Bulk Section */}
      <Card className="shadow-warm">
        <CardHeader className="bg-gradient-secondary text-secondary-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="w-6 h-6" />
            {language === 'hi' ? 'थोक में खरीदें' : 'Buy in Bulk'}
            <span className="text-sm opacity-80">
              ({language === 'hi' ? 'मौसम के अनुसार' : 'Weather-based'})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advice.buyInBulk.map((item) => (
              <Card key={item.id} className="border-2 hover:border-success/30 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <h4 className="font-semibold">
                          {language === 'hi' ? item.name : item.nameEn}
                        </h4>
                        <div className={`flex items-center gap-1 text-xs ${getPriorityColor(item.priority)}`}>
                          <Zap className="w-3 h-3" />
                          <span className="capitalize">{item.priority}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {language === 'hi' ? item.reason : item.reasonEn}
                  </p>
                  
                  {/* Feedback buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={feedback[item.id] === 'helpful' ? 'default' : 'outline'}
                        onClick={() => handleFeedback(item.id, true)}
                        className="h-6 px-2"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant={feedback[item.id] === 'not-helpful' ? 'destructive' : 'outline'}
                        onClick={() => handleFeedback(item.id, false)}
                        className="h-6 px-2"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button size="sm" variant="success" className="h-6 text-xs">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {language === 'hi' ? 'खरीदें' : 'Buy'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Avoid Stocking Section */}
      <Card className="shadow-warm">
        <CardHeader className="bg-gradient-to-r from-destructive to-warning text-destructive-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="w-6 h-6" />
            {language === 'hi' ? 'स्टॉक न करें' : 'Avoid Stocking'}
            <span className="text-sm opacity-80">
              ({language === 'hi' ? 'खराब होने का खतरा' : 'Spoilage Risk'})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advice.avoidStocking.map((item) => (
              <Card key={item.id} className="border-2 hover:border-destructive/30 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <h4 className="font-semibold">
                          {language === 'hi' ? item.name : item.nameEn}
                        </h4>
                        <div className={`flex items-center gap-1 text-xs ${getRiskColor(item.risk)}`}>
                          <TrendingDown className="w-3 h-3" />
                          <span className="capitalize">{item.risk} risk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {language === 'hi' ? item.reason : item.reasonEn}
                  </p>
                  
                  {/* Feedback buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={feedback[item.id] === 'helpful' ? 'default' : 'outline'}
                      onClick={() => handleFeedback(item.id, true)}
                      className="h-6 px-2"
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant={feedback[item.id] === 'not-helpful' ? 'destructive' : 'outline'}
                      onClick={() => handleFeedback(item.id, false)}
                      className="h-6 px-2"
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};