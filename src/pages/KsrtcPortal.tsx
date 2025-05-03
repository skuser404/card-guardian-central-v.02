
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bus, MapPin, Calendar } from "lucide-react";

const KsrtcPortal = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  
  const popularRoutes = [
    { id: 1, name: "Bangalore to Mysore", type: "Airavat Club Class", fare: "₹320", duration: "3h 30m" },
    { id: 2, name: "Bangalore to Mangalore", type: "Airavat Sleeper", fare: "₹950", duration: "8h" },
    { id: 3, name: "Bangalore to Hubli", type: "Non-AC Sleeper", fare: "₹780", duration: "7h 30m" },
    { id: 4, name: "Bangalore to Belgaum", type: "Karnataka Sarige", fare: "₹650", duration: "10h" }
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
              className="hover:bg-karnataka-red/10"
            >
              &larr; Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-karnataka-red flex items-center">
              <Bus className="mr-2 h-8 w-8 text-karnataka-red" />
              KSRTC Services
            </h1>
          </div>
          
          <Tabs defaultValue="routes" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="routes">Routes</TabsTrigger>
              <TabsTrigger value="booking">Booking</TabsTrigger>
              <TabsTrigger value="info">Information</TabsTrigger>
            </TabsList>
            
            <TabsContent value="routes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bus className="mr-2 h-5 w-5" />
                    Popular Routes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {popularRoutes.map((route) => (
                      <div 
                        key={route.id}
                        className={`glassmorphism p-4 rounded-lg cursor-pointer transition-all ${selectedRoute === route.name ? 'ring-2 ring-karnataka-red' : ''}`}
                        onClick={() => setSelectedRoute(route.name)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{route.name}</span>
                          <span className="bg-karnataka-red text-white px-2 py-1 rounded text-xs">
                            {route.type}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Fare:</span>
                            <span>{route.fare}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{route.duration}</span>
                          </div>
                        </div>
                        
                        {selectedRoute === route.name && (
                          <div className="mt-3 border-t pt-2">
                            <p className="text-sm mb-2">Next buses today:</p>
                            <div className="flex gap-2 flex-wrap">
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                10:30 AM
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                12:45 PM
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                3:00 PM
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                7:30 PM
                              </span>
                            </div>
                            <Button 
                              size="sm" 
                              className="w-full mt-2 bg-karnataka-red"
                            >
                              Book Ticket
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="booking">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Your Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="glassmorphism p-4 rounded-lg">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm block mb-1">From</label>
                          <input
                            type="text"
                            placeholder="Departure City"
                            className="border rounded-md p-2 w-full"
                          />
                        </div>
                        <div>
                          <label className="text-sm block mb-1">To</label>
                          <input
                            type="text"
                            placeholder="Destination City"
                            className="border rounded-md p-2 w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm block mb-1">Date</label>
                          <input
                            type="date"
                            className="border rounded-md p-2 w-full"
                          />
                        </div>
                        <div>
                          <label className="text-sm block mb-1">Bus Type</label>
                          <select className="border rounded-md p-2 w-full">
                            <option value="">Any Bus Type</option>
                            <option value="ac">AC</option>
                            <option value="nonac">Non-AC</option>
                            <option value="sleeper">Sleeper</option>
                            <option value="luxury">Luxury</option>
                          </select>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-karnataka-red mt-2">Search Buses</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Track Your Bus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="glassmorphism p-4 rounded-lg">
                    <input
                      type="text"
                      placeholder="Enter PNR Number"
                      className="border rounded-md p-2 w-full"
                    />
                    <Button className="w-full mt-4 bg-karnataka-red">Track Bus</Button>
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
                    <h3 className="font-medium mb-2">Baggage Policy</h3>
                    <p className="text-sm">Up to 15kg luggage allowed per passenger</p>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">Contact Information</h3>
                    <p className="text-sm">Helpline: 1800-425-8844</p>
                    <p className="text-sm">Email: helpline@ksrtc.in</p>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Cancellation Policy</h3>
                    <div className="text-sm">
                      <p className="mb-1">• 2+ hours before departure: 25% charge</p>
                      <p className="mb-1">• 30 mins - 2 hours: 50% charge</p>
                      <p className="mb-1">• Less than 30 mins: No refund</p>
                    </div>
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

export default KsrtcPortal;
