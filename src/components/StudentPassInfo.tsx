
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, FileText, CreditCard, Clock } from 'lucide-react';

interface StudentPassInfoProps {
  isKannada?: boolean;
}

const StudentPassInfo: React.FC<StudentPassInfoProps> = ({ isKannada = false }) => {
  const passInfo = {
    eligibility: isKannada 
      ? [
          "ಕರ್ನಾಟಕ ರಾಜ್ಯದ ನಿವಾಸಿಗಳು",
          "ಮಾನ್ಯತೆ ಪ್ರಾಪ್ತ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯಲ್ಲಿ ಅಧ್ಯಯನ ಮಾಡುತ್ತಿರುವವರು",
          "10ನೇ ತರಗತಿಯಿಂದ ಪದವಿ ಮಟ್ಟದವರೆಗೆ",
          "ವಯಸ್ಸು 15 ರಿಂದ 25 ವರ್ಷಗಳವರೆಗೆ"
        ]
      : [
          "Residents of Karnataka State",
          "Students of recognized educational institutions",
          "From 10th standard to graduation level",
          "Age between 15 to 25 years"
        ],
    documents: isKannada
      ? [
          "ಶಾಲೆ/ಕಾಲೇಜು ಗುರುತಿನ ಚೀಟಿ",
          "ವಿದ್ಯಾರ್ಥಿ ಪ್ರಮಾಣಪತ್ರ",
          "ಆಧಾರ್ ಕಾರ್ಡ್",
          "ನಿವಾಸ ಪ್ರಮಾಣಪತ್ರ",
          "ಪಾಸ್‌ಪೋರ್ಟ್ ಗಾತ್ರದ ಫೋಟೋ (2 ಪ್ರತಿಗಳು)"
        ]
      : [
          "School/College Identity Card",
          "Student Certificate",
          "Aadhar Card",
          "Residence Certificate",
          "Passport size photos (2 copies)"
        ],
    process: isKannada
      ? [
          "ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
          "ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
          "ಶುಲ್ಕ ಪಾವತಿ ಮಾಡಿ",
          "ದೃಢೀಕರಣಕ್ಕಾಗಿ ಕಾಯಿರಿ",
          "ಪಾಸ್ ಸಂಗ್ರಹಿಸಿ"
        ]
      : [
          "Submit online application",
          "Upload required documents",
          "Make payment",
          "Wait for verification",
          "Collect the pass"
        ],
    benefits: isKannada
      ? [
          "50% ರಿಯಾಯಿತಿ ಎಲ್ಲಾ KSRTC ಬಸ್‌ಗಳಲ್ಲಿ",
          "ಮಾಸಿಕ ಪಾಸ್ ಅಥವಾ ವಾರ್ಷಿಕ ಪಾಸ್ ಆಯ್ಕೆ",
          "ಸುಲಭ ನವೀಕರಣ ಪ್ರಕ್ರಿಯೆ",
          "ಎಲ್ಲಾ ಮಾರ್ಗಗಳಲ್ಲಿ ಮಾನ್ಯ"
        ]
      : [
          "50% discount on all KSRTC buses",
          "Monthly pass or annual pass option",
          "Easy renewal process",
          "Valid on all routes"
        ]
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-karnataka-blue" />
            {isKannada ? "ವಿದ್ಯಾರ್ಥಿ ಬಸ್ ಪಾಸ್ ಮಾಹಿತಿ" : "Student Bus Pass Information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-karnataka-red mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {isKannada ? "ಅರ್ಹತೆ" : "Eligibility"}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {passInfo.eligibility.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-karnataka-red mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {isKannada ? "ಅಗತ್ಯ ದಾಖಲೆಗಳು" : "Required Documents"}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {passInfo.documents.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-karnataka-red mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {isKannada ? "ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ" : "Application Process"}
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              {passInfo.process.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>

          <div>
            <h4 className="font-medium text-karnataka-red mb-2 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              {isKannada ? "ಪ್ರಯೋಜನಗಳು" : "Benefits"}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {passInfo.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>{isKannada ? "ಗಮನಿಸಿ:" : "Note:"}</strong>{" "}
              {isKannada 
                ? "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ KSRTC ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ಹತ್ತಿರದ KSRTC ಕಛೇರಿಗೆ ಭೇಟಿ ನೀಡಿ।"
                : "For more information, visit the official KSRTC website or visit the nearest KSRTC office."
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentPassInfo;
