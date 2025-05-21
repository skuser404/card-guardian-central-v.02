
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import KsrtcBusTracker from "@/components/KsrtcBusTracker";
import EmergencyButton from "@/components/EmergencyButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Phone } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const KsrtcPortal = () => {
  const navigate = useNavigate();
  const [isKannada, setIsKannada] = useState(false);

  const handleLanguageChange = (value: boolean) => {
    setIsKannada(value);
  };

  const handleEmergencyCall = () => {
    toast({
      title: isKannada ? "ತುರ್ತು ಕರೆ ಮಾಡಲಾಗುತ್ತಿದೆ" : "Emergency Call Initiated",
      description: isKannada 
        ? "ತುರ್ತು ಸೇವೆಗಳು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತವೆ" 
        : "Emergency services will contact you shortly",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen relative">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header isKannada={isKannada} onLanguageChange={handleLanguageChange} />
        
        <main className="my-8">
          <div className="flex items-center gap-2 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="hover:bg-karnataka-blue/10"
            >
              &larr; {isKannada ? "ಹಿಂದೆ" : "Back"}
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-karnataka-red">
              {isKannada ? "ಕೆಎಸ್ಆರ್‌ಟಿಸಿ ಪೋರ್ಟಲ್" : "KSRTC Portal"}
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <KsrtcBusTracker isKannada={isKannada} />
            </div>
            
            <div className="space-y-6">
              <Card className="bg-white border border-red-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-karnataka-red flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                    {isKannada ? "ತುರ್ತು ಸಹಾಯ" : "Emergency Assistance"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    {isKannada 
                      ? "ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ, ಈ ಕೆಳಗಿನ ಬಟನ್ ಅನ್ನು ಒತ್ತಿ"
                      : "In case of emergency, press the button below"}
                  </p>
                  <Button 
                    variant="destructive" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleEmergencyCall}
                  >
                    <Phone className="h-4 w-4" />
                    {isKannada ? "ತುರ್ತು ಸಹಾಯ" : "Emergency Help"}
                  </Button>
                </CardContent>
              </Card>
              
              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2 text-karnataka-red">
                  {isKannada ? "ಸಂಪರ್ಕ ಮಾಹಿತಿ" : "Contact Information"}
                </h3>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <span className="font-medium mr-2">{isKannada ? "ಹೆಲ್ಪ್‌ಲೈನ್:" : "Helpline:"}</span>
                    <a href="tel:18004254709" className="text-karnataka-blue">1800-425-4709</a>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">{isKannada ? "ಇಮೇಲ್:" : "Email:"}</span>
                    <a href="mailto:helpline@ksrtc.org" className="text-karnataka-blue">helpline@ksrtc.org</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default KsrtcPortal;
