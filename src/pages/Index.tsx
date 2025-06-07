
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import { Sparkles, Bus, Train, Car, MoreVertical, Shield } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useToast } from "@/components/ui/use-toast";
import LiveStatus from "@/components/LiveStatus";
import TransportCard from "@/components/TransportCard";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import EmergencyButton from "@/components/EmergencyButton";

const Index = () => {
  const navigate = useNavigate();
  const [isKannada, setIsKannada] = useState(false);
  const { toast } = useToast();

  const handleLanguageChange = (value: boolean) => {
    setIsKannada(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-karnataka-lightBlue/20 to-karnataka-yellow/20">
      
      <div className="container max-w-4xl mx-auto px-4 py-6 relative z-10">
        <Header isKannada={isKannada} onLanguageChange={handleLanguageChange} />
        
        <main className="my-8">
          {/* Hero Section */}
          <section className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-karnataka-blue mb-4">
              {isKannada ? "ಕರ್ನಾಟಕ ಸಾರಿಗೆ ಸೇವೆಗಳಿಗೆ ಸುಸ್ವಾಗತ" : "Welcome to Karnataka Transport Services"}
            </h1>
            <p className="text-karnataka-gray text-lg">
              {isKannada
                ? "ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಸುಲಭಗೊಳಿಸಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ. ಬಸ್ಸುಗಳು, ಮೆಟ್ರೋ ಮತ್ತು ಹೆಚ್ಚಿನವುಗಳ ಕುರಿತು ನೈಜ-ಸಮಯದ ನವೀಕರಣಗಳನ್ನು ಪಡೆಯಿರಿ."
                : "We're here to make your commute easier. Get real-time updates on buses, metro, and more."}
            </p>
          </section>
          
          {/* Services Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-karnataka-blue mb-4">
              {isKannada ? "ನಮ್ಮ ಸೇವೆಗಳು" : "Our Services"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white border-2 border-karnataka-blue hover:border-karnataka-red hover:scale-105 transition-all cursor-pointer shadow-md">
                <CardHeader className="bg-karnataka-blue text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Bus className="mr-2 h-4 w-4" />
                      {isKannada ? "ಬಿಎಂಟಿಸಿ ಬಸ್ಸುಗಳು" : "BMTC Buses"}
                    </span>
                    <Sparkles className="h-4 w-4 text-karnataka-yellow" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-karnataka-gray">
                    {isKannada
                      ? "ಬೆಂಗಳೂರು ನಗರದಲ್ಲಿ ಬಸ್ಸುಗಳ ನೈಜ-ಸಮಯದ ಮಾಹಿತಿ ಮತ್ತು ಮಾರ್ಗಗಳನ್ನು ಹುಡುಕಿ."
                      : "Real-time info and route finding for buses in Bangalore city."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-2 border-karnataka-yellow hover:border-karnataka-red hover:scale-105 transition-all cursor-pointer shadow-md">
                <CardHeader className="bg-karnataka-yellow text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Train className="mr-2 h-4 w-4" />
                      {isKannada ? "ನಮ್ಮ ಮೆಟ್ರೋ" : "Namma Metro"}
                    </span>
                    <Sparkles className="h-4 w-4 text-karnataka-blue" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-karnataka-gray">
                    {isKannada
                      ? "ಬೆಂಗಳೂರಿನ ಮೆಟ್ರೋ ರೈಲುಗಳ ಬಗ್ಗೆ ನವೀಕರಣಗಳು ಮತ್ತು ವೇಳಾಪಟ್ಟಿಗಳನ್ನು ಪಡೆಯಿರಿ."
                      : "Get updates and schedules for Bangalore's metro trains."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-2 border-karnataka-green hover:border-karnataka-red hover:scale-105 transition-all cursor-pointer shadow-md">
                <CardHeader className="bg-karnataka-green text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Car className="mr-2 h-4 w-4" />
                      {isKannada ? "ಆಟೋ/ಟ್ಯಾಕ್ಸಿ ಸೇವೆಗಳು" : "Auto/Taxi Services"}
                    </span>
                    <Sparkles className="h-4 w-4 text-karnataka-yellow" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-karnataka-gray">
                    {isKannada
                      ? "ಬೆಂಗಳೂರಿನಲ್ಲಿ ಆಟೋ ಮತ್ತು ಟ್ಯಾಕ್ಸಿ ಸೇವೆಗಳ ಲಭ್ಯತೆ ಮತ್ತು ದರಗಳನ್ನು ಹುಡುಕಿ."
                      : "Find availability and fares for auto and taxi services in Bangalore."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-2 border-karnataka-red hover:border-karnataka-blue hover:scale-105 transition-all cursor-pointer shadow-md">
                <CardHeader className="bg-karnataka-red text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Bus className="mr-2 h-4 w-4" />
                      {isKannada ? "ಕೆಎಸ್ಆರ್‌ಟಿಸಿ ಬಸ್ಸುಗಳು" : "KSRTC Buses"}
                    </span>
                    <Sparkles className="h-4 w-4 text-karnataka-yellow" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-karnataka-gray">
                    {isKannada
                      ? "ಕರ್ನಾಟಕದಾದ್ಯಂತ ಕೆಎಸ್ಆರ್‌ಟಿಸಿ ಬಸ್ಸುಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಮತ್ತು ವೇಳಾಪಟ್ಟಿಗಳನ್ನು ಪಡೆಯಿರಿ."
                      : "Get information and schedules for KSRTC buses across Karnataka."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Live Status Section */}
          <section className="mb-8">
            <LiveStatus isKannada={isKannada} />
          </section>
          
          {/* Transport Card Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-karnataka-blue mb-4">
              {isKannada ? "ಸಾರಿಗೆ ಕಾರ್ಡ್" : "Transport Card"}
            </h2>
            <TransportCard isKannada={isKannada} />
          </section>
          
          {/* Employee Portal Link */}
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              className="border-karnataka-blue text-karnataka-blue hover:bg-karnataka-blue hover:text-white"
              onClick={() => navigate("/employee-login")}
            >
              <Shield className="mr-2 h-4 w-4" />
              {isKannada ? "ಉದ್ಯೋಗಿ ಪೋರ್ಟಲ್" : "Employee Portal"}
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
      
      {/* Emergency Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <EmergencyButton isKannada={isKannada} />
      </div>
    </div>
  );
};

export default Index;
