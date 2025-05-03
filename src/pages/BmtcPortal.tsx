
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BusFront, Map, Route, Navigation } from "lucide-react";

const BmtcPortal = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  
  const popularRoutes = [
    { id: 1, name: "Majestic to Whitefield", number: "500D", frequency: "10 mins", fare: "₹75" },
    { id: 2, name: "KR Market to HSR Layout", number: "368", frequency: "15 mins", fare: "₹60" },
    { id: 3, name: "Shivajinagar to Electronic City", number: "356CW", frequency: "12 mins", fare: "₹85" },
    { id: 4, name: "Banashankari to ITPL", number: "501D", frequency: "20 mins", fare: "₹90" }
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
              className="hover:bg-karnataka-blue/10"
            >
              &larr; Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-karnataka-blue flex items-center">
              <BusFront className="mr-2 h-8 w-8 text-karnataka-blue" />
              BMTC Services
            </h1>
          </div>
          
          <Tabs defaultValue="routes" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="routes">Routes</TabsTrigger>
              <TabsTrigger value="passes">Bus Passes</TabsTrigger>
              <TabsTrigger value="info">Information</TabsTrigger>
            </TabsList>
            
            <TabsContent value="routes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Route className="mr-2 h-5 w-5" />
                    Popular Routes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {popularRoutes.map((route) => (
                      <div 
                        key={route.id}
                        className={`glassmorphism p-4 rounded-lg cursor-pointer transition-all ${selectedRoute === route.name ? 'ring-2 ring-karnataka-blue' : ''}`}
                        onClick={() => setSelectedRoute(route.name)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{route.name}</span>
                          <span className="bg-karnataka-blue text-white px-2 py-1 rounded text-xs">
                            {route.number}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Frequency:</span>
                            <span>{route.frequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fare:</span>
                            <span>{route.fare}</span>
                          </div>
                        </div>
                        
                        {selectedRoute === route.name && (
                          <div className="mt-3 border-t pt-2">
                            <p className="text-sm mb-2">Next buses:</p>
                            <div className="flex gap-2">
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                5 mins
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                15 mins
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                25 mins
                              </span>
                            </div>
                            <Button 
                              size="sm" 
                              className="w-full mt-2 bg-karnataka-blue"
                            >
                              <Navigation className="mr-1 h-4 w-4" />
                              Track Bus
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
                    Route Finder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="glassmorphism p-4 rounded-lg">
                    <p className="mb-4 text-sm text-center">
                      Enter your start and end points to find the best bus routes
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Starting Point"
                        className="border rounded-md p-2 w-full"
                      />
                      <input
                        type="text"
                        placeholder="Destination"
                        className="border rounded-md p-2 w-full"
                      />
                    </div>
                    <Button className="w-full mt-4 bg-karnataka-blue">Find Routes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="passes">
              <Card>
                <CardHeader>
                  <CardTitle>Bus Passes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glassmorphism p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Daily Pass</h3>
                      <p className="text-2xl font-bold">₹70</p>
                      <p className="text-sm text-gray-600 mb-4">Unlimited travel for 24 hours</p>
                      <Button className="w-full">Buy Pass</Button>
                    </div>
                    <div className="glassmorphism p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Monthly Pass</h3>
                      <p className="text-2xl font-bold">₹1,050</p>
                      <p className="text-sm text-gray-600 mb-4">Unlimited travel for 30 days</p>
                      <Button className="w-full">Buy Pass</Button>
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
                    <p className="text-sm">Helpline: 1800-425-1663</p>
                    <p className="text-sm">Email: info@mybmtc.com</p>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Lost & Found</h3>
                    <p className="text-sm">
                      Contact the nearest BMTC depot or call the helpline for lost items.
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

export default BmtcPortal;
