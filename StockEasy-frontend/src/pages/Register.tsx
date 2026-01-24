import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Pill, User, Building, Mail, Lock, MapPin, Phone, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-medical.png';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    businessName: '',
    country: '',
    city: '',
    state: '',
    streetNumber: '',
    pinCode: '',
    email: '',
    phoneNumber: '',
    alternativePhone: '',
    gstNumber: '',
    aadhaarNumber: '',
    panCardNumber: '',
    certificateNumber: '',
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
    const requiredFields = ['firstName', 'lastName', 'businessName', 'email', 'phoneNumber', 'aadhaarNumber', 'certificateNumber', 'password'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description: "Your account is pending verification by admin. You'll receive an email once approved.",
      });
      setIsLoading(false);
      // In a real app, you would redirect or show a success page
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="section-padding bg-gradient-to-br from-orange-50 to-white">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Form */}
            <div className="max-w-xl mx-auto w-full">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl flex items-center justify-center">
                    <Pill className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-foreground">StockEasy</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Create Your Account
                </h1>
                <p className="text-muted-foreground">
                  Join thousands of pharmacy owners managing their inventory efficiently
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-white rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <User className="w-5 h-5 text-primary mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="input-primary"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Middle Name</label>
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        className="input-primary"
                        placeholder="Middle Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="input-primary"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="bg-white rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Building className="w-5 h-5 text-primary mr-2" />
                    Business Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Business Name *</label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="input-primary"
                        placeholder="Your Pharmacy Name"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="input-primary"
                          placeholder="Country"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="input-primary"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="input-primary"
                          placeholder="State"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Street Number</label>
                        <input
                          type="text"
                          name="streetNumber"
                          value={formData.streetNumber}
                          onChange={handleInputChange}
                          className="input-primary"
                          placeholder="Street Number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Pin Code</label>
                        <input
                          type="text"
                          name="pinCode"
                          value={formData.pinCode}
                          onChange={handleInputChange}
                          className="input-primary"
                          placeholder="Pin Code"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-2" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email ID *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-primary"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="input-primary"
                          placeholder="Phone Number"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Alternative Phone</label>
                        <input
                          type="tel"
                          name="alternativePhone"
                          value={formData.alternativePhone}
                          onChange={handleInputChange}
                          className="input-primary"
                          placeholder="Alternative Phone"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legal Documents */}
                <div className="bg-white rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-primary mr-2" />
                    Legal Documents
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">GST Number</label>
                        <input
                          type="text"
                          name="gstNumber"
                          value={formData.gstNumber}
                          onChange={handleInputChange}
                          className="input-primary"
                          placeholder="GST Number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Aadhaar Number *</label>
                        <input
                          type="text"
                          name="aadhaarNumber"
                          value={formData.aadhaarNumber}
                          onChange={handleInputChange}
                          className="input-primary"
                          placeholder="Aadhaar Number"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Pan Card Number</label>
                        <input
                          type="text"
                          name="panCardNumber"
                          value={formData.panCardNumber}
                          onChange={handleInputChange}
                          className="input-primary"
                          placeholder="Pan Card Number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Certificate Number *</label>
                        <input
                          type="text"
                          name="certificateNumber"
                          value={formData.certificateNumber}
                          onChange={handleInputChange}
                          className="input-primary"
                          placeholder="Pharmacy License Certificate"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="bg-white rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Lock className="w-5 h-5 text-primary mr-2" />
                    Account Security
                  </h3>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="input-primary pr-12"
                      placeholder="Create a strong password"
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
                  {isLoading ? 'Creating Account...' : 'REGISTER'}
                </button>

                <div className="text-center">
                  <span className="text-muted-foreground">Have you already an account? </span>
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary-dark transition-colors font-medium"
                  >
                    Sign In Here
                  </Link>
                </div>
              </form>
            </div>

            {/* Right Side - Info & Illustration */}
            <div className="hidden lg:block sticky top-8">
              <div className="bg-white rounded-xl p-8 border border-orange-200 mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  StockEasy
                </h3>
                <p className="text-muted-foreground mb-6">
                  Now it is very easy to maintain stock.<br />
                  Save your time and enjoy the day.
                </p>
                <div className="relative">
                  <img
                    src={heroImage}
                    alt="Medicine Stock Management"
                    className="w-full max-w-md mx-auto drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;