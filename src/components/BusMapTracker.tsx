
import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Users, Clock, CalendarClock, Bus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample bus routes data
const busRoutes = [
  {
    id: "route-1",
    busNumber: "KA-01-F-1234",
    capacity: 36,
    seatsFilled: 22,
    type: "AC Sleeper",
    category: "Express",
    stops: [
      { name: "Majestic", time: "08:00", coordinates: [77.5732, 12.9766] },
      { name: "Silk Board", time: "08:45", coordinates: [77.6226, 12.9173] },
      { name: "Electronic City", time: "09:30", coordinates: [77.6702, 12.8455] }
    ],
    travelGuide: "Student discount available with valid ID."
  },
  {
    id: "route-2",
    busNumber: "KA-01-F-5678",
    capacity: 42,
    seatsFilled: 28,
    type: "Non-AC Seater",
    category: "Ordinary",
    stops: [
      { name: "Majestic", time: "09:15", coordinates: [77.5732, 12.9766] },
      { name: "Hebbal", time: "10:00", coordinates: [77.5952, 13.0355] },
      { name: "Airport", time: "10:45", coordinates: [77.7085, 13.1989] }
    ],
    travelGuide: "Government employee concession available."
  }
];

interface BusMapTrackerProps {
  isKannada?: boolean;
  selectedBusId?: string;
}

const BusMapTracker: React.FC<BusMapTrackerProps> = ({ 
  isKannada = false,
  selectedBusId
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [busMarkers, setBusMarkers] = useState<mapboxgl.Marker[]>([]);
  const [initialized, setInitialized] = useState(false);
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || initialized) return;

    // Initialize mapbox with a temporary token - in production, this should be stored in environment variables
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtcGxlbWFwIiwiYSI6ImNsb3ZhbGlkdG9rZW4ifQ.notarealtoken123456789';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [77.5946, 12.9716], // Bangalore center coordinates
      zoom: 10
    });

    map.current.on('load', () => {
      setLoading(false);
      setInitialized(true);

      if (selectedBusId) {
        const foundRoute = busRoutes.find(route => route.id === selectedBusId || route.busNumber === selectedBusId);
        if (foundRoute) {
          setSelectedRoute(foundRoute);
          displayRouteOnMap(foundRoute);
        }
      }
    });

    return () => {
      busMarkers.forEach(marker => marker.remove());
      if (map.current) map.current.remove();
    };
  }, []);

  // When selected bus changes
  useEffect(() => {
    if (!map.current || !initialized) return;
    
    // Clear previous markers
    busMarkers.forEach(marker => marker.remove());
    setBusMarkers([]);

    if (!selectedBusId) return;

    const foundRoute = busRoutes.find(route => route.id === selectedBusId || route.busNumber === selectedBusId);
    if (foundRoute) {
      setSelectedRoute(foundRoute);
      displayRouteOnMap(foundRoute);
    }
  }, [selectedBusId, initialized]);

  // Display route on map
  const displayRouteOnMap = (route: any) => {
    if (!map.current) return;

    // Clear previous markers
    busMarkers.forEach(marker => marker.remove());
    
    // Create new markers for each stop
    const newMarkers: mapboxgl.Marker[] = [];
    const bounds = new mapboxgl.LngLatBounds();
    
    route.stops.forEach((stop: any, index: number) => {
      // Create a DOM element for the marker
      const el = document.createElement('div');
      el.className = 'bus-stop-marker';
      el.innerHTML = `
        <div class="w-6 h-6 bg-karnataka-red rounded-full flex items-center justify-center text-white text-xs font-bold">
          ${index + 1}
        </div>
      `;
      
      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat(stop.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${stop.name}</h3><p>${isKannada ? 'ಸಮಯ' : 'Time'}: ${stop.time}</p>`))
        .addTo(map.current!);
      
      newMarkers.push(marker);
      bounds.extend(stop.coordinates);
    });
    
    // Add a bus icon at the first stop
    if (route.stops.length > 0) {
      const busEl = document.createElement('div');
      busEl.className = 'bus-marker';
      busEl.innerHTML = `
        <div class="w-8 h-8 bg-karnataka-blue rounded-full flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 6v12m8-12v12M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
            <path d="M8 18h8"/>
            <path d="M9 22h6"/>
          </svg>
        </div>
      `;
      
      const busMarker = new mapboxgl.Marker(busEl)
        .setLngLat(route.stops[0].coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${route.busNumber}</h3>`))
        .addTo(map.current!);
      
      newMarkers.push(busMarker);
    }
    
    setBusMarkers(newMarkers);
    
    // Add route line
    if (map.current.getSource('route')) {
      (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route.stops.map((stop: any) => stop.coordinates)
        }
      });
    } else {
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route.stops.map((stop: any) => stop.coordinates)
          }
        }
      });
      
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#FF6B6B',
          'line-width': 4
        }
      });
    }
    
    // Fit map to bounds
    map.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15
    });
  };

  // Calculate estimated time function
  const calculateEstimatedTime = (stops: any[]) => {
    if (!stops || stops.length < 2) return "N/A";
    
    // Get first and last stop times
    const firstTimeStr = stops[0].time;
    const lastTimeStr = stops[stops.length - 1].time;
    
    // Parse times (assuming HH:MM format)
    const [firstHours, firstMinutes] = firstTimeStr.split(":").map(Number);
    const [lastHours, lastMinutes] = lastTimeStr.split(":").map(Number);
    
    // Calculate total minutes
    const firstTotalMinutes = firstHours * 60 + firstMinutes;
    const lastTotalMinutes = lastHours * 60 + lastMinutes;
    
    // Calculate difference in minutes
    let diffMinutes = lastTotalMinutes - firstTotalMinutes;
    if (diffMinutes < 0) diffMinutes += 24 * 60; // Handle day crossing
    
    // Format result
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {isKannada ? "ಬಸ್ ಟ್ರ್ಯಾಕಿಂಗ್ ನಕ್ಷೆ" : "Bus Tracking Map"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-karnataka-red" />
          </div>
        ) : (
          <>
            <div 
              ref={mapContainer} 
              className="h-[400px] w-full rounded-md overflow-hidden mb-4"
            />
            
            {selectedRoute && (
              <div className="mt-4 border rounded-lg p-4 bg-gray-50">
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <h3 className="font-medium text-lg flex items-center">
                    <Bus className="h-5 w-5 mr-2 text-karnataka-red" />
                    {selectedRoute.busNumber}
                    <Badge className="ml-2 bg-karnataka-blue">{selectedRoute.category}</Badge>
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <div className="flex items-center text-gray-700">
                      <Users className="h-4 w-4 mr-1 text-karnataka-blue" />
                      <span>{isKannada ? "ಸಾಮರ್ಥ್ಯ:" : "Capacity:"} {selectedRoute.seatsFilled}/{selectedRoute.capacity}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-4 w-4 mr-1 text-karnataka-blue" />
                      <span>{isKannada ? "ಯಾತ್ರಾ ಸಮಯ:" : "Travel time:"} {calculateEstimatedTime(selectedRoute.stops)}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1 text-karnataka-blue">
                    {isKannada ? "ಪ್ರಯಾಣಿಕರ ಮಾರ್ಗದರ್ಶಿ" : "Traveler Guide"}
                  </h4>
                  <p className="text-sm bg-yellow-50 p-2 rounded border border-yellow-100">
                    {selectedRoute.travelGuide || (isKannada ? "ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ" : "No travel information available")}
                  </p>
                </div>

                <h4 className="text-sm font-medium mb-2 text-karnataka-blue">
                  {isKannada ? "ಬಸ್ ಮಾರ್ಗ" : "Bus Route"}
                </h4>
                <div className="space-y-1">
                  {selectedRoute.stops.map((stop: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-karnataka-red text-white flex items-center justify-center text-xs mr-2">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{stop.name}</span>
                      </div>
                      <div className="text-gray-600">
                        {stop.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BusMapTracker;
