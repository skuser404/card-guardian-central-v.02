
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const initialLiveServices = [
  {
    id: 1,
    name: "BMTC",
    status: "Normal",
    details: "All routes operating normally",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-karnataka-blue">
        <path d="M19 17h2V7l-2 2"/>
        <path d="M15 17h2"/>
        <path d="M2 17h2V7H2z"/>
        <path d="M6 12v3c0 1.1.9 2 2 2h3"/>
        <path d="M18 17v-3"/>
        <rect x="4" y="17" width="16" height="2"/>
        <path d="M10 7v5a1 1 0 001 1h2"/>
      </svg>
    ),
    color: "blue"
  },
  {
    id: 2,
    name: "Metro",
    status: "Minor Delay",
    details: "Purple Line: 10 min delay",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-karnataka-yellow">
        <rect x="4" y="3" width="16" height="16" rx="2"/>
        <path d="M4 11h16"/>
        <path d="M12 3v16"/>
      </svg>
    ),
    color: "yellow"
  },
  {
    id: 3,
    name: "KSRTC",
    status: "Normal",
    details: "All routes on schedule",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-karnataka-red">
        <path d="M3 9h18V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4z"/>
        <path d="M3 9v5c0 1 1 2 2 2h14c1 0 2-1 2-2V9"/>
        <path d="M3 9H1"/>
        <path d="M23 9h-2"/>
        <path d="M8 17v3"/>
        <path d="M16 17v3"/>
      </svg>
    ),
    color: "red"
  },
  {
    id: 4,
    name: "Auto/Taxi",
    status: "Normal",
    details: "Average wait time: 5 mins",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-karnataka-green">
        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
        <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
        <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"/>
      </svg>
    ),
    color: "green"
  }
];

const routes = {
  "BMTC": ["Majestic to Whitefield", "KR Market to HSR Layout", "Shivajinagar to Electronic City", "Banashankari to ITPL"],
  "Metro": ["Purple Line", "Green Line", "Yellow Line (Under Construction)", "Pink Line (Under Construction)"],
  "KSRTC": ["Bangalore to Mysore", "Bangalore to Mangalore", "Bangalore to Hubli", "Bangalore to Belgaum"],
  "Auto/Taxi": ["City Rides", "Airport Transfers", "Outstation Trips", "Package Tours"]
};

const LiveStatus = () => {
  const [liveServices, setLiveServices] = useState(initialLiveServices);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const refreshStatus = () => {
    // Simulate updating status with random values
    const statuses = ["Normal", "Minor Delay", "Major Delay"];
    const updatedServices = liveServices.map(service => {
      const randomIndex = Math.floor(Math.random() * 3); 
      const newStatus = statuses[randomIndex];
      
      return {
        ...service,
        status: newStatus,
        details: newStatus === "Normal" 
          ? "All routes operating normally" 
          : newStatus === "Minor Delay" 
            ? `${service.name} experiencing 10-15 min delays`
            : `${service.name} experiencing 30+ min delays`
      };
    });
    
    setLiveServices(updatedServices);
  };
  
  const getRouteOptions = (serviceName: string) => {
    return routes[serviceName as keyof typeof routes] || [];
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-karnataka-blue">Service Updates</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshStatus}
          className="text-xs hover:bg-karnataka-blue/10"
        >
          Refresh Status
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {liveServices.map((service) => (
          <div 
            key={service.id}
            className="glassmorphism rounded-lg p-4 hover:bg-white/30 transition-colors cursor-pointer"
            onClick={() => setSelectedService(service.name)}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                service.color === "blue" && "bg-karnataka-blue/10",
                service.color === "yellow" && "bg-karnataka-yellow/10",
                service.color === "red" && "bg-karnataka-red/10",
                service.color === "green" && "bg-karnataka-green/10"
              )}>
                {service.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{service.name}</p>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs",
                    service.status === "Normal" && "bg-green-100 text-green-800",
                    service.status === "Minor Delay" && "bg-yellow-100 text-yellow-800",
                    service.status === "Major Delay" && "bg-red-100 text-red-800"
                  )}>
                    {service.status}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{service.details}</p>
              </div>
            </div>
            
            {selectedService === service.name && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <Select onValueChange={setSelectedRoute}>
                  <SelectTrigger className="w-full text-sm">
                    <SelectValue placeholder="Select a route" />
                  </SelectTrigger>
                  <SelectContent>
                    {getRouteOptions(service.name).map((route) => (
                      <SelectItem key={route} value={route}>{route}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedRoute && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-md text-xs">
                    <p className="font-medium">Route: {selectedRoute}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span>Next departure:</span>
                      <span className="font-medium">{Math.floor(Math.random() * 15) + 1} mins</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveStatus;
