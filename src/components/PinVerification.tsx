
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";

interface PinVerificationProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
  action: string;
  isKannada?: boolean;
}

const PinVerification = ({ isOpen, onOpenChange, onSuccess, action, isKannada = false }: PinVerificationProps) => {
  const [pin, setPin] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  
  const handleVerify = () => {
    if (pin.length !== 4) {
      toast({
        title: isKannada ? "ಪಿನ್ ಅಮಾನ್ಯವಾಗಿದೆ" : "Invalid PIN",
        description: isKannada ? "ದಯವಿಟ್ಟು 4-ಅಂಕಿಯ ಪಿನ್ ನಮೂದಿಸಿ" : "Please enter a 4-digit PIN",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    // In a real app this would validate against a stored PIN
    // For this demo, we'll accept "1234" as the correct PIN
    setTimeout(() => {
      if (pin === "1234") {
        onSuccess();
        setPin("");
        toast({
          title: isKannada ? "ಪಿನ್ ಪರಿಶೀಲಿಸಲಾಗಿದೆ" : "PIN Verified",
          description: isKannada ? "ನಿಮ್ಮ ಪಿನ್ ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ" : "Your PIN has been successfully verified",
        });
      } else {
        toast({
          title: isKannada ? "ತಪ್ಪಾದ ಪಿನ್" : "Incorrect PIN",
          description: isKannada ? "ದಯವಿಟ್ಟು ಸರಿಯಾದ ಪಿನ್ ನಮೂದಿಸಿ" : "Please enter the correct PIN",
          variant: "destructive",
        });
      }
      setIsVerifying(false);
    }, 1000);
  };
  
  const getActionText = () => {
    if (isKannada) {
      if (action === "view-balance") return "ಬ್ಯಾಲೆನ್ಸ್ ವೀಕ್ಷಿಸಿ";
      if (action === "lock") return "ಕಾರ್ಡ್ ಲಾಕ್ ಮಾಡಿ";
      return "ಕಾರ್ಡ್ ಅನ್‌ಲಾಕ್ ಮಾಡಿ";
    } else {
      if (action === "view-balance") return "View Balance";
      if (action === "lock") return "Lock Card";
      return "Unlock Card";
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isKannada ? "ಪಿನ್ ನಮೂದಿಸಿ" : "Enter PIN"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <p className="text-sm text-center mb-4">
            {isKannada 
              ? `${getActionText()} ಮಾಡಲು ನಿಮ್ಮ 4-ಅಂಕಿಯ ಪಿನ್ ನಮೂದಿಸಿ` 
              : `Enter your 4-digit PIN to ${getActionText().toLowerCase()}`
            }
          </p>
          
          <div className="flex justify-center my-4">
            <InputOTP maxLength={4} value={pin} onChange={setPin}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <Button 
            onClick={handleVerify} 
            disabled={pin.length !== 4 || isVerifying}
            className="w-full mt-4"
          >
            {isVerifying 
              ? (isKannada ? "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..." : "Verifying...") 
              : (isKannada ? "ಪರಿಶೀಲಿಸಿ" : "Verify")}
          </Button>
          
          <p className="text-xs text-center mt-4 text-gray-500">
            {isKannada 
              ? "ಡೆಮೋ ಪಿನ್: 1234" 
              : "Demo PIN: 1234"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PinVerification;
