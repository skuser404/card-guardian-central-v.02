
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Train, Map, Navigation, CircleDot } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const MetroPortal = () => {
  const navigate = useNavigate();
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState<MetroStation[] | null>(null);
  
  const metroLines = [
    { id: 1, name: "Purple Line", stations: "Baiyappanahalli to Kengeri", status: "Normal", frequency: "7 mins" },
    { id: 2, name: "Green Line", stations: "Nagasandra to Silk Institute", status: "Normal", frequency: "8 mins" },
    { id: 3, name: "Yellow Line", stations: "RV Road to Bommasandra", status: "Under Construction", frequency: "N/A" },
    { id: 4, name: "Pink Line", stations: "Kalena Agrahara to Nagawara", status: "Under Construction", frequency: "N/A" }
  ];
  
  // Sample metro stations for demonstration
  const metroStations: MetroStation[] = [
    { id: 1, name: "Majestic", lines: ["Purple Line", "Green Line"], nearbyLocation: "City Railway Station", distance: "0.2km", capacity: "overloaded" },
    { id: 2, name: "MG Road", lines: ["Purple Line"], nearbyLocation: "MG Road Boulevard", distance: "0.1km", capacity: "standing" },
    { id: 3, name: "Indiranagar", lines: ["Purple Line"], nearbyLocation: "100 Feet Road", distance: "0.3km", capacity: "available" },
    { id: 4, name: "Yelachenahalli", lines: ["Green Line"], nearbyLocation: "Banashankari", distance: "0.5km", capacity: "available" },
    { id: 5, name: "Rajajinagar", lines: ["Green Line"], nearbyLocation: "Rajajinagar Industrial Area", distance: "0.4km", capacity: "standing" },
    { id: 6, name: "Baiyappanahalli", lines: ["Purple Line"], nearbyLocation: "Old Madras Road", distance: "0.3km", capacity: "overloaded" },
  ];
  
  type MetroStation = {
    id: number;
    name: string;
    lines: string[];
    nearbyLocation: string;
    distance: string;
    capacity: 'available' | 'standing' | 'overloaded';
  };
  
  const handleFindStations = () => {
    if (!location) {
      toast({
        title: "Please enter a location",
        description: "Location is required to search for stations",
        variant: "destructive",
      });
      return;
    }
    
    // Filter stations based on input
    // In real app, this would be an API call
    const filteredStations = metroStations.filter(station => {
      return (
        station.name.toLowerCase().includes(location.toLowerCase()) ||
        station.nearbyLocation.toLowerCase().includes(location.toLowerCase())
      );
    });
    
    if (filteredStations.length === 0) {
      toast({
        title: "No stations found",
        description: "Try different location or check spelling",
      });
      setSearchResults([]);
    } else {
      setSearchResults(filteredStations);
      toast({
        title: "Stations found",
        description: `Found ${filteredStations.length} stations near your location`,
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
        return "Crowded";
      case 'standing':
        return "Standing room only";
      case 'available':
        return "Seating available";
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
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <Button 
                      className="w-full mt-4 bg-karnataka-yellow text-black"
                      onClick={handleFindStations}
                    >
                      Find Stations
                    </Button>
                    
                    {searchResults !== null && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-3">
                          {searchResults.length > 0 ? 'Nearby Stations' : 'No stations found'}
                        </h3>
                        
                        <div className="space-y-4">
                          {searchResults.map((station) => (
                            <div key={station.id} className="border rounded-lg p-3 bg-white">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{station.name}</span>
                                <div className="flex gap-1">
                                  {station.lines.map((line, idx) => (
                                    <span 
                                      key={idx}
                                      className={`px-2 py-1 rounded text-xs ${
                                        line.includes("Purple") ? "bg-purple-100 text-purple-800" : 
                                        line.includes("Green") ? "bg-green-100 text-green-800" :
                                        line.includes("Yellow") ? "bg-yellow-100 text-yellow-800" :
                                        "bg-pink-100 text-pink-800"
                                      }`}
                                    >
                                      {line.split(" ")[0]}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-600">Near:</span> {station.nearbyLocation}
                                </div>
                                <div>
                                  <span className="text-gray-600">Distance:</span> {station.distance}
                                </div>
                                <div className="flex items-center col-span-2">
                                  <span className="text-gray-600 mr-1">Current Status:</span>
                                  <span className="flex items-center">
                                    <CircleDot className={`h-3 w-3 mr-1 ${getCapacityColor(station.capacity)}`} />
                                    {getCapacityText(station.capacity)}
                                  </span>
                                </div>
                              </div>
                              
                              <Button 
                                variant="outline"
                                size="sm"
                                className="w-full mt-2 border-karnataka-yellow text-black hover:bg-karnataka-yellow/10"
                              >
                                Get Directions
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
