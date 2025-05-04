import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lock, Unlock, Eye, EyeOff } from "lucide-react";
import BiometricPrompt from "./BiometricPrompt";
import TransactionHistory from "./TransactionHistory";
import PinVerification from "./PinVerification";

type CardStatus = "active" | "locked";

interface TransportCardProps {
  cardId?: string;
  userName?: string;
  issueDate?: string;
  expiryDate?: string;
  initialStatus?: CardStatus;
  isKannada?: boolean;
}

const TransportCard = ({
  cardId = "KA-UTM-2023-56789",
  userName = "K. R. Venkatesh",
  issueDate = "2023-06-15",
  expiryDate = "2028-06-14",
  initialStatus = "active",
  isKannada = false
}: TransportCardProps) => {
  const [cardStatus, setCardStatus] = useState<CardStatus>(initialStatus);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPinOpen, setIsPinOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"lock" | "unlock" | "view-balance" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(750);

  // Format dates
  const formattedIssueDate = new Date(issueDate).toLocaleDateString(isKannada ? "kn-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  
  const formattedExpiryDate = new Date(expiryDate).toLocaleDateString(isKannada ? "kn-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  const handleLockUnlock = (action: "lock" | "unlock") => {
    setPendingAction(action);
    setIsPinOpen(true);
  };

  const handleViewBalance = () => {
    setPendingAction("view-balance");
    setIsPinOpen(true);
  };

  const handlePinSuccess = async () => {
    if (!pendingAction) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (pendingAction === "view-balance") {
        setShowBalance(true);
      } else {
        setCardStatus(pendingAction === "lock" ? "locked" : "active");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setIsPinOpen(false);
      setPendingAction(null);
    }
  };

  const handleAuthSuccess = async () => {
    // Keep for backwards compatibility
    if (!pendingAction) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCardStatus(pendingAction === "lock" ? "locked" : "active");
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
              {isKannada ? "ಸಕ್ರಿಯ" : "ACTIVE"}
            </>
          ) : (
            <>
              <Lock size={12} />
              {isKannada ? "ಲಾಕ್ ಆಗಿದೆ" : "LOCKED"}
            </>
          )}
        </div>
        
        {/* Card details */}
        <div className="flex flex-col h-full justify-between text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-sm">{isKannada ? "ಸಾರ್ವತ್ರಿಕ ಸಾರಿಗೆ ಕಾರ್ಡ್" : "Universal Transport Card"}</div>
              <div className="font-light text-xs opacity-80">
                {isKannada ? "ಕರ್ನಾಟಕ ಏಕೀಕೃತ ಸೇವೆಗಳು" : "Karnataka Unified Services"}
              </div>
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
            <div className="text-xs opacity-70 mb-1">
              {isKannada ? "ಕಾರ್ಡ್ ಸಂಖ್ಯೆ" : "Card Number"}
            </div>
            <div className="font-mono tracking-wider">{cardId}</div>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-70 mb-1">
                {isKannada ? "ಕಾರ್ಡ್ ಹೊಂದಿರುವವರು" : "Card Holder"}
              </div>
              <div className="font-semibold">{userName}</div>
            </div>
            <div className="text-xs text-right">
              <div>
                <span className="opacity-70">{isKannada ? "ನೀಡಿದ: " : "Issued: "}</span>
                {formattedIssueDate}
              </div>
              <div>
                <span className="opacity-70">{isKannada ? "ಅವಧಿ: " : "Valid Till: "}</span>
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
      
      {/* Balance Section */}
      <div className={cn(
        "w-full p-4 rounded-lg glassmorphism transition-all",
        cardStatus === "locked" && "opacity-60 pointer-events-none"
      )}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {isKannada ? "ಕಾರ್ಡ್ ಬ್ಯಾಲೆನ್ಸ್" : "Card Balance"}
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => showBalance ? setShowBalance(false) : handleViewBalance()}
            className="flex items-center gap-1"
          >
            {showBalance ? (
              <>
                <EyeOff size={16} />
                <span className="ml-1">{isKannada ? "ಮರೆಮಾಡಿ" : "Hide"}</span>
              </>
            ) : (
              <>
                <Eye size={16} />
                <span className="ml-1">{isKannada ? "ತೋರಿಸಿ" : "Show"}</span>
              </>
            )}
          </Button>
        </div>
        
        <div className="mt-2">
          {showBalance ? (
            <div className="text-3xl font-bold">₹{balance.toFixed(2)}</div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-6 bg-gray-300 rounded-md w-24"></div>
              <span className="text-sm text-gray-500">
                {isKannada ? "ಬ್ಯಾಲೆನ್ಸ್ ವೀಕ್ಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ" : "Click to view balance"}
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-3 flex">
          <Button className="w-full bg-karnataka-blue">
            {isKannada ? "ಕಾರ್ಡ್ ರೀಚಾರ್ಜ್ ಮಾಡಿ" : "Recharge Card"}
          </Button>
        </div>
      </div>
      
      {/* Card Actions */}
      <div className="flex gap-4">
        <Button
          onClick={() => handleLockUnlock("lock")}
          disabled={cardStatus === "locked" || isLoading}
          className="flex-1 bg-karnataka-blue hover:bg-karnataka-blue/80"
        >
          <Lock size={18} className="mr-2" /> {isKannada ? "ಕಾರ್ಡ್ ಲಾಕ್ ಮಾಡಿ" : "Lock Card"}
        </Button>
        <Button
          onClick={() => handleLockUnlock("unlock")}
          disabled={cardStatus === "active" || isLoading}
          className="flex-1 bg-green-600 hover:bg-green-700" 
        >
          <Unlock size={18} className="mr-2" /> {isKannada ? "ಕಾರ್ಡ್ ಅನ್‌ಲಾಕ್ ಮಾಡಿ" : "Unlock Card"}
        </Button>
      </div>
      
      {/* Transaction history */}
      <TransactionHistory cardStatus={cardStatus} isKannada={isKannada} />
      
      {/* PIN Verification */}
      <PinVerification
        isOpen={isPinOpen}
        onOpenChange={setIsPinOpen}
        onSuccess={handlePinSuccess}
        action={pendingAction || ""}
        isKannada={isKannada}
      />
      
      {/* Biometric Prompt (kept for backward compatibility) */}
      <BiometricPrompt 
        isOpen={isAuthOpen} 
        onOpenChange={setIsAuthOpen}
        onAuthSuccess={handleAuthSuccess}
        action={pendingAction === "view-balance" ? null : pendingAction}
      />
    </div>
  );
};

export default TransportCard;
