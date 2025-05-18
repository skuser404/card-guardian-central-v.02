
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Globe, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isKannada?: boolean;
  onLanguageChange?: (isKannada: boolean) => void;
  showLogout?: boolean;
}

const Header = ({ isKannada: propIsKannada, onLanguageChange, showLogout = false }: HeaderProps = {}) => {
  const [isKannada, setIsKannada] = useState(propIsKannada || false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sync state with props when they change
  useEffect(() => {
    if (propIsKannada !== undefined) {
      setIsKannada(propIsKannada);
    }
  }, [propIsKannada]);

  const toggleLanguage = () => {
    const newValue = !isKannada;
    setIsKannada(newValue);
    
    // Notify parent component if callback exists
    if (onLanguageChange) {
      onLanguageChange(newValue);
    }
    
    // Show toast notification when language changes
    toast({
      title: newValue ? 'ಭಾಷೆ ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ' : 'Language Changed to English',
      description: newValue ? 'ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆಯನ್ನು ಈಗ ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ' : 'The application language is now English',
      duration: 2000
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: isKannada ? "ಲಾಗ್ ಔಟ್ ಯಶಸ್ವಿಯಾಗಿದೆ" : "Logout Successful",
      description: isKannada ? "ನೀವು ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್ ಔಟ್ ಆಗಿದ್ದೀರಿ" : "You have been successfully logged out",
      duration: 2000
    });
    navigate("/auth");
  };

  return (
    <header className="w-full glassmorphism p-4 flex items-center justify-between mb-6 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 bg-karnataka-blue rounded-full flex items-center justify-center overflow-hidden">
          <img 
            src="/ksrtc_logo.png" 
            alt={isKannada ? "ಕೆಎಸ್ಆರ್ಟಿಸಿ ಲೋಗೋ" : "KSRTC Logo"} 
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
          <Globe className="mr-1 h-4 w-4" />
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

        {showLogout && (
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-1 border-karnataka-red text-karnataka-red hover:bg-karnataka-red/10"
          >
            <LogOut className="h-4 w-4" />
            <span>{isKannada ? "ಲಾಗ್ ಔಟ್" : "Logout"}</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
