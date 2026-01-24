import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Pill, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-medical.png';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Login successful! Redirecting to dashboard...",
      });
      setIsLoading(false);
      // In a real app, you would redirect to the dashboard
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="section-padding bg-gradient-to-br from-orange-50 to-white">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Form */}
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl flex items-center justify-center">
                    <Pill className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-foreground">StockEasy</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground">
                  Now it is very easy to maintain stock.<br />
                  Save your time and enjoy the day.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email ID
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-primary pl-12"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="input-primary pl-12 pr-12"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing In...' : 'SIGN IN'}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    Forgot Password?
                  </Link>
                  <span className="text-muted-foreground">|</span>
                  <Link
                    to="/register"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    Create new account
                  </Link>
                </div>
              </form>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Medicine Stock Management"
                  className="w-full max-w-lg mx-auto drop-shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-100 rounded-full blur-xl opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-200 rounded-full blur-xl opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;