
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface EmergencyButtonProps {
  isKannada?: boolean;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ isKannada = false }) => {
  const handleEmergencyCall = () => {
    // Show toast notification
    toast({
      title: isKannada ? "ತುರ್ತು ಕರೆ ಮಾಡಲಾಗುತ್ತಿದೆ" : "Emergency Call Initiated",
      description: isKannada 
        ? "ತುರ್ತು ಸೇವೆಗಳು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತವೆ" 
        : "Emergency services will contact you shortly",
      variant: "destructive",
    });
    
    // In a real application, this would initiate an actual emergency call
    console.log("Emergency call initiated");
  };

  return (
    <Button
      variant="destructive"
      className="shadow-lg hover:shadow-xl transition-all"
      size="lg"
      onClick={handleEmergencyCall}
    >
      <Phone className="mr-2 h-4 w-4" />
      {isKannada ? "ತುರ್ತು ಕರೆ" : "Emergency Call"}
    </Button>
  );
};

export default EmergencyButton;
