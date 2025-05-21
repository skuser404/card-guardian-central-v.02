
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Bus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BusStop {
  id: string;
  name: string;
  location: string;
}

interface BusInfo {
  id: string;
  bus_number: string;
  type: string;
  route: string;
  status: string;
}

interface BusTrackerProps {
  isKannada: boolean;
}

const KsrtcBusTracker: React.FC<BusTrackerProps> = ({ isKannada }) => {
  const [loading, setLoading] = useState(true);
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const [availableBuses, setAvailableBuses] = useState<BusInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchBusStops = async () => {
      try {
        const { data, error } = await supabase
          .from("bus_stops")
          .select("*")
          .order("name");

        if (error) {
          throw error;
        }

        setBusStops(data as BusStop[]);
      } catch (error) {
        console.error("Error fetching bus stops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusStops();
  }, []);

  const handleSearch = async () => {
    if (!selectedStop) return;
    
    setIsSearching(true);
    
    try {
      // Simulate a search with delay
      setTimeout(async () => {
        // Fetch buses that are active
        const { data, error } = await supabase
          .from("buses")
          .select("*")
          .eq("status", "active")
          .limit(5);
          
        if (error) {
          throw error;
        }

        setAvailableBuses(data as BusInfo[]);
        setIsSearching(false);
      }, 1200);
    } catch (error) {
      console.error("Error searching for buses:", error);
      setIsSearching(false);
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="py-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-karnataka-red"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bus className="h-5 w-5 text-karnataka-red" />
          {isKannada ? "ಕೆಎಸ್ಆರ್‌ಟಿಸಿ ಬಸ್ ಟ್ರ್ಯಾಕರ್" : "KSRTC Bus Tracker"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {isKannada ? "ಬಸ್ ನಿಲ್ದಾಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ" : "Select Bus Stop"}
          </label>
          <Select onValueChange={setSelectedStop}>
            <SelectTrigger>
              <SelectValue placeholder={isKannada ? "ನಿಲ್ದಾಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ" : "Select a stop"} />
            </SelectTrigger>
            <SelectContent>
              {busStops.map(stop => (
                <SelectItem key={stop.id} value={stop.id}>
                  {stop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSearch}
          disabled={!selectedStop || isSearching}
          className="w-full bg-karnataka-red hover:bg-karnataka-red/90"
        >
          {isSearching ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
              {isKannada ? "ಹುಡುಕುತ್ತಿದೆ..." : "Searching..."}
            </span>
          ) : (
            <>{isKannada ? "ಬಸ್ಸುಗಳನ್ನು ಹುಡುಕಿ" : "Search Buses"}</>
          )}
        </Button>

        {availableBuses.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium">
              {isKannada ? "ಲಭ್ಯವಿರುವ ಬಸ್ಸುಗಳು" : "Available Buses"}
            </h3>
            <div className="space-y-3">
              {availableBuses.map(bus => (
                <div key={bus.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                  <div className="h-10 w-10 rounded-full bg-karnataka-red/10 flex items-center justify-center mr-3">
                    <Bus className="h-6 w-6 text-karnataka-red" />
                  </div>
                  <div>
                    <p className="font-medium">{bus.bus_number}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{bus.route || (isKannada ? "ಮಾರ್ಗ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ" : "Route info not available")}</span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bus.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {bus.status === 'active' 
                        ? (isKannada ? "ಸಕ್ರಿಯ" : "Active") 
                        : (isKannada ? "ನಿಷ್ಕ್ರಿಯ" : "Inactive")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KsrtcBusTracker;
