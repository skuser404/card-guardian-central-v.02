
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Plus, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TransportCardProps {
  isKannada?: boolean;
}

const TransportCard: React.FC<TransportCardProps> = ({ isKannada = false }) => {
  return (
    <Card className="bg-white border-2 border-karnataka-blue shadow-lg">
      <CardHeader className="bg-karnataka-blue text-white">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          {isKannada ? 'ಕರ್ನಾಟಕ ರಸ್ತೆ ಸಾರಿಗೆ' : 'Karnataka Road Transport'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="bg-karnataka-yellow/10 p-4 rounded-lg border border-karnataka-yellow/30">
          <h3 className="font-medium text-karnataka-blue mb-2">
            {isKannada ? 'ಕಾರ್ಡ್ ಬ್ಯಾಲೆನ್ಸ್' : 'Card Balance'}
          </h3>
          <p className="text-2xl font-bold text-karnataka-red">₹250.00</p>
        </div>
        
        <div className="flex gap-2">
          <Button className="flex-1 bg-karnataka-green hover:bg-karnataka-green/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            {isKannada ? 'ರೀಚಾರ್ಜ್' : 'Recharge'}
          </Button>
          <Button variant="outline" className="flex-1 border-karnataka-blue text-karnataka-blue hover:bg-karnataka-blue/10">
            <History className="mr-2 h-4 w-4" />
            {isKannada ? 'ಇತಿಹಾಸ' : 'History'}
          </Button>
        </div>
        
        <div className="text-sm text-karnataka-gray">
          <p><strong>{isKannada ? 'ಕಾರ್ಡ್ ನಂಬರ್:' : 'Card Number:'}</strong> **** **** **** 1234</p>
          <p><strong>{isKannada ? 'ಮುಕ್ತಾಯ ದಿನಾಂಕ:' : 'Expiry Date:'}</strong> 12/26</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportCard;
