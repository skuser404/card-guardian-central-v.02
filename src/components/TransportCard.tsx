
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lock, Unlock } from "lucide-react";
import BiometricPrompt from "./BiometricPrompt";
import TransactionHistory from "./TransactionHistory";

type CardStatus = "active" | "locked";

interface TransportCardProps {
  cardId?: string;
  userName?: string;
  issueDate?: string;
  expiryDate?: string;
  initialStatus?: CardStatus;
}

const TransportCard = ({
  cardId = "KA-UTM-2023-56789",
  userName = "K. R. Venkatesh",
  issueDate = "2023-06-15",
  expiryDate = "2028-06-14",
  initialStatus = "active"
}: TransportCardProps) => {
  const [cardStatus, setCardStatus] = useState<CardStatus>(initialStatus);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"lock" | "unlock" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Format dates
  const formattedIssueDate = new Date(issueDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  
  const formattedExpiryDate = new Date(expiryDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  const handleLockUnlock = (action: "lock" | "unlock") => {
    setPendingAction(action);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = async () => {
    if (!pendingAction) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, we would call the actual API endpoint
      // const response = await fetch(`/api/card/${pendingAction}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ cardId })
      // });
      // if (!response.ok) throw new Error('Failed to update card status');
      
      setCardStatus(pendingAction === "lock" ? "locked" : "active");
      
      // Show toast notification
      console.log(`Card successfully ${pendingAction}ed`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setIsAuthOpen(false);
      setPendingAction(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Card */}
      <div 
        className={cn(
          "relative w-full rounded-xl p-5 h-52 glassmorphism",
          "card-gradient overflow-hidden transition-all duration-300",
          cardStatus === "locked" ? "grayscale-[30%]" : "grayscale-0",
        )}
      >
        {/* Status indicator */}
        <div 
          className={cn(
            "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold",
            "flex items-center gap-1.5 transition-all duration-300",
            cardStatus === "active" 
              ? "bg-green-500/80 text-white" 
              : "bg-red-500/80 text-white"
          )}
        >
          {cardStatus === "active" ? (
            <>
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              ACTIVE
            </>
          ) : (
            <>
              <Lock size={12} />
              LOCKED
            </>
          )}
        </div>
        
        {/* Card details */}
        <div className="flex flex-col h-full justify-between text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-sm">Universal Transport Card</div>
              <div className="font-light text-xs opacity-80">Karnataka Unified Services</div>
            </div>
            <div className="w-10 h-10">
              <img 
                src="/karnataka_emblem.png"
                alt="Karnataka Emblem"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://ksrtc.karnataka.gov.in/frontend/img/StGoK.png";
                }}
              />
            </div>
          </div>
          
          <div className="py-2">
            <div className="text-xs opacity-70 mb-1">Card Number</div>
            <div className="font-mono tracking-wider">{cardId}</div>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-70 mb-1">Card Holder</div>
              <div className="font-semibold">{userName}</div>
            </div>
            <div className="text-xs text-right">
              <div>
                <span className="opacity-70">Issued: </span>
                {formattedIssueDate}
              </div>
              <div>
                <span className="opacity-70">Valid Till: </span>
                {formattedExpiryDate}
              </div>
            </div>
          </div>
        </div>
        
        {/* Show a lock overlay if card is locked */}
        {cardStatus === "locked" && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white/20 p-3 rounded-full">
              <Lock size={40} className="text-white" />
            </div>
          </div>
        )}
      </div>
      
      {/* Card Actions */}
      <div className="flex gap-4">
        <Button
          onClick={() => handleLockUnlock("lock")}
          disabled={cardStatus === "locked" || isLoading}
          className="flex-1 bg-karnataka-blue hover:bg-karnataka-blue/80"
        >
          <Lock size={18} className="mr-2" /> Lock Card
        </Button>
        <Button
          onClick={() => handleLockUnlock("unlock")}
          disabled={cardStatus === "active" || isLoading}
          className="flex-1 bg-green-600 hover:bg-green-700" 
        >
          <Unlock size={18} className="mr-2" /> Unlock Card
        </Button>
      </div>
      
      {/* Transaction history */}
      <TransactionHistory cardStatus={cardStatus} />
      
      {/* Biometric Prompt */}
      <BiometricPrompt 
        isOpen={isAuthOpen} 
        onOpenChange={setIsAuthOpen}
        onAuthSuccess={handleAuthSuccess}
        action={pendingAction}
      />
    </div>
  );
};

export default TransportCard;
