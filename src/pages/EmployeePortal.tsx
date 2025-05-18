
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, LogOut, User, Bus, Info, MapPin, Calendar } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Employee = {
  id: string;
  employee_id: string;
  full_name: string;
  gender: string;
  phone_number: string | null;
  address: string | null;
  department: string;
  experience_years: number | null;
  remarks: string | null;
};

type SalaryHistory = {
  id: string;
  amount: number;
  effective_date: string;
  remarks: string | null;
};

const EmployeePortal = () => {
  const navigate = useNavigate();
  const [isKannada, setIsKannada] = useState(false);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [salaryHistory, setSalaryHistory] = useState<SalaryHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLanguageChange = (value: boolean) => {
    setIsKannada(value);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        
        if (!data.user) {
          navigate('/employee-login');
          return;
        }

        // Load employee data
        const { data: empData, error: empError } = await supabase
          .from('bus_employees')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        if (empError || !empData) {
          console.error("Employee data error:", empError);
          navigate('/employee-login');
          return;
        }

        setEmployee(empData as Employee);

        // Load salary history
        const { data: salData, error: salError } = await supabase
          .from('salary_history')
          .select('*')
          .eq('employee_id', empData.id)
          .order('effective_date', { ascending: false });

        if (salError) {
          console.error("Salary history error:", salError);
        } else {
          setSalaryHistory(salData as SalaryHistory[]);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        navigate('/employee-login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: isKannada ? "ಲಾಗ್ಔಟ್ ಯಶಸ್ವಿ" : "Logout Successful",
        description: isKannada 
          ? "ನೀವು ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್ ಔಟ್ ಮಾಡಿದ್ದೀರಿ" 
          : "You have been successfully logged out",
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: isKannada ? "ಲಾಗ್ಔಟ್ ವಿಫಲವಾಗಿದೆ" : "Logout Failed",
        description: isKannada 
          ? "ಲಾಗ್ ಔಟ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ, ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ" 
          : "Failed to log out, please try again",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-karnataka-blue border-t-transparent rounded-full mb-4 mx-auto"></div>
          <p>{isKannada ? "ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ..." : "Loading information..."}</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return null; // This should be caught by the useEffect and redirect to login
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isKannada ? 'kn-IN' : 'en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat(isKannada ? 'kn-IN' : 'en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen relative">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header isKannada={isKannada} onLanguageChange={handleLanguageChange} />
        
        <main className="my-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
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
                {isKannada ? "ಉದ್ಯೋಗಿ ಪೋರ್ಟಲ್" : "Employee Portal"}
              </h1>
            </div>
            
            <Button 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isKannada ? "ಲಾಗ್ ಔಟ್" : "Logout"}
            </Button>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="profile">{isKannada ? "ಪ್ರೊಫೈಲ್" : "Profile"}</TabsTrigger>
              <TabsTrigger value="salary">{isKannada ? "ಸಂಬಳ ಇತಿಹಾಸ" : "Salary History"}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    {isKannada ? "ಉದ್ಯೋಗಿ ಪ್ರೊಫೈಲ್" : "Employee Profile"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-32 h-32 bg-karnataka-blue/10 rounded-full flex items-center justify-center mx-auto md:mx-0">
                      <User className="h-16 w-16 text-karnataka-blue" />
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{employee.full_name}</h2>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Bus className="mr-1 h-4 w-4" />
                        <span>{employee.department}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Info className="mr-1 h-4 w-4" />
                        <span>
                          {isKannada ? "ಉದ್ಯೋಗಿ ID: " : "Employee ID: "} 
                          <span className="font-mono">{employee.employee_id}</span>
                        </span>
                      </div>
                      <div className="border-t border-gray-200 my-3"></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                        <div>
                          <div className="text-sm text-gray-500">
                            {isKannada ? "ಲಿಂಗ" : "Gender"}
                          </div>
                          <div>{employee.gender}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500">
                            {isKannada ? "ಅನುಭವ" : "Experience"}
                          </div>
                          <div>
                            {employee.experience_years !== null ? (
                              <>{employee.experience_years} {isKannada ? "ವರ್ಷಗಳು" : "years"}</>
                            ) : (
                              <span className="text-gray-400">{isKannada ? "ನಮೂದಿಸಿಲ್ಲ" : "Not specified"}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {isKannada ? "ಸಂಪರ್ಕ ಮಾಹಿತಿ" : "Contact Information"}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 glassmorphism p-4 rounded-lg">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          {isKannada ? "ಫೋನ್ ನಂಬರ್" : "Phone Number"}
                        </div>
                        <div className="flex items-center">
                          {employee.phone_number ? (
                            employee.phone_number
                          ) : (
                            <span className="text-gray-400">{isKannada ? "ನಮೂದಿಸಿಲ್ಲ" : "Not specified"}</span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          {isKannada ? "ವಿಳಾಸ" : "Address"}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                          <div>
                            {employee.address ? (
                              employee.address
                            ) : (
                              <span className="text-gray-400">{isKannada ? "ನಮೂದಿಸಿಲ್ಲ" : "Not specified"}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {employee.remarks && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">
                        {isKannada ? "ಷರಾ" : "Remarks"}
                      </h3>
                      <div className="glassmorphism p-4 rounded-lg">
                        {employee.remarks}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="salary">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    {isKannada ? "ಸಂಬಳ ಇತಿಹಾಸ" : "Salary History"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {salaryHistory.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      {isKannada ? "ಯಾವುದೇ ಸಂಬಳ ಇತಿಹಾಸವಿಲ್ಲ" : "No salary history found"}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {salaryHistory.map((entry) => (
                        <div key={entry.id} className="glassmorphism p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-lg">
                                {formatAmount(entry.amount)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {isKannada ? "ಜಾರಿ ದಿನಾಂಕ: " : "Effective Date: "}
                                {formatDate(entry.effective_date)}
                              </div>
                            </div>
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                              {isKannada ? "ಅಂಗೀಕೃತ" : "Approved"}
                            </div>
                          </div>
                          
                          {entry.remarks && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <div className="text-xs text-gray-500 mb-1">
                                {isKannada ? "ಷರಾ:" : "Remarks:"}
                              </div>
                              <div className="text-sm">{entry.remarks}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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

export default EmployeePortal;
