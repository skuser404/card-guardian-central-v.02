
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import KsrtcBusTracker from "@/components/KsrtcBusTracker";
import BusMapTracker from "@/components/BusMapTracker";
import EmergencyButton from "@/components/EmergencyButton";
import StudentPassInfo from "@/components/StudentPassInfo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Map, Phone, GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const KsrtcPortal = () => {
  const navigate = useNavigate();
  const [isKannada, setIsKannada] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);

  const handleLanguageChange = (value: boolean) => {
    setIsKannada(value);
  };

  const handleBusSelection = (busId: string) => {
    setSelectedBusId(busId);
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
          
          <Tabs defaultValue="list" className="mb-6">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="list">
                {isKannada ? "ಬಸ್ ಪಟ್ಟಿ" : "Bus List"}
              </TabsTrigger>
              <TabsTrigger value="map">
                {isKannada ? "ನಕ್ಷೆ ಟ್ರ್ಯಾಕಿಂಗ್" : "Map Tracking"}
              </TabsTrigger>
              <TabsTrigger value="student-pass">
                {isKannada ? "ವಿದ್ಯಾರ್ಥಿ ಪಾಸ್" : "Student Pass"}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <KsrtcBusTracker 
                  isKannada={isKannada} 
                  onBusSelect={handleBusSelection} 
                />
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
                    <EmergencyButton 
                      isKannada={isKannada} 
                    />
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
            </TabsContent>
            
            <TabsContent value="map">
              <div className="grid grid-cols-1 gap-6">
                <BusMapTracker 
                  isKannada={isKannada} 
                  selectedBusId={selectedBusId || undefined} 
                />
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Card className="bg-white border flex-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-karnataka-red flex items-center">
                        <Map className="h-5 w-5 mr-2 text-karnataka-blue" />
                        {isKannada ? "ಬಸ್ ಮಾಹಿತಿ" : "Bus Information"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        {isKannada 
                          ? "ಮಾರ್ಗ ಮಾಹಿತಿ ಮತ್ತು ಬಸ್ ಸ್ಥಿತಿ ನೋಡಲು ನಕ್ಷೆಯಲ್ಲಿ ಮಾರ್ಕರ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ"
                          : "Click on markers in the map to view route information and bus status"}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border border-red-200 flex-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-karnataka-red flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                        {isKannada ? "ತುರ್ತು ಸಹಾಯ" : "Emergency Assistance"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <EmergencyButton 
                        isKannada={isKannada} 
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="student-pass">
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-white border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-karnataka-red flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-karnataka-blue" />
                      {isKannada ? "ವಿದ್ಯಾರ್ಥಿ ಬಸ್ ಪಾಸ್" : "Student Bus Pass"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StudentPassInfo isKannada={isKannada} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default KsrtcPortal;
