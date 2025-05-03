
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Train, Map, Navigation } from "lucide-react";

const MetroPortal = () => {
  const navigate = useNavigate();
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  
  const metroLines = [
    { id: 1, name: "Purple Line", stations: "Baiyappanahalli to Kengeri", status: "Normal", frequency: "7 mins" },
    { id: 2, name: "Green Line", stations: "Nagasandra to Silk Institute", status: "Normal", frequency: "8 mins" },
    { id: 3, name: "Yellow Line", stations: "RV Road to Bommasandra", status: "Under Construction", frequency: "N/A" },
    { id: 4, name: "Pink Line", stations: "Kalena Agrahara to Nagawara", status: "Under Construction", frequency: "N/A" }
  ];
  
  return (
    <div className="min-h-screen relative">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header />
        
        <main className="my-6">
          <div className="flex items-center gap-2 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="hover:bg-karnataka-yellow/10"
            >
              &larr; Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-karnataka-yellow flex items-center">
              <Train className="mr-2 h-8 w-8 text-karnataka-yellow" />
              Metro Services
            </h1>
          </div>
          
          <Tabs defaultValue="lines" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="lines">Lines</TabsTrigger>
              <TabsTrigger value="passes">Metro Cards</TabsTrigger>
              <TabsTrigger value="info">Information</TabsTrigger>
            </TabsList>
            
            <TabsContent value="lines">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Train className="mr-2 h-5 w-5" />
                    Metro Lines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {metroLines.map((line) => (
                      <div 
                        key={line.id}
                        className={`glassmorphism p-4 rounded-lg cursor-pointer transition-all ${selectedLine === line.name ? 'ring-2 ring-karnataka-yellow' : ''}`}
                        onClick={() => line.status !== "Under Construction" && setSelectedLine(line.name)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{line.name}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            line.status === "Normal" ? "bg-green-100 text-green-800" : 
                            line.status === "Minor Delay" ? "bg-yellow-100 text-yellow-800" : 
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {line.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{line.stations}</p>
                        <div className="mt-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Frequency:</span>
                            <span>{line.frequency}</span>
                          </div>
                        </div>
                        
                        {selectedLine === line.name && (
                          <div className="mt-3 border-t pt-2">
                            <p className="text-sm mb-2">Next trains:</p>
                            <div className="flex gap-2">
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                3 mins
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                10 mins
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                17 mins
                              </span>
                            </div>
                            <Button 
                              size="sm" 
                              className="w-full mt-2 bg-karnataka-yellow text-black"
                            >
                              <Navigation className="mr-1 h-4 w-4" />
                              View Stations
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Map className="mr-2 h-5 w-5" />
                    Station Finder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="glassmorphism p-4 rounded-lg">
                    <p className="mb-4 text-sm text-center">
                      Find the nearest metro station
                    </p>
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="border rounded-md p-2 w-full"
                    />
                    <Button className="w-full mt-4 bg-karnataka-yellow text-black">Find Stations</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="passes">
              <Card>
                <CardHeader>
                  <CardTitle>Metro Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glassmorphism p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Regular Card</h3>
                      <p className="text-2xl font-bold">₹50</p>
                      <p className="text-sm text-gray-600 mb-4">Reloadable card + 10% discount on fares</p>
                      <Button className="w-full bg-karnataka-yellow text-black">Get Card</Button>
                    </div>
                    <div className="glassmorphism p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Monthly Pass</h3>
                      <p className="text-2xl font-bold">₹1,500</p>
                      <p className="text-sm text-gray-600 mb-4">Unlimited travel for 30 days</p>
                      <Button className="w-full bg-karnataka-yellow text-black">Buy Pass</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Service Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="glassmorphism p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">Operation Hours</h3>
                    <p className="text-sm">5:00 AM to 11:00 PM</p>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">Contact Information</h3>
                    <p className="text-sm">Helpline: 1800-425-1243</p>
                    <p className="text-sm">Email: info@bmrcl.co.in</p>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Security Guidelines</h3>
                    <p className="text-sm">
                      All passengers must undergo security checks before entering the metro stations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default MetroPortal;
