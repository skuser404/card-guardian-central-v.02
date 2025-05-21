
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Bus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [isKannada, setIsKannada] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("regular");

  const handleLanguageChange = (value: boolean) => {
    setIsKannada(value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      // Special case for the predefined user
      if (email === "sk9030973224@gmail.com" && password === "admin001" && employeeId === "EMP001") {
        // Create a temporary session
        toast({
          title: isKannada ? "ಯಶಸ್ವಿ ಲಾಗಿನ್!" : "Login successful!",
          description: isKannada 
            ? "ನಿಮ್ಮ ಉದ್ಯೋಗಿ ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ." 
            : "Welcome to your employee portal.",
        });
        
        // Navigate to employee dashboard
        navigate("/employee-portal");
        return;
      }
      
      // Regular login with email and password
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      if (authData?.user) {
        // Verify that the user is an employee by checking employeeId
        const { data: employeeData, error: employeeError } = await supabase
          .from("bus_employees")
          .select("*")
          .eq("user_id", authData.user.id)
          .eq("employee_id", employeeId)
          .single();

        if (employeeError || !employeeData) {
          await supabase.auth.signOut();
          throw new Error(isKannada 
            ? "ಉದ್ಯೋಗಿ ID ಅಮಾನ್ಯವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ." 
            : "Invalid employee ID. Please try again."
          );
        }

        toast({
          title: isKannada ? "ಯಶಸ್ವಿ ಲಾಗಿನ್!" : "Login successful!",
          description: isKannada 
            ? "ನಿಮ್ಮ ಉದ್ಯೋಗಿ ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ." 
            : "Welcome to your employee portal.",
        });
        
        // Navigate to employee dashboard
        navigate("/employee-portal");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
      toast({
        variant: "destructive",
        title: isKannada ? "ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ" : "Login Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      // Temporary admin credentials check
      if (email === "admin" && password === "admin") {
        // Create a temporary session
        toast({
          title: isKannada ? "ಯಶಸ್ವಿ ಲಾಗಿನ್!" : "Admin Login successful!",
          description: isKannada 
            ? "ನಿಮ್ಮ ಉದ್ಯೋಗಿ ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ." 
            : "Welcome to the employee portal admin.",
        });
        
        // Navigate to employee dashboard
        navigate("/employee-portal");
      } else {
        throw new Error(isKannada 
          ? "ಅಮಾನ್ಯ ನಿರ್ವಾಹಕ ಪ್ರಮಾಣಪತ್ರಗಳು." 
          : "Invalid admin credentials."
        );
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
      toast({
        variant: "destructive",
        title: isKannada ? "ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ" : "Login Failed",
        description: error.message,
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
          <div className="flex items-center gap-2 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="hover:bg-karnataka-blue/10"
            >
              &larr; {isKannada ? "ಹಿಂದೆ" : "Back"}
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-karnataka-blue flex items-center">
              <Shield className="mr-2 h-8 w-8 text-karnataka-blue" />
              {isKannada ? "ಉದ್ಯೋಗಿ ಲಾಗಿನ್" : "Employee Login"}
            </h1>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto max-w-md">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="regular">{isKannada ? "ಸಾಮಾನ್ಯ ಲಾಗಿನ್" : "Regular Login"}</TabsTrigger>
              <TabsTrigger value="admin">{isKannada ? "ನಿರ್ವಾಹಕ ಲಾಗಿನ್" : "Admin Login"}</TabsTrigger>
            </TabsList>

            <TabsContent value="regular">
              <Card className="mx-auto max-w-md">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 mb-4 bg-karnataka-blue/10 rounded-full flex items-center justify-center">
                    <Bus className="h-10 w-10 text-karnataka-blue" />
                  </div>
                  <CardTitle>
                    {isKannada ? "ಕರ್ನಾಟಕ ಸಾರಿಗೆ ಉದ್ಯೋಗಿ ಲಾಗಿನ್" : "Karnataka Transport Employee Login"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {errorMessage && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  )}
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">
                        {isKannada ? "ಉದ್ಯೋಗಿ ID" : "Employee ID"}
                      </Label>
                      <Input
                        id="employeeId"
                        placeholder={isKannada ? "ನಿಮ್ಮ ಉದ್ಯೋಗಿ ID ನಮೂದಿಸಿ" : "Enter your employee ID"}
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {isKannada ? "ಇಮೇಲ್" : "Email"}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={isKannada ? "ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ" : "Enter your email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">
                        {isKannada ? "ಪಾಸ್‌ವರ್ಡ್" : "Password"}
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder={isKannada ? "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ" : "Enter your password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-karnataka-blue"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>{isKannada ? "ಲಾಗಿನ್ ಆಗುತ್ತಿದೆ..." : "Logging in..."}</>
                      ) : (
                        <>{isKannada ? "ಲಾಗಿನ್" : "Login"}</>
                      )}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="text-center text-sm">
                  <p className="w-full">
                    {isKannada 
                      ? "ಉದ್ಯೋಗಿಯಾಗಿ ನೋಂದಾಯಿಸಲು, ದಯವಿಟ್ಟು ನಿಮ್ಮ ನಿರ್ವಾಹಕರನ್ನು ಸಂಪರ್ಕಿಸಿ"
                      : "To register as an employee, please contact your administrator"
                    }
                  </p>
                  <p className="w-full mt-2 text-gray-500">
                    Demo: EMP001 / sk9030973224@gmail.com / admin001
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card className="mx-auto max-w-md">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 mb-4 bg-karnataka-red/10 rounded-full flex items-center justify-center">
                    <Shield className="h-10 w-10 text-karnataka-red" />
                  </div>
                  <CardTitle>
                    {isKannada ? "ನಿರ್ವಾಹಕ ಲಾಗಿನ್" : "Administrator Login"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {errorMessage && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  )}
                  
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminUsername">
                        {isKannada ? "ಬಳಕೆದಾರ ಹೆಸರು" : "Username"}
                      </Label>
                      <Input
                        id="adminUsername"
                        placeholder={isKannada ? "ನಿರ್ವಾಹಕ ಬಳಕೆದಾರ ಹೆಸರು" : "Admin username"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword">
                        {isKannada ? "ಪಾಸ್‌ವರ್ಡ್" : "Password"}
                      </Label>
                      <Input
                        id="adminPassword"
                        type="password"
                        placeholder={isKannada ? "ನಿರ್ವಾಹಕ ಪಾಸ್‌ವರ್ಡ್" : "Admin password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-karnataka-red"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>{isKannada ? "ಲಾಗಿನ್ ಆಗುತ್ತಿದೆ..." : "Logging in..."}</>
                      ) : (
                        <>{isKannada ? "ನಿರ್ವಾಹಕರಾಗಿ ಲಾಗಿನ್" : "Login as Admin"}</>
                      )}
                    </Button>

                    <div className="text-center text-sm text-gray-500 mt-2">
                      <p>{isKannada ? "ತಾತ್ಕಾಲಿಕ ನಿರ್ವಾಹಕ: admin / admin" : "Temporary admin: admin / admin"}</p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default EmployeeLogin;
