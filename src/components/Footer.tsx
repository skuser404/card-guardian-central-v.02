
import { cn } from '@/lib/utils';

const Footer = () => {
  return (
    <footer className="w-full glassmorphism mt-6 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <img 
            src="/karnataka_emblem.png" 
            alt="Karnataka Emblem"
            className="h-12 w-12 object-contain"
            onError={(e) => {
              e.currentTarget.src = "https://ksrtc.karnataka.gov.in/frontend/img/StGoK.png";
            }}
          />
          <div>
            <p className="text-sm text-karnataka-blue font-semibold">Government of Karnataka</p>
            <p className="text-xs text-karnataka-gray">Transport Department</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <p className="text-xs text-center md:text-right text-karnataka-gray">
            © {new Date().getFullYear()} Karnataka Transport | All Rights Reserved
          </p>
          <div className="flex justify-center md:justify-end gap-4">
            <a href="#" className="text-karnataka-blue hover:text-karnataka-red transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-karnataka-blue hover:text-karnataka-red transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-karnataka-blue hover:text-karnataka-red transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
