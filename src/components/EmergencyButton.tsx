
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

const EmergencyButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className={cn(
          "bg-karnataka-red text-white w-full py-6 rounded-lg font-bold",
          "border-2 border-red-700 relative overflow-hidden animate-pulse",
          "hover:bg-red-600 transition-colors duration-300"
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-16 h-16 bg-red-500/20 rounded-full animate-ping"></div>
        </div>
        <span className="relative z-10 flex items-center gap-2 justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2H2v20h20V2zM12 6v12M6 12h12"></path>
          </svg>
          EMERGENCY ASSISTANCE
        </span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-karnataka-red">Emergency Assistance</DialogTitle>
            <DialogDescription>
              Contact one of our emergency services below
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <a 
              href="tel:18004254709" 
              className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:bg-gray-50"
            >
              <div className="h-10 w-10 rounded-full bg-karnataka-red/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D22730" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium">KSRTC Helpline</p>
                <p className="text-sm text-gray-500">1800-425-4709</p>
              </div>
            </a>
            
            <a 
              href="tel:18004251092" 
              className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:bg-gray-50"
            >
              <div className="h-10 w-10 rounded-full bg-karnataka-blue/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0C3E8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium">BMTC Helpline</p>
                <p className="text-sm text-gray-500">1800-425-1092</p>
              </div>
            </a>
            
            <a 
              href="tel:08022354498" 
              className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:bg-gray-50"
            >
              <div className="h-10 w-10 rounded-full bg-karnataka-green/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#006837" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium">Namma Metro</p>
                <p className="text-sm text-gray-500">080-2235-4498</p>
              </div>
            </a>
            
            <a 
              href="tel:112" 
              className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:bg-gray-50"
            >
              <div className="h-10 w-10 rounded-full bg-karnataka-red/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D22730" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium">Police Emergency</p>
                <p className="text-sm text-gray-500">112</p>
              </div>
            </a>
          </div>

          <DialogClose asChild>
            <Button variant="outline" className="w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyButton;
