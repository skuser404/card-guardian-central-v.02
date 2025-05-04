
import { cn } from "@/lib/utils";

type CardStatus = "active" | "locked";

interface TransactionHistoryProps {
  cardStatus: CardStatus;
  isKannada?: boolean; // Added language prop
}

const transactions = [
  {
    id: 1,
    type: "Bus Fare",
    typeKn: "ಬಸ್ ದರ",
    amount: 25,
    date: "2025-05-03T08:35:00",
    service: "BMTC-300K",
    route: "Majestic to Whitefield",
    routeKn: "ಮೆಜೆಸ್ಟಿಕ್‌ನಿಂದ ವೈಟ್‌ಫೀಲ್ಡ್"
  },
  {
    id: 2,
    type: "Metro Ticket",
    typeKn: "ಮೆಟ್ರೋ ಟಿಕೆಟ್",
    amount: 35,
    date: "2025-05-02T18:22:00",
    service: "Purple Line",
    route: "MG Road to Indiranagar",
    routeKn: "ಎಂಜಿ ರಸ್ತೆಯಿಂದ ಇಂದಿರಾನಗರ"
  },
  {
    id: 3,
    type: "Card Recharge",
    typeKn: "ಕಾರ್ಡ್ ರೀಚಾರ್ಜ್",
    amount: 500,
    date: "2025-05-01T14:15:00",
    service: "Online Payment",
    route: "UPI Transaction",
    routeKn: "ಯುಪಿಐ ವಹಿವಾಟು"
  },
  {
    id: 4,
    type: "Bus Fare",
    typeKn: "ಬಸ್ ದರ",
    amount: 55,
    date: "2025-04-30T09:45:00",
    service: "KSRTC-Super Deluxe",
    route: "Bangalore to Mysore",
    routeKn: "ಬೆಂಗಳೂರಿನಿಂದ ಮೈಸೂರು"
  },
  {
    id: 5,
    type: "Auto Fare",
    typeKn: "ಆಟೋ ದರ",
    amount: 120,
    date: "2025-04-29T20:10:00",
    service: "Namma Yatri",
    route: "Koramangala to HSR Layout",
    routeKn: "ಕೊರಮಂಗಲದಿಂದ ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್"
  }
];

const TransactionHistory = ({ cardStatus, isKannada = false }: TransactionHistoryProps) => {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">
          {isKannada ? "ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು" : "Recent Transactions"}
        </h3>
        <span className="text-sm text-karnataka-blue">
          {isKannada ? "ಎಲ್ಲವನ್ನು ನೋಡಿ" : "View All"}
        </span>
      </div>
      
      <div className={cn(
        "space-y-3 max-h-[300px] overflow-y-auto pr-2",
        cardStatus === "locked" && "opacity-60 pointer-events-none"
      )}>
        {transactions.map((transaction) => {
          const date = new Date(transaction.date);
          const formattedDate = date.toLocaleDateString(isKannada ? "kn-IN" : "en-IN", {
            day: "numeric",
            month: "short",
          });
          const formattedTime = date.toLocaleTimeString(isKannada ? "kn-IN" : "en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          
          const isRecharge = transaction.type === "Card Recharge";
          
          return (
            <div 
              key={transaction.id}
              className="glassmorphism p-4 rounded-lg flex items-center justify-between hover:bg-white/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                  isRecharge ? "bg-green-100" : "bg-blue-100" 
                )}>
                  {isRecharge ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-karnataka-blue">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M7 7h.01M12 7h.01M17 7h.01M7 12h.01M12 12h.01M17 12h.01M7 17h.01M12 17h.01M17 17h.01" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {isKannada ? transaction.typeKn : transaction.type}
                  </p>
                  <p className="text-xs text-gray-500">
                    {transaction.service} · {isKannada ? transaction.routeKn : transaction.route}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "font-semibold",
                  isRecharge ? "text-green-600" : "text-gray-800"
                )}>
                  {isRecharge ? "+" : "-"} ₹{transaction.amount}
                </p>
                <p className="text-xs text-gray-500">{formattedDate}, {formattedTime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionHistory;
