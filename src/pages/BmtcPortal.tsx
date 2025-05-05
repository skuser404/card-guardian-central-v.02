
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BusFront, Map, Route, Navigation, CircleDot, FileText, User, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const BmtcPortal = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [searchResults, setSearchResults] = useState<BusRoute[] | null>(null);
  const [isKannada, setIsKannada] = useState(false);
  
  const recentRoutes = [
    { id: 1, name: "Majestic to Whitefield", nameKn: "ಮೆಜೆಸ್ಟಿಕ್‌ನಿಂದ ವೈಟ್‌ಫೀಲ್ಡ್", number: "500D", frequency: "10 mins", fare: "₹30", isAC: false, plateNumber: "KA-01-F-1234" },
    { id: 2, name: "KR Market to HSR Layout", nameKn: "ಕೆ.ಆರ್. ಮಾರ್ಕೆಟ್‌ನಿಂದ ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್", number: "368", frequency: "15 mins", fare: "₹25", isAC: false, plateNumber: "KA-01-F-5678" },
    { id: 3, name: "Shivajinagar to Electronic City", nameKn: "ಶಿವಾಜಿನಗರದಿಂದ ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ", number: "356CW", frequency: "12 mins", fare: "₹50", isAC: true, plateNumber: "KA-01-F-9012" },
    { id: 4, name: "Banashankari to ITPL", nameKn: "ಬನಶಂಕರಿಯಿಂದ ಐಟಿಪಿಎಲ್", number: "501D", frequency: "20 mins", fare: "₹45", isAC: true, plateNumber: "KA-01-F-3456" }
  ];
  
  // Define sample bus routes for demonstration
  const busRoutes: BusRoute[] = [
    { id: 1, number: "500D", from: "Majestic", to: "Whitefield", fromKn: "ಮೆಜೆಸ್ಟಿಕ್", toKn: "ವೈಟ್‌ಫೀಲ್ಡ್", departureTime: "10:15 AM", arrivalTime: "11:30 AM", fare: "₹30", capacity: "overloaded", isAC: false, plateNumber: "KA-01-F-1234" },
    { id: 2, number: "500D", from: "Majestic", to: "Whitefield", fromKn: "ಮೆಜೆಸ್ಟಿಕ್", toKn: "ವೈಟ್‌ಫೀಲ್ಡ್", departureTime: "10:30 AM", arrivalTime: "11:45 AM", fare: "₹30", capacity: "standing", isAC: false, plateNumber: "KA-01-F-2345" },
    { id: 3, number: "500D", from: "Majestic", to: "Whitefield", fromKn: "ಮೆಜೆಸ್ಟಿಕ್", toKn: "ವೈಟ್‌ಫೀಲ್ಡ್", departureTime: "10:45 AM", arrivalTime: "12:00 PM", fare: "₹30", capacity: "available", isAC: false, plateNumber: "KA-01-F-3456" },
    { id: 4, number: "368", from: "KR Market", to: "HSR Layout", fromKn: "ಕೆ.ಆರ್. ಮಾರ್ಕೆಟ್", toKn: "ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್", departureTime: "11:00 AM", arrivalTime: "12:15 PM", fare: "₹25", capacity: "overloaded", isAC: false, plateNumber: "KA-01-F-4567" },
    { id: 5, number: "368", from: "KR Market", to: "HSR Layout", fromKn: "ಕೆ.ಆರ್. ಮಾರ್ಕೆಟ್", toKn: "ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್", departureTime: "11:15 AM", arrivalTime: "12:30 PM", fare: "₹25", capacity: "standing", isAC: false, plateNumber: "KA-01-F-5678" },
    { id: 6, number: "356CW", from: "Shivajinagar", to: "Electronic City", fromKn: "ಶಿವಾಜಿನಗರ", toKn: "ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ", departureTime: "11:30 AM", arrivalTime: "12:45 PM", fare: "₹50", capacity: "available", isAC: true, plateNumber: "KA-01-F-6789" },
  ];
  
  type BusRoute = {
    id: number;
    number: string;
    from: string;
    to: string;
    fromKn?: string;
    toKn?: string;
    departureTime: string;
    arrivalTime: string;
    fare: string;
    capacity: 'available' | 'standing' | 'overloaded';
    isAC?: boolean;
    plateNumber: string;
  };

  const handleLanguageChange = (value: boolean) => {
    setIsKannada(value);
  };
  
  const handleFindRoutes = () => {
    if (!startPoint || !destination) {
      toast({
        title: isKannada ? "ದಯವಿಟ್ಟು ಪ್ರಾರಂಭ ಮತ್ತು ಗಮ್ಯಸ್ಥಾನಗಳನ್ನು ನಮೂದಿಸಿ" : "Please enter both starting point and destination",
        description: isKannada ? "ಮಾರ್ಗಗಳನ್ನು ಹುಡುಕಲು ಎರಡೂ ಕ್ಷೇತ್ರಗಳು ಅಗತ್ಯವಾಗಿವೆ" : "Both fields are required to search for routes",
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
        title: isKannada ? "ಯಾವುದೇ ಮಾರ್ಗಗಳು ಕಂಡುಬಂದಿಲ್ಲ" : "No routes found",
        description: isKannada ? "ಬೇರೆ ಸ್ಥಳಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಕಾಗುಣಿತವನ್ನು ಪರಿಶೀಲಿಸಿ" : "Try different locations or check spelling",
      });
      setSearchResults([]);
    } else {
      setSearchResults(filteredRoutes);
      toast({
        title: isKannada ? "ಮಾರ್ಗಗಳು ಕಂಡುಬಂದಿವೆ" : "Routes found",
        description: isKannada 
          ? `ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ${filteredRoutes.length} ಮಾರ್ಗಗಳು ಕಂಡುಬಂದಿವೆ` 
          : `Found ${filteredRoutes.length} routes matching your search`,
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
        return isKannada ? "ಅತಿ ಹೆಚ್ಚು ಜನರು" : "Overloaded";
      case 'standing':
        return isKannada ? "ನಿಂತುಕೊಳ್ಳಬಹುದು" : "Standing available";
      case 'available':
        return isKannada ? "ಕುರ್ಚಿಗಳು ಲಭ್ಯವಿವೆ" : "Seats available";
      default:
        return isKannada ? "ಅಜ್ಞಾತ" : "Unknown";
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
              className="hover:bg-karnataka-blue/10"
            >
              &larr; {isKannada ? "ಹಿಂದೆ" : "Back"}
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-karnataka-blue flex items-center">
              <BusFront className="mr-2 h-8 w-8 text-karnataka-blue" />
              {isKannada ? "ಬಿಎಂಟಿಸಿ ಸೇವೆಗಳು" : "BMTC Services"}
            </h1>
          </div>
          
          <Tabs defaultValue="routes" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="routes">{isKannada ? "ಮಾರ್ಗಗಳು" : "Routes"}</TabsTrigger>
              <TabsTrigger value="passes">{isKannada ? "ಬಸ್ ಪಾಸ್" : "Bus Passes"}</TabsTrigger>
              <TabsTrigger value="info">{isKannada ? "ಮಾಹಿತಿ" : "Information"}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="routes">
              {/* Route Finder moved above Recent Routes */}
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Map className="mr-2 h-5 w-5" />
                    {isKannada ? "ಮಾರ್ಗ ಹುಡುಕಾಟ" : "Route Finder"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="glassmorphism p-4 rounded-lg">
                    <p className="mb-4 text-sm text-center">
                      {isKannada 
                        ? "ಉತ್ತಮ ಬಸ್ ಮಾರ್ಗಗಳನ್ನು ಕಂಡುಹಿಡಿಯಲು ನಿಮ್ಮ ಪ್ರಾರಂಭ ಮತ್ತು ಮುಕ್ತಾಯ ಬಿಂದುಗಳನ್ನು ನಮೂದಿಸಿ"
                        : "Enter your start and end points to find the best bus routes"
                      }
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder={isKannada ? "ಪ್ರಾರಂಭ ಬಿಂದು" : "Starting Point"}
                        className="border rounded-md p-2 w-full"
                        value={startPoint}
                        onChange={(e) => setStartPoint(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder={isKannada ? "ಗಮ್ಯಸ್ಥಾನ" : "Destination"}
                        className="border rounded-md p-2 w-full"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full mt-4 bg-karnataka-blue"
                      onClick={handleFindRoutes}
                    >
                      {isKannada ? "ಮಾರ್ಗಗಳನ್ನು ಹುಡುಕಿ" : "Find Routes"}
                    </Button>
                    
                    {searchResults !== null && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-3">
                          {searchResults.length > 0 
                            ? isKannada ? 'ಲಭ್ಯವಿರುವ ಮಾರ್ಗಗಳು' : 'Available Routes'
                            : isKannada ? 'ಯಾವುದೇ ಮಾರ್ಗಗಳು ಕಂಡುಬಂದಿಲ್ಲ' : 'No routes found'
                          }
                        </h3>
                        
                        <div className="space-y-4">
                          {searchResults.map((route) => (
                            <div key={route.id} className="border rounded-lg p-3 bg-white">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">
                                  {isKannada 
                                    ? `${route.fromKn || route.from} ನಿಂದ ${route.toKn || route.to}`
                                    : `${route.from} to ${route.to}`
                                  }
                                </span>
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
                                  <span className="text-gray-600">
                                    {isKannada ? "ನಿರ್ಗಮನ:" : "Departure:"}
                                  </span> {route.departureTime}
                                </div>
                                <div>
                                  <span className="text-gray-600">
                                    {isKannada ? "ಆಗಮನ:" : "Arrival:"}
                                  </span> {route.arrivalTime}
                                </div>
                                <div>
                                  <span className="text-gray-600">
                                    {isKannada ? "ದರ:" : "Fare:"}
                                  </span> {route.fare}
                                </div>
                                <div className="flex items-center">
                                  <span className="text-gray-600 mr-1">
                                    {isKannada ? "ಸಾಮರ್ಥ್ಯ:" : "Capacity:"}
                                  </span>
                                  <span className="flex items-center">
                                    <CircleDot className={`h-4 w-4 mr-1 ${getCapacityColor(route.capacity)}`} />
                                    {getCapacityText(route.capacity)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="text-sm mt-2 border-t pt-2">
                                <span className="text-gray-600">
                                  {isKannada ? "ವಾಹನ ಸಂಖ್ಯೆ:" : "Bus Number:"}
                                </span>
                                <span className="ml-1 font-medium">{route.plateNumber}</span>
                              </div>
                              
                              <Button 
                                variant="outline"
                                size="sm"
                                className="w-full mt-2 border-karnataka-blue text-karnataka-blue hover:bg-karnataka-blue/10"
                              >
                                {isKannada ? "ಟಿಕೆಟ್ ಕಾಯ್ದಿರಿಸಿ" : "Book Ticket"}
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
                    {isKannada ? "ಇತ್ತೀಚಿನ ಮಾರ್ಗಗಳು" : "Recent Routes"}
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
                          <span className="font-medium">
                            {isKannada ? route.nameKn : route.name}
                          </span>
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
                            <span>{isKannada ? "ಆವರ್ತನೆ:" : "Frequency:"}</span>
                            <span>{route.frequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{isKannada ? "ದರ:" : "Fare:"}</span>
                            <span>{route.fare}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{isKannada ? "ವಾಹನ ಸಂಖ್ಯೆ:" : "Bus Number:"}</span>
                            <span>{route.plateNumber}</span>
                          </div>
                        </div>
                        
                        {selectedRoute === route.name && (
                          <div className="mt-3 border-t pt-2">
                            <p className="text-sm mb-2">
                              {isKannada ? "ಮುಂದಿನ ಬಸ್ಸುಗಳು:" : "Next buses:"}
                            </p>
                            <div className="flex gap-2">
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {isKannada ? "5 ನಿಮಿಷಗಳು" : "5 mins"}
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {isKannada ? "15 ನಿಮಿಷಗಳು" : "15 mins"}
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {isKannada ? "25 ನಿಮಿಷಗಳು" : "25 mins"}
                              </span>
                            </div>
                            <Button 
                              size="sm" 
                              className="w-full mt-2 bg-karnataka-blue"
                            >
                              <Navigation className="mr-1 h-4 w-4" />
                              {isKannada ? "ಬಸ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ" : "Track Bus"}
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
                        <User className="mr-2 h-5 w-5 text-karnataka-blue" />
                        {isKannada ? "ವಿದ್ಯಾರ್ಥಿ ಬಸ್ ಪಾಸ್ ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ" : "Student Bus Pass Application Process"}
                      </h3>
                      
                      <div className="glassmorphism p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{isKannada ? "ಅರ್ಹತಾ ಮಾನದಂಡಗಳು" : "Eligibility Criteria"}</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>{isKannada ? "ಮಾನ್ಯತೆ ಪಡೆದ ಶೈಕ್ಷಣಿಕ ಸಂಸ್ಥೆಗಳಲ್ಲಿ ದಾಖಲಾದ ವಿದ್ಯಾರ್ಥಿಗಳು" : "Students enrolled in recognized educational institutions"}</li>
                          <li>{isKannada ? "ಶೈಕ್ಷಣಿಕ ವರ್ಷ 2024-25ಕ್ಕೆ ಮಾನ್ಯ" : "Valid for the academic year 2024-25"}</li>
                          <li>{isKannada ? "BMTC ಕಾರ್ಯಾಚರಣೆಯ ಪ್ರದೇಶದೊಳಗಿನ ನಿವಾಸ" : "Residency within BMTC operational area"}</li>
                        </ul>
                      </div>
                      
                      <div className="glassmorphism p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{isKannada ? "ಅರ್ಜಿ ವಿಧಾನಗಳು" : "Application Methods"}</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>{isKannada ? "ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್ ಮೂಲಕ ಆನ್‌ಲೈನ್" : "Online through Seva Sindhu portal"}</li>
                          <li>{isKannada ? "ಬೆಂಗಳೂರು ವನ್ ಕೇಂದ್ರಗಳಲ್ಲಿ" : "At BangaloreOne centers"}</li>
                          <li>{isKannada ? "ಶೈಕ್ಷಣಿಕ ಸಂಸ್ಥೆಗಳ ಮೂಲಕ" : "Through educational institutions"}</li>
                        </ul>
                      </div>
                      
                      <div className="glassmorphism p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{isKannada ? "ಅಗತ್ಯ ದಾಖಲೆಗಳು" : "Required Documents"}</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>{isKannada ? "ಆಧಾರ್ ಕಾರ್ಡ್" : "Aadhaar Card"}</li>
                          <li>{isKannada ? "ಬಿಳಿ ಹಿನ್ನೆಲೆಯೊಂದಿಗೆ ಇತ್ತೀಚಿನ ಪಾಸ್‌ಪೋರ್ಟ್-ಅಳತೆಯ ಭಾವಚಿತ್ರ" : "Recent passport-size photograph with white background"}</li>
                          <li>{isKannada ? "ಶೈಕ್ಷಣಿಕ ಸಂಸ್ಥೆಯಿಂದ ಪ್ರವೇಶ/ಶುಲ್ಕ ರಸೀದಿ" : "Admission/fee receipt from educational institution"}</li>
                          <li>{isKannada ? "ಸಂಸ್ಥೆಯ ID ಕಾರ್ಡ್" : "Institute ID card"}</li>
                        </ul>
                      </div>
                      
                      <div className="glassmorphism p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{isKannada ? "ಹಂತ ಹಂತದ ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ" : "Step-by-Step Application Process"}</h4>
                        <div className="space-y-3">
                          <div>
                            <h5 className="text-sm font-medium">{isKannada ? "ಸೇವಾ ಸಿಂಧು ಮೂಲಕ ಆನ್‌ಲೈನ್ ಅರ್ಜಿ" : "Online Application through Seva Sindhu"}</h5>
                            <ol className="list-decimal list-inside space-y-1 text-sm ml-2">
                              <li>{isKannada ? "https://sevasindhu.karnataka.gov.in ಗೆ ಭೇಟಿ ನೀಡಿ" : "Visit https://sevasindhu.karnataka.gov.in"}</li>
                              <li>{isKannada ? "ಆಧಾರ್ ಸಂಖ್ಯೆಯನ್ನು ಬಳಸಿ ಲಾಗಿನ್ ಮಾಡಿ" : "Login using Aadhaar number"}</li>
                              <li>{isKannada ? "ವೈಯಕ್ತಿಕ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ವಿವರಗಳೊಂದಿಗೆ ಅಪ್ಲಿಕೇಶನ್ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ" : "Fill application form with personal and educational details"}</li>
                              <li>{isKannada ? "ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ" : "Upload required documents"}</li>
                              <li>{isKannada ? "ಅಪ್ಲಿಕೇಶನ್ ಸಲ್ಲಿಸಿ" : "Submit application"}</li>
                            </ol>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium">{isKannada ? "ಬೆಂಗಳೂರು ವನ್ ಕೇಂದ್ರಗಳಲ್ಲಿ ಅರ್ಜಿ" : "Application at BangaloreOne Centers"}</h5>
                            <ol className="list-decimal list-inside space-y-1 text-sm ml-2">
                              <li>{isKannada ? "ಅಗತ್ಯ ದಾಖಲೆಗಳೊಂದಿಗೆ ಯಾವುದೇ ಬೆಂಗಳೂರು ವನ್ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ" : "Visit any BangaloreOne center with required documents"}</li>
                              <li>{isKannada ? "ಅಪ್ಲಿಕೇಶನ್ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ" : "Fill application form"}</li>
                              <li>{isKannada ? "₹30 ಸೇವಾ ಶುಲ್ಕವನ್ನು ಪಾವತಿಸಿ" : "Pay service charge of Rs. 30"}</li>
                              <li>{isKannada ? "ಅಪ್ಲಿಕೇಶನ್ ಸಲ್ಲಿಸಿ" : "Submit application"}</li>
                            </ol>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium">{isKannada ? "ಪಾಸ್ ಸಂಗ್ರಹ" : "Collection of Pass"}</h5>
                            <ol className="list-decimal list-inside space-y-1 text-sm ml-2">
                              <li>{isKannada ? "ನಿಗದಿಪಡಿಸಿದ BMTC ಬಸ್ ನಿಲ್ದಾಣಗಳಿಗೆ ಭೇಟಿ ನೀಡಿ" : "Visit designated BMTC bus stations"}</li>
                              <li>{isKannada ? "ನಿಗದಿತ ಶುಲ್ಕವನ್ನು ಪಾವತಿಸಿ (ನಗದು/ಕಾರ್ಡ್/UPI)" : "Pay the prescribed fee (cash/card/UPI)"}</li>
                              <li>{isKannada ? "ನಿಮ್ಮ ಪಾಸ್ ಸಂಗ್ರಹಿಸಿ" : "Collect your pass"}</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Worker Pass Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center">
                        <Users className="mr-2 h-5 w-5 text-karnataka-blue" />
                        {isKannada ? "ಕಾರ್ಮಿಕ/ಮಾಸಿಕ ಪಾಸ್ ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ" : "Worker/Monthly Pass Application Process"}
                      </h3>
                      
                      <div className="glassmorphism p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{isKannada ? "ಲಭ್ಯವಿರುವ ಪಾಸ್ ಪ್ರಕಾರಗಳು" : "Types of Passes Available"}</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>{isKannada ? "ಸಾಮಾನ್ಯ ಸೇವೆ ಮಾಸಿಕ ಪಾಸ್: ₹1,200" : "Ordinary service monthly pass: Rs. 1,200"}</li>
                          <li>{isKannada ? "ಹಿರಿಯ ನಾಗರಿಕ ಸಾಮಾನ್ಯ ಸೇವೆ ಮಾಸಿಕ ಪಾಸ್: ₹1,080" : "Senior citizen ordinary service monthly pass: Rs. 1,080"}</li>
                          <li>{isKannada ? "ನೈಸ್ ರಸ್ತೆ ಮಾಸಿಕ ಪಾಸ್ (ಟೋಲ್ ಸೇರಿದಂತೆ): ₹2,350" : "Nice Road Monthly Pass (inclusive of toll): Rs. 2,350"}</li>
                          <li>{isKannada ? "ವಜ್ರ ಗೋಲ್ಡ್ ಮಾಸಿಕ ಪಾಸ್: ₹2,000" : "Vajra Gold Monthly pass: Rs. 2,000"}</li>
                        </ul>
                      </div>
                      
                      <div className="glassmorphism p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{isKannada ? "ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ" : "Application Process"}</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>{isKannada ? "BMTC ಬಸ್ ನಿಲ್ದಾಣದ ಕೌಂಟರ್‌ಗಳಿಗೆ ಅಥವಾ ಫ್ರಾಂಚೈಸಿ ಕೌಂಟರ್‌ಗಳಿಗೆ ಭೇಟಿ ನೀಡಿ" : "Visit BMTC bus stand counters or franchisee counters"}</li>
                          <li>{isKannada ? "ಮಾನ್ಯ ID ಪುರಾವೆಯನ್ನು ಸಲ್ಲಿಸಿ (PAN ಕಾರ್ಡ್, ಡ್ರೈವಿಂಗ್ ಲೈಸೆನ್ಸ್, ಮತದಾರ ID, ಪಾಸ್‌ಪೋರ್ಟ್, ಇತ್ಯಾದಿ)" : "Submit valid ID proof (PAN card, driving license, voter ID, passport, etc.)"}</li>
                          <li>{isKannada ? "ಅಪ್ಲಿಕೇಶನ್ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ" : "Fill application form"}</li>
                          <li>{isKannada ? "ನಿಗದಿತ ಶುಲ್ಕವನ್ನು ಪಾವತಿಸಿ" : "Pay the prescribed fee"}</li>
                          <li>{isKannada ? "ನಿಮ್ಮ ಪಾಸ್ ಸಂಗ್ರಹಿಸಿ" : "Collect your pass"}</li>
                        </ol>
                      </div>
                      
                      <div className="glassmorphism p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{isKannada ? "ನಿರ್ಮಾಣ ಕಾರ್ಮಿಕರಿಗಾಗಿ" : "For Construction Workers"}</h4>
                        <p className="text-sm mb-2">{isKannada ? "ಬೆಂಗಳೂರಿನ ಶಾಶ್ವತ ನಿವಾಸಿಗಳಾಗಿರುವ ನೋಂದಾಯಿತ ನಿರ್ಮಾಣ ಕಾರ್ಮಿಕರು ಉಚಿತ ಬಸ್ ಪಾಸ್‌ಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು" : "Registered construction workers who are permanent residents of Bengaluru can apply for free bus passes"}</p>
                        <p className="text-sm">{isKannada ? "ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್ ಮೂಲಕ ಗ್ರಾಮ ಒನ್ ಅಥವಾ ಕರ್ನಾಟಕ ಒನ್ ಕೇಂದ್ರಗಳ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" : "Apply through Grama One or Karnataka One centers via Seva Sindhu portal"}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <Button 
                        variant="outline" 
                        className="border-karnataka-blue text-karnataka-blue hover:bg-karnataka-blue/10"
                      >
                        {isKannada ? "ಪಾಸ್ ಫಾರ್ಮ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ" : "Download Pass Form"}
                      </Button>
                    </div>
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
                    <h3 className="font-medium mb-2">{isKannada ? "ಕಾರ್ಯಾಚರಣೆಯ ಸಮಯ" : "Operation Hours"}</h3>
                    <p className="text-sm">{isKannada ? "ಬೆಳಗ್ಗೆ 5:00 ರಿಂದ ರಾತ್ರಿ 11:00 ರವರೆಗೆ" : "5:00 AM to 11:00 PM"}</p>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">{isKannada ? "ಸಂಪರ್ಕ ಮಾಹಿತಿ" : "Contact Information"}</h3>
                    <p className="text-sm">{isKannada ? "ಸಹಾಯವಾಣಿ: 1800-425-1663" : "Helpline: 1800-425-1663"}</p>
                    <p className="text-sm">{isKannada ? "ಇಮೇಲ್: info@mybmtc.com" : "Email: info@mybmtc.com"}</p>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg">
                    <h3 className="font-medium mb-2">{isKannada ? "ಕಳೆದು ಹೋದ & ಸಿಕ್ಕಿದ" : "Lost & Found"}</h3>
                    <p className="text-sm">
                      {isKannada 
                        ? "ಕಳೆದುಹೋದ ವಸ್ತುಗಳಿಗಾಗಿ ಹತ್ತಿರದ BMTC ಡಿಪೋಗೆ ಸಂಪರ್ಕಿಸಿ ಅಥವಾ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ."
                        : "Contact the nearest BMTC depot or call the helpline for lost items."
                      }
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

