import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets,
  Wind,
  MapPin 
} from "lucide-react";

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  windSpeed: number;
  forecast: Array<{
    day: string;
    temp: number;
    condition: 'sunny' | 'cloudy' | 'rainy';
    humidity: number;
  }>;
}

// Mock weather data for demo - In production, use OpenWeatherMap API
const mockWeatherData: WeatherData = {
  city: "Mumbai",
  temperature: 32,
  humidity: 78,
  condition: 'cloudy',
  windSpeed: 12,
  forecast: [
    { day: 'Today', temp: 32, condition: 'cloudy', humidity: 78 },
    { day: 'Tomorrow', temp: 29, condition: 'rainy', humidity: 85 },
    { day: 'Day 3', temp: 34, condition: 'sunny', humidity: 65 }
  ]
};

export const WeatherWidget = () => {
  const { language } = useLanguage();
  const [weather, setWeather] = useState<WeatherData>(mockWeatherData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In production, fetch from OpenWeatherMap API
    // fetchWeatherData();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-6 h-6 text-warning" />;
      case 'rainy':
        return <CloudRain className="w-6 h-6 text-primary" />;
      default:
        return <Cloud className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getConditionText = (condition: string) => {
    const conditions = {
      sunny: language === 'hi' ? 'धूप' : 'Sunny',
      cloudy: language === 'hi' ? 'बादल' : 'Cloudy', 
      rainy: language === 'hi' ? 'बारिश' : 'Rainy'
    };
    return conditions[condition as keyof typeof conditions] || condition;
  };

  return (
    <Card className="shadow-warm border-2 hover:border-primary/30 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{weather.city}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Current Weather */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-2xl font-bold">{weather.temperature}°C</div>
              <div className="text-xs text-muted-foreground">
                {getConditionText(weather.condition)}
              </div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3 text-primary" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3 text-secondary" />
            <span>{weather.windSpeed} km/h</span>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div className="space-y-1">
          <div className="text-xs font-semibold mb-2">
            {language === 'hi' ? '3 दिन का मौसम' : '3-Day Forecast'}
          </div>
          {weather.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{day.day}</span>
              <div className="flex items-center gap-1">
                {getWeatherIcon(day.condition)}
                <span>{day.temp}°</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};