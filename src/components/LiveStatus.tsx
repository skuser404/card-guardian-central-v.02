
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Clock, Wifi } from 'lucide-react';

interface LiveStatusProps {
  isKannada?: boolean;
}

const LiveStatus: React.FC<LiveStatusProps> = ({ isKannada = false }) => {
  const services = [
    {
      id: 1,
      name: isKannada ? 'ಬಿಎಂಟಿಸಿ ಬಸ್ಸುಗಳು' : 'BMTC Buses',
      status: 'operational',
      icon: CheckCircle,
      color: 'text-karnataka-green',
      bgColor: 'bg-karnataka-green/10',
      borderColor: 'border-karnataka-green/30'
    },
    {
      id: 2,
      name: isKannada ? 'ನಮ್ಮ ಮೆಟ್ರೋ' : 'Namma Metro',
      status: 'operational',
      icon: CheckCircle,
      color: 'text-karnataka-green',
      bgColor: 'bg-karnataka-green/10',
      borderColor: 'border-karnataka-green/30'
    },
    {
      id: 3,
      name: isKannada ? 'ಕೆಎಸ್ಆರ್‌ಟಿಸಿ ಬಸ್ಸುಗಳು' : 'KSRTC Buses',
      status: 'delayed',
      icon: Clock,
      color: 'text-karnataka-yellow',
      bgColor: 'bg-karnataka-yellow/10',
      borderColor: 'border-karnataka-yellow/30'
    },
    {
      id: 4,
      name: isKannada ? 'ಆಟೋ/ಟ್ಯಾಕ್ಸಿ ಸೇವೆಗಳು' : 'Auto/Taxi Services',
      status: 'maintenance',
      icon: AlertCircle,
      color: 'text-karnataka-red',
      bgColor: 'bg-karnataka-red/10',
      borderColor: 'border-karnataka-red/30'
    }
  ];

  const getStatusText = (status: string) => {
    if (isKannada) {
      switch (status) {
        case 'operational': return 'ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ';
        case 'delayed': return 'ವಿಳಂಬ';
        case 'maintenance': return 'ನಿರ್ವಹಣೆ';
        default: return 'ಅಜ್ಞಾತ';
      }
    } else {
      switch (status) {
        case 'operational': return 'Operational';
        case 'delayed': return 'Delayed';
        case 'maintenance': return 'Maintenance';
        default: return 'Unknown';
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-karnataka-blue mb-4">
        {isKannada ? 'ಸೇವಾ ನವೀಕರಣಗಳು' : 'Service Updates'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <Card key={service.id} className={`bg-white border ${service.borderColor}`}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center text-karnataka-blue">
                    <Wifi className="mr-2 h-4 w-4" />
                    {service.name}
                  </span>
                  <div className={`p-2 rounded-full ${service.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${service.color}`} />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${service.bgColor} ${service.color} border ${service.borderColor}`}>
                  {getStatusText(service.status)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LiveStatus;
