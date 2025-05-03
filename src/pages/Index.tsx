
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TransportCard from "@/components/TransportCard";
import ParticleBackground from "@/components/ParticleBackground";
import EmergencyButton from "@/components/EmergencyButton";
import LiveStatus from "@/components/LiveStatus";

const Index = () => {
  const [cardStatus, setCardStatus] = useState<"active" | "locked">("active");

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Main Content */}
      <div className="container max-w-3xl mx-auto px-4 py-6">
        <Header />
        
        <main className="my-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-karnataka-blue">
            Karnataka Universal Transport Card
          </h1>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Transport Card Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Your Universal Transport Card</h2>
              <TransportCard initialStatus={cardStatus} />
            </section>
            
            {/* Live Status Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Live Transport Status</h2>
              <LiveStatus />
            </section>
            
            {/* Emergency Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Emergency Assistance</h2>
              <EmergencyButton />
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
