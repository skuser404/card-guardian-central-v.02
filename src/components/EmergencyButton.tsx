
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, UserRound } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface EmergencyButtonProps {
  isKannada?: boolean;
  employeeName?: string;
  employeeId?: string;
  department?: string;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ 
  isKannada = false, 
  employeeName,
  employeeId,
  department
}) => {
  const handleEmergencyCall = () => {
    // Format employee info for the emergency notification
    const employeeInfo = employeeName 
      ? `${isKannada ? "ಉದ್ಯೋಗಿ: " : "Employee: "} ${employeeName}${employeeId ? ` (${employeeId})` : ''}${department ? `, ${department}` : ''}`
      : '';
    
    // Show toast notification
    toast({
      title: isKannada ? "ತುರ್ತು ಕರೆ ಮಾಡಲಾಗುತ್ತಿದೆ" : "Emergency Call Initiated",
      description: isKannada 
        ? `ತುರ್ತು ಸೇವೆಗಳು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತವೆ${employeeInfo ? ` - ${employeeInfo}` : ''}`
        : `Emergency services will contact you shortly${employeeInfo ? ` - ${employeeInfo}` : ''}`,
      variant: "destructive",
    });
    
    // In a real application, this would initiate an actual emergency call
    console.log("Emergency call initiated", { employeeName, employeeId, department });
  };

  return (
    <Button
      variant="destructive"
      className="shadow-lg hover:shadow-xl transition-all flex items-center"
      size="lg"
      onClick={handleEmergencyCall}
    >
      {employeeName ? <UserRound className="mr-1 h-4 w-4" /> : null}
      <Phone className="mr-2 h-4 w-4" />
      {isKannada ? "ತುರ್ತು ಕರೆ" : "Emergency Call"}
    </Button>
  );
};

export default EmergencyButton;
