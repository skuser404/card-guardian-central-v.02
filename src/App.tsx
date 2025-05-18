
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import BmtcPortal from "./pages/BmtcPortal";
import MetroPortal from "./pages/MetroPortal";
import KsrtcPortal from "./pages/KsrtcPortal";
import AutoTaxiPortal from "./pages/AutoTaxiPortal";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeePortal from "./pages/EmployeePortal";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => {
  const [isKannada, setIsKannada] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check current auth status
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLanguageChange = (value: boolean) => {
    setIsKannada(value);
  };

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                  <Index /> : 
                  <Navigate to="/auth" replace />
              } 
            />
            <Route 
              path="/auth" 
              element={
                isAuthenticated ? 
                  <Navigate to="/" replace /> : 
                  <AuthPage isKannada={isKannada} onLanguageChange={handleLanguageChange} />
              } 
            />
            <Route path="/bmtc" element={<BmtcPortal />} />
            <Route path="/metro" element={<MetroPortal />} />
            <Route path="/ksrtc" element={<KsrtcPortal />} />
            <Route path="/auto-taxi" element={<AutoTaxiPortal />} />
            <Route path="/employee-login" element={<EmployeeLogin />} />
            <Route 
              path="/employee-portal" 
              element={
                isAuthenticated ? 
                  <EmployeePortal /> : 
                  <Navigate to="/employee-login" replace />
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
