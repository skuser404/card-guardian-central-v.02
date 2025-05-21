
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import KsrtcBusTracker from "@/components/KsrtcBusTracker";
import EmergencyButton from "@/components/EmergencyButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const KsrtcPortal = () => {
  const navigate = useNavigate();
  const [isKannada, setIsKannada] = useState(false);

  const handleLanguageChange = (value: boolean) => {
    setIsKannada(value);
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
              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2 text-karnataka-red">
                  {isKannada ? "ತುರ್ತು ಸಹಾಯ" : "Emergency Assistance"}
                </h3>
                <EmergencyButton />
              </div>
              
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
