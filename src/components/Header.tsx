
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Language } from 'lucide-react';

const Header = () => {
  const [isKannada, setIsKannada] = useState(false);
  const { toast } = useToast();

  const toggleLanguage = () => {
    setIsKannada(!isKannada);
    
    // Show toast notification when language changes
    toast({
      title: isKannada ? 'Language Changed to English' : 'ಭಾಷೆ ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ',
      description: isKannada ? 'The application language is now English' : 'ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆಯನ್ನು ಈಗ ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ',
      duration: 2000
    });
  };

  return (
    <header className="w-full glassmorphism p-4 flex items-center justify-between mb-6 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 bg-karnataka-blue rounded-full flex items-center justify-center overflow-hidden">
          <img 
            src="/ksrtc_logo.png" 
            alt="KSRTC Logo" 
            className="h-12 w-12 object-contain" 
            onError={(e) => {
              e.currentTarget.src = "https://ksrtc.karnataka.gov.in/frontend/KSRTC%20LOGO.png";
            }}
          />
        </div>
        <div>
          <h1 className="font-bold text-karnataka-blue text-sm md:text-xl">
            {isKannada ? 'ಕರ್ನಾಟಕ ಸಾರಿಗೆ' : 'Karnataka Transport'}
          </h1>
          <p className="text-xs text-karnataka-gray">
            {isKannada ? 'ಏಕೀಕೃತ ಸೇವೆಗಳು' : 'Unified Services'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost"
          onClick={toggleLanguage} 
          className={cn(
            "relative overflow-hidden px-4 py-2 rounded-md transition-all duration-300",
            isKannada ? "bg-karnataka-yellow text-karnataka-blue" : "bg-karnataka-blue text-white"
          )}
        >
          <Language className="mr-1 h-4 w-4" />
          <span className={cn(
            "inline-block transition-all duration-300",
            isKannada ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}>
            ಕನ್ನಡ
          </span>
          <span className={cn(
            "inline-block absolute inset-0 flex items-center justify-center transition-all duration-300",
            !isKannada ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}>
            English
          </span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
