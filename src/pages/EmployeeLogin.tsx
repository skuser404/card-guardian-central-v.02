
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, UserCheck, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EmployeeLogin = () => {
  const [isKannada, setIsKannada] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLanguageChange = (value: boolean) => {
    setIsKannada(value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if employee exists in the database
      const { data: employee, error } = await supabase
        .from('bus_employees')
        .select('*')
        .eq('employee_id', employeeId)
        .single();

      if (error || !employee) {
        toast({
          title: isKannada ? "ದೋಷ" : "Error",
          description: isKannada 
            ? "ಉದ್ಯೋಗಿ ಗುರುತಿಸುವಿಕೆ ಸಂಖ್ಯೆ ಕಂಡುಬಂದಿಲ್ಲ" 
            : "Employee ID not found",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // For demo purposes, check if password matches a simple pattern
      // In production, this should be properly hashed and verified
      const expectedPassword = `pass${employeeId.slice(-4)}`;
      
      if (password !== expectedPassword) {
        toast({
          title: isKannada ? "ದೋಷ" : "Error",
          description: isKannada 
            ? "ತಪ್ಪು ಪಾಸ್‌ವರ್ಡ್" 
            : "Incorrect password",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Store employee data in session storage for the portal
      sessionStorage.setItem('employee_data', JSON.stringify(employee));
      
      toast({
        title: isKannada ? "ಯಶಸ್ವಿಯಾಗಿ ಲಾಗಿನ್ ಆಗಿದೆ" : "Login Successful",
        description: isKannada 
          ? `ಸ್ವಾಗತ, ${employee.full_name}` 
          : `Welcome, ${employee.full_name}`,
      });

      navigate("/employee-portal");
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: isKannada ? "ದೋಷ" : "Error",
        description: isKannada 
          ? "ಲಾಗಿನ್ ಸಮಯದಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ" 
          : "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header isKannada={isKannada} onLanguageChange={handleLanguageChange} />
        
        <main className="my-8">
          <div className="flex items-center gap-2 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="hover:bg-karnataka-blue/10"
            >
              &larr; {isKannada ? "ಹಿಂದೆ" : "Back"}
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-karnataka-red">
              {isKannada ? "ಉದ್ಯೋಗಿ ಲಾಗಿನ್" : "Employee Login"}
            </h1>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <UserCheck className="h-6 w-6 text-karnataka-blue" />
                  {isKannada ? "ಉದ್ಯೋಗಿ ಪ್ರವೇಶ" : "Employee Access"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">
                      {isKannada ? "ಉದ್ಯೋಗಿ ಗುರುತಿಸುವಿಕೆ ಸಂಖ್ಯೆ" : "Employee ID"}
                    </Label>
                    <Input
                      id="employeeId"
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      placeholder={isKannada ? "ಉದಾ: EMP001" : "e.g. EMP001"}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      {isKannada ? "ಪಾಸ್‌ವರ್ಡ್" : "Password"}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={isKannada ? "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ" : "Enter your password"}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-karnataka-red hover:bg-karnataka-red/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                        {isKannada ? "ಲಾಗಿನ್ ಆಗುತ್ತಿದೆ..." : "Logging in..."}
                      </span>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        {isKannada ? "ಲಾಗಿನ್" : "Login"}
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">
                    {isKannada ? "ಮಾದರಿ ಲಾಗಿನ್ ಮಾಹಿತಿ:" : "Sample Login Credentials:"}
                  </h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>{isKannada ? "ಉದ್ಯೋಗಿ ID:" : "Employee ID:"}</strong> EMP001</p>
                    <p><strong>{isKannada ? "ಪಾಸ್‌ವರ್ಡ್:" : "Password:"}</strong> pass001</p>
                    <p className="text-xs mt-2">
                      {isKannada 
                        ? "ಪಾಸ್‌ವರ್ಡ್ ಫಾರ್ಮ್ಯಾಟ್: pass + ಉದ್ಯೋಗಿ ID ಯ ಕೊನೆಯ 4 ಅಂಕಿಗಳು" 
                        : "Password format: pass + last 4 digits of Employee ID"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default EmployeeLogin;
