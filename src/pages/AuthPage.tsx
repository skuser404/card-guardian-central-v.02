
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Auth from "@/components/Auth";
import { supabase } from "@/integrations/supabase/client";

interface AuthPageProps {
  isKannada?: boolean;
  onLanguageChange: (value: boolean) => void;
}

const AuthPage = ({ isKannada = false, onLanguageChange }: AuthPageProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in, if so redirect to home
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/");
      }
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  
  return (
    <div className="min-h-screen">
      <Header isKannada={isKannada} onLanguageChange={onLanguageChange} />
      
      <main className="container max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-karnataka-blue">
          {isKannada ? "ಪ್ರವೇಶ" : "Authentication"}
        </h1>
        
        <Auth isKannada={isKannada} />
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
