
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSwitcherProps {
  isKannada: boolean;
  onLanguageChange: (value: boolean) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  isKannada, 
  onLanguageChange 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-24">
          {isKannada ? "ಕನ್ನಡ" : "English"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onLanguageChange(false)}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLanguageChange(true)}>
          ಕನ್ನಡ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
