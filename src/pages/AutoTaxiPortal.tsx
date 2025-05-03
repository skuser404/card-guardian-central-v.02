
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CarFront, MapPin, Navigation } from "lucide-react";

const AutoTaxiPortal = () => {
  const navigate = useNavigate();
  
  const serviceTypes = [
    { id: 1, name: "City Rides", icon: "🏙️", basePrice: "₹30 + ₹15/km", waitingTime: "₹1/min" },
    { id: 2, name: "Airport Transfers", icon: "✈️", basePrice: "₹300 + ₹20/km", waitingTime: "₹2/min" },
    { id: 3, name: "Outstation Trips", icon: "🚗", basePrice: "₹2000-₹4000/day", waitingTime: "N/A" },
    { id: 4, name: "Package Tours", icon: "🏞️", basePrice: "Custom packages", waitingTime: "N/A" }
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
              className="hover:bg-karnataka-green/10"
            >
              &larr; Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-karnataka-green flex items-center">
              <CarFront className="mr-2 h-8 w-8 text-karnataka-green" />
              Auto & Taxi Services
            </h1>
          </div>
          
          <Tabs defaultValue="booking" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="booking">Book Now</TabsTrigger>
              <TabsTrigger value="services">Service Types</TabsTrigger>
              <TabsTrigger value="info">Information</TabsTrigger>
            </TabsList>
            
            <TabsContent value="booking">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Navigation className="mr-2 h-5 w-5" />
                    Book a Ride
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="glassmorphism p-4 rounded-lg">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex gap-4 justify-center mb-4">
                        <Button variant="outline" className="flex-1 border-karnataka-green">
                          <span className="text-xl mr-2">🛺</span> Auto
                        </Button>
                        <Button variant="outline" className="flex-1 border-karnataka-green">
                          <span className="text-xl mr-2">🚕</span> Taxi
                        </Button>
                      </div>
                      
                      <div>
                        <label className="text-sm block mb-1">Pickup Location</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Your current location"
                            className="border rounded-md p-2 flex-1"
                          />
                          <Button variant="outline" className="border-karnataka-green">
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm block mb-1">Drop Location</label>
                        <input
                          type="text"
                          placeholder="Where are you going?"
                          className="border rounded-md p-2 w-full"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm block mb-1">Date</label>
                          <input
                            type="date"
                            className="border rounded-md p-2 w-full"
                            defaultValue={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <label className="text-sm block mb-1">Time</label>
                          <input
                            type="time"
                            className="border rounded-md p-2 w-full"
                          />
                        </div>
                      </div>
                      
                      <Button className="w-full bg-karnataka-green">Get Fare Estimate</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Nearby Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="glassmorphism p-4 rounded-lg">
                    <p className="text-center text-sm mb-4">
                      Average wait time in your area: <span className="font-semibold">5 minutes</span>
                    </p>
                    <div className="flex justify-center gap-4">
                      <div className="text-center">
                        <div className="bg-karnataka-green/10 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                          <span className="text-2xl">🛺</span>
                        </div>
                        <p className="text-sm font-medium">23 Autos</p>
                        <p className="text-xs text-gray-500">nearby</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-karnataka-green/10 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                          <span className="text-2xl">🚕</span>
                        </div>
                        <p className="text-sm font-medium">15 Taxis</p>
                        <p className="text-xs text-gray-500">nearby</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Available Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceTypes.map((service) => (
                      <div 
                        key={service.id}
                        className="glassmorphism p-4 rounded-lg"
                      >
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">{service.icon}</span>
                          <span className="font-medium">{service.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Base Price:</span>
                            <span>{service.basePrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Waiting Time:</span>
                            <span>{service.waitingTime}</span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-3 bg-karnataka-green"
                        >
                          Book Now
                        </Button>
                      </div>
                    ))}
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
                    <h3 className="font-medium mb-2">Fare Card</h3>
                    <div className="text-sm">
                      <p className="mb-2">Auto Rickshaw:</p>
                      <ul className="list-disc pl-5 mb-2">
                        <li>Minimum fare: ₹30 for first 2 km</li>
                        <li>₹15 per kilometer thereafter</li>
                        <li>Waiting charge: ₹1 per minute</li>
                      </ul>
                      <p className="mb-2">Taxi:</p>
                      <ul className="list-disc pl-5">
                        <li>Minimum fare: ₹75 for first 4 km</li>
                        <li>₹18 per kilometer thereafter</li>
                        <li>Waiting charge: ₹2 per minute</li>
                      </ul>
                    </div>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">Contact Information</h3>
                    <p className="text-sm">Helpline: 1800-425-4567</p>
                    <p className="text-sm">Email: support@autotaxi.kar.gov.in</p>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Safety Guidelines</h3>
                    <ul className="text-sm list-disc pl-5">
                      <li>Verify driver identity before boarding</li>
                      <li>Share ride details with family/friends</li>
                      <li>Report any issues to the helpline</li>
                      <li>Ensure meter is running for auto rides</li>
                    </ul>
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

export default AutoTaxiPortal;
