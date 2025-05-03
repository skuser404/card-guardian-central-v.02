
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BmtcPortal from "./pages/BmtcPortal";
import MetroPortal from "./pages/MetroPortal";
import KsrtcPortal from "./pages/KsrtcPortal";
import AutoTaxiPortal from "./pages/AutoTaxiPortal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bmtc" element={<BmtcPortal />} />
          <Route path="/metro" element={<MetroPortal />} />
          <Route path="/ksrtc" element={<KsrtcPortal />} />
          <Route path="/auto-taxi" element={<AutoTaxiPortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
