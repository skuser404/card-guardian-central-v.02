
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bus, MapPin, Calendar, CircleDot } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const KsrtcPortal = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [busType, setBusType] = useState("");
  const [searchResults, setSearchResults] = useState<BusRoute[] | null>(null);
  
  const popularRoutes = [
    { id: 1, name: "Bangalore to Mysore", type: "Airavat Club Class", fare: "₹320", duration: "3h 30m" },
    { id: 2, name: "Bangalore to Mangalore", type: "Airavat Sleeper", fare: "₹950", duration: "8h" },
    { id: 3, name: "Bangalore to Hubli", type: "Non-AC Sleeper", fare: "₹780", duration: "7h 30m" },
    { id: 4, name: "Bangalore to Belgaum", type: "Karnataka Sarige", fare: "₹650", duration: "10h" }
  ];
  
  // Sample bus routes for demonstration
  const busRoutes: BusRoute[] = [
    { id: 1, type: "Airavat Club Class", from: "Bangalore", to: "Mysore", departureTime: "08:30 AM", arrivalTime: "12:00 PM", fare: "₹320", capacity: "available" },
    { id: 2, type: "Airavat Club Class", from: "Bangalore", to: "Mysore", departureTime: "09:30 AM", arrivalTime: "01:00 PM", fare: "₹320", capacity: "standing" },
    { id: 3, type: "Airavat Club Class", from: "Bangalore", to: "Mysore", departureTime: "10:30 AM", arrivalTime: "02:00 PM", fare: "₹320", capacity: "overloaded" },
    { id: 4, type: "Airavat Sleeper", from: "Bangalore", to: "Mangalore", departureTime: "08:00 PM", arrivalTime: "04:00 AM", fare: "₹950", capacity: "available" },
    { id: 5, type: "Non-AC Sleeper", from: "Bangalore", to: "Hubli", departureTime: "09:00 PM", arrivalTime: "04:30 AM", fare: "₹780", capacity: "standing" },
    { id: 6, type: "Karnataka Sarige", from: "Bangalore", to: "Belgaum", departureTime: "10:00 PM", arrivalTime: "08:00 AM", fare: "₹650", capacity: "available" },
  ];
  
  type BusRoute = {
    id: number;
    type: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    fare: string;
    capacity: 'available' | 'standing' | 'overloaded';
  };

  const handleSearchBuses = () => {
    if (!departureCity || !destinationCity) {
      toast({
        title: "Please enter both departure and destination cities",
        description: "Both fields are required to search for buses",
        variant: "destructive",
      });
      return;
    }
    
    // Filter routes based on input
    // In real app, this would be an API call
    let filteredRoutes = busRoutes.filter(route => {
      const fromMatch = route.from.toLowerCase().includes(departureCity.toLowerCase());
      const toMatch = route.to.toLowerCase().includes(destinationCity.toLowerCase());
      return fromMatch && toMatch;
    });
    
    if (busType) {
      filteredRoutes = filteredRoutes.filter(route => route.type.includes(busType));
    }
    
    if (filteredRoutes.length === 0) {
      toast({
        title: "No buses found",
        description: "Try different locations or check spelling",
      });
      setSearchResults([]);
    } else {
      setSearchResults(filteredRoutes);
      toast({
        title: "Buses found",
        description: `Found ${filteredRoutes.length} buses matching your search`,
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
        return "Limited seats available";
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
                            value={departureCity}
                            onChange={(e) => setDepartureCity(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm block mb-1">To</label>
                          <input
                            type="text"
                            placeholder="Destination City"
                            className="border rounded-md p-2 w-full"
                            value={destinationCity}
                            onChange={(e) => setDestinationCity(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm block mb-1">Date</label>
                          <input
                            type="date"
                            className="border rounded-md p-2 w-full"
                            value={travelDate}
                            onChange={(e) => setTravelDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm block mb-1">Bus Type</label>
                          <select 
                            className="border rounded-md p-2 w-full"
                            value={busType}
                            onChange={(e) => setBusType(e.target.value)}
                          >
                            <option value="">Any Bus Type</option>
                            <option value="Airavat">Airavat</option>
                            <option value="Non-AC">Non-AC</option>
                            <option value="Sleeper">Sleeper</option>
                            <option value="Karnataka Sarige">Karnataka Sarige</option>
                          </select>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-karnataka-red mt-2"
                        onClick={handleSearchBuses}
                      >
                        Search Buses
                      </Button>
                      
                      {searchResults !== null && (
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-3">
                            {searchResults.length > 0 ? 'Available Buses' : 'No buses found'}
                          </h3>
                          
                          <div className="space-y-4">
                            {searchResults.map((route) => (
                              <div key={route.id} className="border rounded-lg p-3 bg-white">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{route.from} to {route.to}</span>
                                  <span className="bg-karnataka-red text-white px-2 py-1 rounded text-xs">
                                    {route.type}
                                  </span>
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
                                  className="w-full mt-2 border-karnataka-red text-karnataka-red hover:bg-karnataka-red/10"
                                >
                                  Book Ticket
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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
