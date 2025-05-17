
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthProps {
  isKannada?: boolean;
}

export const Auth = ({ isKannada = false }: AuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: email.split('@')[0], // Simple default name from email
          },
        },
      });
      if (error) throw error;
      toast({
        title: isKannada ? "ಖಾತೆ ರಚಿಸಲಾಗಿದೆ" : "Account created",
        description: isKannada 
          ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಮೇಲ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ" 
          : "Please check your email to confirm your signup",
      });
    } catch (error: any) {
      toast({
        title: isKannada ? "ನೋಂದಣಿ ವಿಫಲವಾಗಿದೆ" : "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: isKannada ? "ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ" : "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {isKannada ? "ಕರ್ನಾಟಕ ಸಾರ್ವತ್ರಿಕ ಸಾರಿಗೆ ಕಾರ್ಡ್" : "Karnataka Universal Transport Card"}
        </CardTitle>
        <CardDescription>
          {isKannada 
            ? "ನಿಮ್ಮ ಕಾರ್ಡ್ ಅನ್ನು ನಿರ್ವಹಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ" 
            : "Sign in to manage your transport card"}
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">{isKannada ? "ಲಾಗಿನ್" : "Login"}</TabsTrigger>
          <TabsTrigger value="signup">{isKannada ? "ಸೈನ್ ಅಪ್" : "Signup"}</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleSignIn}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {isKannada ? "ಇಮೇಲ್" : "Email"}
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  {isKannada ? "ಪಾಸ್‌ವರ್ಡ್" : "Password"}
                </label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading 
                  ? (isKannada ? "ಲಾಗಿನ್ ಆಗುತ್ತಿದೆ..." : "Logging in...") 
                  : (isKannada ? "ಲಾಗಿನ್" : "Login")}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        <TabsContent value="signup">
          <form onSubmit={handleSignUp}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <label htmlFor="signup-email" className="text-sm font-medium">
                  {isKannada ? "ಇಮೇಲ್" : "Email"}
                </label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="signup-password" className="text-sm font-medium">
                  {isKannada ? "ಪಾಸ್‌ವರ್ಡ್" : "Password"}
                </label>
                <Input 
                  id="signup-password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  {isKannada 
                    ? "ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳನ್ನು ಬಳಸಿ" 
                    : "Use at least 6 characters"}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading 
                  ? (isKannada ? "ಖಾತೆ ರಚಿಸಲಾಗುತ್ತಿದೆ..." : "Creating account...") 
                  : (isKannada ? "ಖಾತೆ ರಚಿಸಿ" : "Create Account")}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default Auth;
