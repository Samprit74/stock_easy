import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { registerApi } from "@/services/authApi";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-medical.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "STAFF">("STAFF");

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email and password are required",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      await registerApi({
        username: email,
        password,
        role,
      });

      toast({
        title: "Registration successful",
        description: "Please login to continue",
      });

      navigate("/login");
    } catch (err: any) {
      toast({
        title: "Registration failed",
        description: err?.message || "User already exists",
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
        <div className="container-width grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-xl border"
          >
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Pill /> Register
            </h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-primary"
              placeholder="Email (Username)"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-primary pr-10"
                placeholder="Password"
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

            {/* ROLE SELECT */}
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "ADMIN" | "STAFF")
              }
              className="input-primary"
            >
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </select>

            <button
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? "Registering..." : "REGISTER"}
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </p>
          </form>

          {/* IMAGE */}
          <div className="hidden lg:block">
            <img src={heroImage} alt="hero" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
