
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Fingerprint } from "lucide-react";

interface BiometricPromptProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: () => void;
  action: "lock" | "unlock" | null;
}

const BiometricPrompt = ({
  isOpen,
  onOpenChange,
  onAuthSuccess,
  action
}: BiometricPromptProps) => {
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleVerify = () => {
    setVerifying(true);
    setError(null);
    
    // Simulate fingerprint verification
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      if (success) {
        setVerifying(false);
        onAuthSuccess();
      } else {
        setVerifying(false);
        setError("Verification failed. Please try again.");
      }
    }, 1500);
  };
  
  const handleClose = () => {
    if (!verifying) {
      setError(null);
      onOpenChange(false);
    }
  };
  
  const actionText = action === "lock" ? "Lock" : "Unlock";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authenticate to {actionText} Card</DialogTitle>
          <DialogDescription>
            Please verify your identity to {action} your Universal Transport Card.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-6">
          <button
            onClick={handleVerify}
            disabled={verifying}
            className={cn(
              "w-24 h-24 rounded-full border-2 transition-all duration-300",
              verifying ? "border-karnataka-blue animate-pulse" : "border-gray-300",
              error ? "border-red-500" : ""
            )}
          >
            <Fingerprint 
              size={60} 
              className={cn(
                "mx-auto transition-colors duration-300",
                verifying ? "text-karnataka-blue animate-pulse" : "text-gray-500",
                error ? "text-red-500" : ""
              )}
            />
          </button>
          
          <p className="mt-4 text-sm text-center">
            {verifying 
              ? "Verifying your fingerprint..." 
              : "Tap the fingerprint sensor to verify your identity"}
          </p>
          
          {error && (
            <p className="mt-2 text-sm text-red-500 text-center">
              {error}
            </p>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={verifying}
            className="sm:w-full"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={() => handleVerify()}
            disabled={verifying}
            className="sm:w-full bg-karnataka-blue hover:bg-karnataka-blue/80"
          >
            {verifying ? "Verifying..." : "Use OTP Instead"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BiometricPrompt;
