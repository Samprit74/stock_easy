import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Pill, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loginApi } from "@/services/authApi";
import { useAuth } from "@/context/AuthContext";
import heroImage from "@/assets/hero-medical.png";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginApi({
        username,
        password,
      });

      // ✅ USE REAL JWT FROM BACKEND
      login(response.token, {
        username: response.username,
        role: response.role,
      });

      toast({
        title: "Login successful",
        description: `Welcome ${response.username}`,
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="section-padding bg-gradient-to-br from-orange-50 to-white">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* FORM */}
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl flex items-center justify-center">
                    <Pill className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-3xl font-bold">StockEasy</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Username
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input-primary pl-12"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-primary pl-12 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-4"
                >
                  {isLoading ? "Signing In..." : "SIGN IN"}
                </button>

                <div className="text-sm text-center">
                  <Link to="/register" className="text-primary">
                    Create new account
                  </Link>
                </div>
              </form>
            </div>

            {/* IMAGE */}
            <div className="hidden lg:block">
              <img
                src={heroImage}
                alt="Stock Management"
                className="w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
