import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bus, MapPin, Calendar, CircleDot, FileText, User, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const KsrtcPortal = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [busType, setBusType] = useState("");
  const [searchResults, setSearchResults] = useState<BusRoute[] | null>(null);
  const [isKannada, setIsKannada] = useState(false);
  
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

  const handleLanguageChange = (value: boolean) => {
    setIsKannada(value);
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
        <Header isKannada={isKannada} onLanguageChange={handleLanguageChange} />
        
        <main className="my-6">
          <div className="flex items-center gap-2 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="hover:bg-karnataka-red/10"
            >
              &larr; {isKannada ? "ಹಿಂದೆ" : "Back"}
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-karnataka-red flex items-center">
              <Bus className="mr-2 h-8 w-8 text-karnataka-red" />
              {isKannada ? "ಕೆಎಸ್ಆರ್‌ಟಿಸಿ ಸೇವೆಗಳು" : "KSRTC Services"}
            </h1>
          </div>
          
          <Tabs defaultValue="routes" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="routes">{isKannada ? "ಮಾರ್ಗಗಳು" : "Routes"}</TabsTrigger>
              <TabsTrigger value="booking">{isKannada ? "ಬುಕ್ಕಿಂಗ್" : "Booking"}</TabsTrigger>
              <TabsTrigger value="info">{isKannada ? "ಮಾಹಿತಿ" : "Information"}</TabsTrigger>
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
              
              {/* Add Bus Pass Guide here */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    {isKannada ? "ಬಸ್ ಪಾಸ್ ಮಾರ್ಗದರ್ಶಿ" : "Bus Pass Guide"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Student Pass Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center">
                        <User className="mr-2 h-5 w-5 text-karnataka-red" />
                        {isKannada ? "ವಿದ್ಯಾರ್ಥಿ ಬಸ್ ಪಾಸ್ ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ" : "Student Bus Pass Application Process"}
                      </h3>
                      
                      <div className="glassmorphism p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{isKannada ? "ಶುಲ್ಕ ರಚನೆ" : "Fee Structure"}</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>{isKannada ? "ಪ್ರಾಥಮಿಕ ಶಾಲೆ: ₹150 (100 + 50)" : "Primary school: Rs. 150 (100 + 50)"}</li>
                          <li>{isKannada ? "ಹೈಸ್ಕೂಲ್ ಹುಡುಗರು: ₹750 (600 + 100 + 50)" : "High school boys: Rs. 750 (600 + 100 + 50)"}</li>
                          <li>{isKannada ? "ಹೈಸ್ಕೂಲ್ ಹುಡುಗಿಯರು: ₹550 (400 + 100 + 50)" : "High school girls: Rs. 550 (400 + 100 + 50)"}</li>
                        </ul>
                      </div>
                      
                      <div className="glassmorphism p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{isKannada ? "ಅಗತ್ಯ ದಾಖಲೆಗಳು" : "Required Documents"}</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>{isKannada ? "ವಾಸಸ್ಥಾನ ಪ್ರಮಾಣಪತ್ರ" : "Domicile certificate"}</li>
                          <li>{isKannada ? "ಅಧ್ಯಯನ ಪ್ರಮಾಣಪತ್ರ" : "Study certificate"}</li>
                          <li>{isKannada ? "ಶುಲ್ಕ ರಸೀದಿ" : "Fee receipt"}</li>
                          <li>{isKannada ? "ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (SC/ST ರಿಯಾಯಿತಿಗಳಿಗೆ)" : "Caste certificate (for SC/ST discounts)"}</li>
                          <li>{isKannada ? "ಆಧಾರ್ ಕಾರ್ಡ್" : "Aadhaar card"}</li>
                          <li>{isKannada ? "ಫೋಟೋ" : "Photo"}</li>
                        </ul>
                      </div>
                      
                      <div className="glassmorphism p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{isKannada ? "ಅರ್ಜಿ ಹಂತಗಳು" : "Application Steps"}</h4>
                        <div className="space-y-3">
                          <div>
                            <h5 className="text-sm font-medium">{isKannada ? "ಆನ್‌ಲೈನ್ ಅರ್ಜಿ" : "Online Application"}</h5>
                            <ol className="list-decimal list-inside space-y-1 text-sm ml-2">
                              <li>{isKannada ? "ವಿದ್ಯಾರ್ಥಿ ಆನ್‌ಲೈನ್ ರಿಯಾಯಿತಿ ನೋಂದಣಿ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ (https://concessionksrtc.com)" : "Visit Student Online Concession Registration portal (https://concessionksrtc.com)"}</li>
                              <li>{isKannada ? "ವೈಯಕ್ತಿಕ ಮತ್ತು ಸಂಸ್ಥೆಯ ವಿವರಗಳೊಂದಿಗೆ ನೋಂದಾಯಿಸಿ" : "Register with personal and institution details"}</li>
                              <li>{isKannada ? "ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ" : "Upload required documents"}</li>
                              <li>{isKannada ? "ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ" : "Submit application"}</li>
                            </ol>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium">{isKannada ? "ಪಾಸ್ ಸಂಗ್ರಹ" : "Pass Collection"}</h5>
                            <ol className="list-decimal list-inside space-y-1 text-sm ml-2">
                              <li>{isKannada ? "ನಿಗದಿಪಡಿಸಿದ KSRTC ಬಸ್ ನಿಲ್ದಾಣಗಳಿಗೆ ಭೇಟಿ ನೀಡಿ" : "Visit designated KSRTC bus stands"}</li>
                              <li>{isKannada ? "ನಿಗದಿತ ಶುಲ್ಕವನ್ನು ಪಾವತಿಸಿ" : "Pay the prescribed fee"}</li>
                              <li>{isKannada ? "ನಿಮ್ಮ ಪಾಸ್ ಸಂಗ್ರಹಿಸಿ" : "Collect your pass"}</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Worker Pass Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center">
                        <Users className="mr-2 h-5 w-5 text-karnataka-red" />
                        {isKannada ? "ಕಾರ್ಮಿಕ/ಮಾಸಿಕ ಪಾಸ್ ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ" : "Worker/Monthly Pass Application Process"}
                      </h3>
                      
                      <div className="glassmorphism p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{isKannada ? "ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ" : "Application Process"}</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>{isKannada ? "ಯಾವುದೇ KSRTC ಬಸ್ ನಿಲ್ದಾಣಕ್ಕೆ ಭೇಟಿ ನೀಡಿ" : "Visit any KSRTC bus station"}</li>
                          <li>{isKannada ? "ಮಾನ್ಯ ID ಪುರಾವೆಯನ್ನು ಒದಗಿಸಿ" : "Present valid ID proof"}</li>
                          <li>{isKannada ? "ಅಪ್ಲಿಕೇಶನ್ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ" : "Fill application form"}</li>
                          <li>{isKannada ? "ನಿಗದಿತ ಶುಲ್ಕವನ್ನು ಪಾವತಿಸಿ" : "Pay the prescribed fee"}</li>
                          <li>{isKannada ? "ನಿಮ್ಮ ಪಾಸ್ ಸಂಗ್ರಹಿಸಿ (KSRTC-ನೀಡಿದ ID ಕಾರ್ಡ್‌ನೊಂದಿಗೆ ಮಾತ್ರ ಮಾನ್ಯ)" : "Collect your pass (valid only with KSRTC-issued ID card)"}</li>
                        </ol>
                      </div>
                      
                      <div className="glassmorphism p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{isKannada ? "ನಿರ್ಮಾಣ ಕಾರ್ಮಿಕರಿಗಾಗಿ" : "For Construction Workers"}</h4>
                        <p className="text-sm mb-2">{isKannada ? "ನೋಂದಾಯಿತ ನಿರ್ಮಾಣ ಕಾರ್ಮಿಕರಿಗೆ ಉಚಿತ ಬಸ್ ಪಾಸ್‌ಗಳು ಲಭ್ಯವಿವೆ" : "Free bus passes available for registered construction workers"}</p>
                        <p className="text-sm">{isKannada ? "ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್ ಮೂಲಕ ಗ್ರಾಮ ಒನ್ ಅಥವಾ ಕರ್ನಾಟಕ ಒನ್ ಕೇಂದ್ರಗಳ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" : "Apply through Grama One or Karnataka One centers via Seva Sindhu portal"}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <Button 
                        variant="outline" 
                        className="border-karnataka-red text-karnataka-red hover:bg-karnataka-red/10"
                      >
                        {isKannada ? "ಪಾಸ್ ಫಾರ್ಮ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ" : "Download Pass Form"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Track Your Bus Section */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    {isKannada ? "ನಿಮ್ಮ ಬಸ್ ಅನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ" : "Track Your Bus"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="glassmorphism p-4 rounded-lg">
                    <input
                      type="text"
                      placeholder={isKannada ? "PNR ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ" : "Enter PNR Number"}
                      className="border rounded-md p-2 w-full"
                    />
                    <Button className="w-full mt-4 bg-karnataka-red">{isKannada ? "ಬಸ್ ಅನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ" : "Track Bus"}</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>{isKannada ? "ಸೇವಾ ಮಾಹಿತಿ" : "Service Information"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="glassmorphism p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">{isKannada ? "ಲಗೇಜ್ ನೀತಿ" : "Baggage Policy"}</h3>
                    <p className="text-sm">{isKannada ? "ಪ್ರತಿ ಪ್ರಯಾಣಿಕರಿಗೆ 15 ಕೆಜಿ ವರೆಗೆ ಲಗೇಜ್ ಅನುಮತಿಸಲಾಗಿದೆ" : "Up to 15kg luggage allowed per passenger"}</p>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">{isKannada ? "ಸಂಪರ್ಕ ಮಾಹಿತಿ" : "Contact Information"}</h3>
                    <p className="text-sm">{isKannada ? "ಸಹಾಯವಾಣಿ: 1800-425-8844" : "Helpline: 1800-425-8844"}</p>
                    <p className="text-sm">{isKannada ? "ಇಮೇಲ್: helpline@ksrtc.in" : "Email: helpline@ksrtc.in"}</p>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg">
                    <h3 className="font-medium mb-2">{isKannada ? "ರದ್ದತಿ ನೀತಿ" : "Cancellation Policy"}</h3>
                    <div className="text-sm">
                      <p className="mb-1">• {isKannada ? "ನಿರ್ಗಮನಕ್ಕೆ 2+ ಗಂಟೆಗಳ ಮೊದಲು: 25% ಶುಲ್ಕ" : "2+ hours before departure: 25% charge"}</p>
                      <p className="mb-1">• {isKannada ? "30 ನಿಮಿಷಗಳು - 2 ಗಂಟೆಗಳು: 50% ಶುಲ್ಕ" : "30 mins - 2 hours: 50% charge"}</p>
                      <p className="mb-1">• {isKannada ? "30 ನಿಮಿಷಗಳಿಗಿಂತ ಕಡಿಮೆ: ಯಾವುದೇ ಮರುಪಾವತಿ ಇಲ್ಲ" : "Less than 30 mins: No refund"}</p>
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
