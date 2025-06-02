
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
    // Emergency contact numbers
    const emergencyNumbers = {
      police: '100',
      fire: '101',
      ambulance: '108',
      helpline: '1800-425-4709'
    };
    
    // Format employee info for the emergency notification
    const employeeInfo = employeeName 
      ? `${isKannada ? "ಉದ್ಯೋಗಿ: " : "Employee: "} ${employeeName}${employeeId ? ` (${employeeId})` : ''}${department ? `, ${department}` : ''}`
      : '';
    
    // Show toast notification with emergency numbers
    toast({
      title: isKannada ? "ತುರ್ತು ಕರೆ ಮಾಡಲಾಗುತ್ತಿದೆ" : "Emergency Call Initiated",
      description: isKannada 
        ? `ತುರ್ತು ಸಂಪರ್ಕ ಸಂಖ್ಯೆಗಳು: ಪೊಲೀಸ್: 100, ಅಗ್ನಿಶಾಮಕ: 101, ಆಂಬುಲೆನ್ಸ್: 108, ಹೆಲ್ಪ್‌ಲೈನ್: 1800-425-4709${employeeInfo ? ` - ${employeeInfo}` : ''}`
        : `Emergency contacts: Police: 100, Fire: 101, Ambulance: 108, Helpline: 1800-425-4709${employeeInfo ? ` - ${employeeInfo}` : ''}`,
      variant: "destructive",
      duration: 10000,
    });
    
    // In a real application, this would initiate an actual emergency call
    console.log("Emergency call initiated", { 
      emergencyNumbers, 
      employeeName, 
      employeeId, 
      department 
    });
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
