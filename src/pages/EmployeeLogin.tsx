
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [isKannada, setIsKannada] = useState(false);
  const [employeeId, setEmployeeId] = useState("EMP001");
  const [password, setPassword] = useState("admin001");
  const [email, setEmail] = useState("sk9030973224@gmail.com");
  const [loading, setLoading] = useState(false);

  // Sample data comment - These accounts are available for testing:
  // Regular Employee: Email: sk9030973224@gmail.com, ID: EMP001, Password: admin001
  // Admin: Email: admin, Password: admin

  const handleLanguageChange = (value: boolean) => {
    setIsKannada(value);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        navigate('/employee-portal');
      }
    };
    
    checkAuth();

    // Add sample data to the database if it doesn't exist
    const addSampleData = async () => {
      try {
        // Check if sample employee exists
        const { data: existingEmployees } = await supabase
          .from('bus_employees')
          .select('id')
          .eq('employee_id', 'EMP001')
          .limit(1);
          
        // Only add sample data if it doesn't exist
        if (existingEmployees && existingEmployees.length === 0) {
          // Sample employee data
          const sampleEmployees = [
            {
              employee_id: 'EMP001',
              full_name: 'Rajesh Kumar',
              gender: 'Male',
              department: 'Operations',
              phone_number: '9876543210',
              address: '123 MG Road, Bangalore',
              experience_years: 8,
              remarks: 'Senior driver with excellent safety record'
            },
            {
              employee_id: 'EMP002',
              full_name: 'Priya Sharma',
              gender: 'Female',
              department: 'Administration',
              phone_number: '8765432109',
              address: '456 Brigade Road, Bangalore',
              experience_years: 5,
              remarks: 'Handles scheduling and administrative duties'
            },
            {
              employee_id: 'EMP003',
              full_name: 'Suresh Rao',
              gender: 'Male',
              department: 'Maintenance',
              phone_number: '7654321098',
              address: '789 Residency Road, Bangalore',
              experience_years: 12,
              remarks: 'Expert mechanic specialized in engine repair'
            }
          ];
          
          // Insert sample employees
          await supabase.from('bus_employees').insert(sampleEmployees);
          
          // Sample salary history
          const { data: employees } = await supabase
            .from('bus_employees')
            .select('id, employee_id')
            .in('employee_id', ['EMP001', 'EMP002', 'EMP003']);
            
          if (employees && employees.length > 0) {
            const salaryHistory = [];
            
            // Create salary history for each employee
            for (const emp of employees) {
              // Current salary
              salaryHistory.push({
                employee_id: emp.id,
                amount: emp.employee_id === 'EMP001' ? 45000 : (emp.employee_id === 'EMP002' ? 38000 : 42000),
                effective_date: new Date().toISOString().split('T')[0],
                remarks: 'Current salary'
              });
              
              // Previous salary (6 months ago)
              const prevDate = new Date();
              prevDate.setMonth(prevDate.getMonth() - 6);
              salaryHistory.push({
                employee_id: emp.id,
                amount: emp.employee_id === 'EMP001' ? 42000 : (emp.employee_id === 'EMP002' ? 35000 : 39000),
                effective_date: prevDate.toISOString().split('T')[0],
                remarks: 'Previous salary'
              });
              
              // Initial salary (1 year ago)
              const initialDate = new Date();
              initialDate.setFullYear(initialDate.getFullYear() - 1);
              salaryHistory.push({
                employee_id: emp.id,
                amount: emp.employee_id === 'EMP001' ? 38000 : (emp.employee_id === 'EMP002' ? 32000 : 36000),
                effective_date: initialDate.toISOString().split('T')[0],
                remarks: 'Initial salary'
              });
            }
            
            // Insert salary history
            await supabase.from('salary_history').insert(salaryHistory);
          }
          
          console.log('Sample data added successfully');
        }
      } catch (error) {
        console.error('Error adding sample data:', error);
      }
    };
    
    // Call the function to add sample data
    addSampleData();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let loginResult;

      if (email === "admin" && password === "admin") {
        // Admin login - use special credentials
        loginResult = await supabase.auth.signInWithPassword({
          email: "admin@ksrtc.org", // Fixed admin email in the database
          password: "admin_password" // Fixed admin password
        });
      } else {
        // Regular employee login
        loginResult = await supabase.auth.signInWithPassword({
          email,
          password
        });
      }

      if (loginResult.error) {
        throw loginResult.error;
      }

      toast({
        title: isKannada ? "ಲಾಗ್ಇನ್ ಯಶಸ್ವಿ" : "Login Successful",
        description: isKannada 
          ? "ನೀವು ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್ಇನ್ ಆಗಿದ್ದೀರಿ" 
          : "You have been successfully logged in",
      });
      
      navigate('/employee-portal');
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: isKannada ? "ಲಾಗ್ಇನ್ ವಿಫಲವಾಗಿದೆ" : "Login Failed",
        description: error.message || (isKannada 
          ? "ಲಾಗ್ಇನ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ, ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ" 
          : "Failed to login, please check your credentials and try again"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header isKannada={isKannada} onLanguageChange={handleLanguageChange} />
        
        <main className="my-8 flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-karnataka-blue">
                {isKannada ? "ಉದ್ಯೋಗಿ ಲಾಗಿನ್" : "Employee Login"}
              </CardTitle>
              <CardDescription>
                {isKannada 
                  ? "ನಿಮ್ಮ ಕೆಎಸ್ಆರ್‌ಟಿಸಿ ಉದ್ಯೋಗಿ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ" 
                  : "Login to your KSRTC employee account"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {isKannada ? "ಇಮೇಲ್" : "Email"}
                  </Label>
                  <Input 
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isKannada ? "ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ" : "Enter your email"}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee-id">
                    {isKannada ? "ಉದ್ಯೋಗಿ ID" : "Employee ID"}
                  </Label>
                  <Input 
                    id="employee-id"
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder={isKannada ? "ನಿಮ್ಮ ಉದ್ಯೋಗಿ ID ನಮೂದಿಸಿ" : "Enter your employee ID"}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isKannada ? "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ" : "Enter your password"}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-karnataka-blue hover:bg-karnataka-blue/90"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isKannada ? "ಲಾಗಿನ್ ಆಗುತ್ತಿದೆ..." : "Logging in..."}
                    </span>
                  ) : (
                    <span>{isKannada ? "ಲಾಗಿನ್" : "Login"}</span>
                  )}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm">
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-yellow-800">
                  <p className="font-medium">{isKannada ? "ಸೂಚನೆ" : "Note"}</p>
                  <p className="text-xs mt-1">
                    {isKannada 
                      ? "ಲಾಗಿನ್ ಮಾಡಲು ಸಹಾಯ ಬೇಕಾದರೆ, ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಿಭಾಗದ ಮುಖ್ಯಸ್ಥರನ್ನು ಸಂಪರ್ಕಿಸಿ" 
                      : "For login assistance, please contact your department head"}
                  </p>
                  <p className="text-xs mt-1 font-bold">
                    Test Login: Email: sk9030973224@gmail.com, ID: EMP001, Password: admin001
                  </p>
                  <p className="text-xs mt-1 font-bold">
                    Admin Login: Email: admin, Password: admin
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default EmployeeLogin;
