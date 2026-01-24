import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  AlertTriangle,
  TrendingUp,
  Users,
  CheckCircle,
  Star,
} from "lucide-react";
import heroImage from "@/assets/hero-medical.png";
import robotImage from '@/assets/image.png';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Landing = () => {
  const features = [
    {
      icon: <Bell className="w-8 h-8 text-primary" />,
      title: "FEFO Notifications",
      description:
        "Get smart alerts for First Expiry First Out to minimize medicine wastage and maximize profits.",
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-primary" />,
      title: "Expiry Alerts",
      description:
        "Never lose money on expired medicines with timely notifications and automated reminders.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Business Growth Insights",
      description:
        "Track sales patterns, identify bestselling medicines, and make data-driven inventory decisions.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Sales & Customer Management",
      description:
        "Manage customer data, track purchase history, and generate professional bills instantly.",
    },
  ];

  const benefits = [
    "Reduce medicine wastage by up to 40%",
    "Increase profit margins through better inventory control",
    "Save 5+ hours daily on manual stock management",
    "Improve customer satisfaction with faster service",
    "Gain valuable business insights and reports",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-orange-50 to-white flex-1">
        <div className="container mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to <span className="text-gradient">StockEasy</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-primary font-semibold mb-4">
              Medicine Stock Management Made Simple
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Streamline your pharmacy inventory with FEFO notifications, expiry
              alerts, and business insights. Perfect for local medicine shop
              owners.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/register"
                className="btn-hero inline-flex items-center justify-center group"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/#features"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="animate-slide-up flex justify-center">
            <div className="relative">
              <img
                src={heroImage}
                alt="Medicine Stock Management Illustration"
                className="w-full max-w-md md:max-w-lg drop-shadow-2xl mx-auto"
              />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-100 rounded-full blur-xl opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-200 rounded-full blur-xl opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="section-padding bg-white border-t border-gray-100"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Your{" "}
              <span className="text-gradient">Pharmacy</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your medicine inventory efficiently
              and grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-orange-50 hover:bg-orange-100 rounded-xl p-6 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 text-center"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-orange-50">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-gradient">StockEasy</span>?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Built specifically for local medicine shop owners, StockEasy combines
              cutting-edge technology with practical features to solve real inventory
              management challenges.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 border border-orange-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Star className="w-6 h-6 text-primary mr-2" />
                Our USP: Minimizing Wastage, Maximizing Efficiency
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                StockEasy's intelligent FEFO system ensures you sell medicines with the
                earliest expiry dates first, dramatically reducing waste and increasing
                your profit margins.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={robotImage}
              alt="Why Choose StockEasy Illustration"
              className="w-full max-w-md rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Landing;
