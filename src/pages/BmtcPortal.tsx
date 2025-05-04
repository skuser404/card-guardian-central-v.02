import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BusFront, Map, Route, Navigation, CircleDot } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const BmtcPortal = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [searchResults, setSearchResults] = useState<BusRoute[] | null>(null);
  
  const recentRoutes = [
    { id: 1, name: "Majestic to Whitefield", number: "500D", frequency: "10 mins", fare: "₹30", isAC: false },
    { id: 2, name: "KR Market to HSR Layout", number: "368", frequency: "15 mins", fare: "₹25", isAC: false },
    { id: 3, name: "Shivajinagar to Electronic City", number: "356CW", frequency: "12 mins", fare: "₹50", isAC: true },
    { id: 4, name: "Banashankari to ITPL", number: "501D", frequency: "20 mins", fare: "₹45", isAC: true }
  ];
  
  // Define sample bus routes for demonstration
  const busRoutes: BusRoute[] = [
    { id: 1, number: "500D", from: "Majestic", to: "Whitefield", departureTime: "10:15 AM", arrivalTime: "11:30 AM", fare: "₹30", capacity: "overloaded", isAC: false },
    { id: 2, number: "500D", from: "Majestic", to: "Whitefield", departureTime: "10:30 AM", arrivalTime: "11:45 AM", fare: "₹30", capacity: "standing", isAC: false },
    { id: 3, number: "500D", from: "Majestic", to: "Whitefield", departureTime: "10:45 AM", arrivalTime: "12:00 PM", fare: "₹30", capacity: "available", isAC: false },
    { id: 4, number: "368", from: "KR Market", to: "HSR Layout", departureTime: "11:00 AM", arrivalTime: "12:15 PM", fare: "₹25", capacity: "overloaded", isAC: false },
    { id: 5, number: "368", from: "KR Market", to: "HSR Layout", departureTime: "11:15 AM", arrivalTime: "12:30 PM", fare: "₹25", capacity: "standing", isAC: false },
    { id: 6, number: "356CW", from: "Shivajinagar", to: "Electronic City", departureTime: "11:30 AM", arrivalTime: "12:45 PM", fare: "₹50", capacity: "available", isAC: true },
  ];
  
  type BusRoute = {
    id: number;
    number: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    fare: string;
    capacity: 'available' | 'standing' | 'overloaded';
    isAC?: boolean;
  };
  
  const handleFindRoutes = () => {
    if (!startPoint || !destination) {
      toast({
        title: "Please enter both starting point and destination",
        description: "Both fields are required to search for routes",
        variant: "destructive",
      });
      return;
    }
    
    // Filter routes based on input
    // In real app, this would be an API call
    const filteredRoutes = busRoutes.filter(route => {
      return (
        route.from.toLowerCase().includes(startPoint.toLowerCase()) ||
        route.to.toLowerCase().includes(destination.toLowerCase())
      );
    });
    
    if (filteredRoutes.length === 0) {
      toast({
        title: "No routes found",
        description: "Try different locations or check spelling",
      });
      setSearchResults([]);
    } else {
      setSearchResults(filteredRoutes);
      toast({
        title: "Routes found",
        description: `Found ${filteredRoutes.length} routes matching your search`,
      });
    }
  };
  
  const getCapacityColor = (capacity: string) => {
    switch (capacity) {
      case 'overloaded':
        return "bg-[#ea384c]";
      case 'standing':
        return "bg-[#FEF7CD] border border-yellow-400";
      case 'available':
        return "bg-[#F2FCE2] border border-green-400";
      default:
        return "bg-gray-200";
    }
  };
  
  const getCapacityText = (capacity: string) => {
    switch (capacity) {
      case 'overloaded':
        return "Overloaded";
      case 'standing':
        return "Standing available";
      case 'available':
        return "Seats available";
      default:
        return "Unknown";
    }
  };
  
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
              {/* Route Finder moved above Recent Routes */}
              <Card className="mb-4">
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
                        value={startPoint}
                        onChange={(e) => setStartPoint(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Destination"
                        className="border rounded-md p-2 w-full"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full mt-4 bg-karnataka-blue"
                      onClick={handleFindRoutes}
                    >
                      Find Routes
                    </Button>
                    
                    {searchResults !== null && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-3">
                          {searchResults.length > 0 ? 'Available Routes' : 'No routes found'}
                        </h3>
                        
                        <div className="space-y-4">
                          {searchResults.map((route) => (
                            <div key={route.id} className="border rounded-lg p-3 bg-white">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{route.from} to {route.to}</span>
                                <div className="flex items-center gap-2">
                                  {route.isAC && (
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                      AC
                                    </span>
                                  )}
                                  <span className="bg-karnataka-blue text-white px-2 py-1 rounded text-xs">
                                    {route.number}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-600">Departure:</span> {route.departureTime}
                                </div>
                                <div>
                                  <span className="text-gray-600">Arrival:</span> {route.arrivalTime}
                                </div>
                                <div>
                                  <span className="text-gray-600">Fare:</span> {route.fare}
                                </div>
                                <div className="flex items-center">
                                  <span className="text-gray-600 mr-1">Capacity:</span>
                                  <span className="flex items-center">
                                    <CircleDot className={`h-3 w-3 mr-1 ${getCapacityColor(route.capacity)}`} />
                                    {getCapacityText(route.capacity)}
                                  </span>
                                </div>
                              </div>
                              
                              <Button 
                                variant="outline"
                                size="sm"
                                className="w-full mt-2 border-karnataka-blue text-karnataka-blue hover:bg-karnataka-blue/10"
                              >
                                Book Ticket
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Changed from Popular Routes to Recent Routes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Route className="mr-2 h-5 w-5" />
                    Recent Routes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentRoutes.map((route) => (
                      <div 
                        key={route.id}
                        className={`glassmorphism p-4 rounded-lg cursor-pointer transition-all ${selectedRoute === route.name ? 'ring-2 ring-karnataka-blue' : ''}`}
                        onClick={() => setSelectedRoute(route.name)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{route.name}</span>
                          <div className="flex items-center gap-2">
                            {route.isAC && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                AC
                              </span>
                            )}
                            <span className="bg-karnataka-blue text-white px-2 py-1 rounded text-xs">
                              {route.number}
                            </span>
                          </div>
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
