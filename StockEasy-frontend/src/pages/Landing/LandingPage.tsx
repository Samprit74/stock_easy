import { Link } from "react-router-dom";
import {
  ArrowRight,
  Package,
  Sparkles,
  TrendingUp,
  Users,
  ShieldCheck,
  Receipt,
  Bell,
  BarChart3,
  Pill,
  CheckCircle,
  Star,
} from "lucide-react";
import heroImage from "@/assets/hero-medical.png";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const features = [
  {
    icon: <Package className="w-7 h-7" />,
    title: "Batch-level stock tracking",
    description:
      "Record every purchase with batch number, manufacture and expiry dates. Trace any unit back to its vendor and date.",
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: "FEFO with regular-customer override",
    description:
      "Sell oldest-expiring batches first to reduce waste. Frequent customers get the freshest batch automatically.",
  },
  {
    icon: <Bell className="w-7 h-7" />,
    title: "Near-expiry auto discount",
    description:
      "Batches with 7, 15 or 30 days to expiry get 20%, 10% or 5% off automatically. Cleared from the shelves before they expire.",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Low-stock rebuy alerts",
    description:
      "Per-medicine thresholds. Know what to rebuy before the shelf runs dry. Expired-stock script shows total loss in rupees.",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Customer frequency",
    description:
      "Track how often each customer buys. The more they buy, the fresher the medicine they receive on each visit.",
  },
  {
    icon: <Receipt className="w-7 h-7" />,
    title: "Sales & returns",
    description:
      "Paginated bill history, per-bill line items, one-click return that automatically restocks the batch.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Role-based access",
    description:
      "Admins manage suppliers, reports and users. Staff handle day-to-day sales and customers. JWT-secured.",
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: "Reports for owners",
    description:
      "Top medicines, top customers, daily revenue, total revenue — date range filters for any window you need.",
  },
];

const benefits = [
  "Cut medicine wastage with FEFO + automatic near-expiry discounts",
  "Stop running out — low-stock alerts tell you what to rebuy",
  "Reward your regulars with fresher batches on every visit",
  "See expired stock and the rupee value lost in one report",
  "Owners get reports; staff stay focused on the counter",
  "Own your data — clean REST API, JWT auth, role-based access",
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-orange-50 via-white to-orange-50 flex-1">
        <div className="container mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold mb-5">
              <Pill className="w-3.5 h-3.5" /> Pharmacy Stock Management
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stock <span className="text-gradient">made easy</span> for
              <br className="hidden md:block" /> your medicine shop
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Track stock by batch and expiry, sell the right medicine to the
              right customer, and never lose money to expired stock again.
              Built for pharmacy owners and their staff.
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
                See features
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              ADMIN and STAFF roles · JWT-secured REST API
            </p>
          </div>

          <div className="animate-slide-up flex justify-center">
            <div className="relative">
              <img
                src={heroImage}
                alt="StockEasy pharmacy dashboard"
                className="w-full max-w-md md:max-w-lg drop-shadow-2xl mx-auto"
              />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-100 rounded-full blur-xl opacity-60" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-200 rounded-full blur-xl opacity-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything a pharmacy needs,{" "}
              <span className="text-gradient">nothing it doesn't</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Eight focused capabilities, each one saving you time, money, or
              both. No bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-white border border-orange-100 hover:border-orange-300 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section-padding bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why pharmacy owners pick{" "}
              <span className="text-gradient">StockEasy</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We built StockEasy around the things that actually hurt pharmacy
              margins: expired stock, missed rebuy orders, and treating all
              customers the same.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800">{b}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-6 bg-white border border-orange-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Star className="w-5 h-5 text-orange-500 mr-2" />
                The StockEasy difference
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                A regular customer who buys from you every week should get the
                freshest medicine. Everyone else gets FEFO. That single rule
                keeps the regulars happy and the shelves turning.
              </p>
            </div>
          </div>

          {/* Visual stat callout */}
          <div className="space-y-4">
            <StatCard
              label="Expired-stock loss avoided"
              value="Up to 40%"
              description="with FEFO + auto-discount"
            />
            <StatCard
              label="Manual counting"
              value="5+ hours"
              description="saved per day"
            />
            <StatCard
              label="Bill lookup"
              value="Paginated"
              description="history + per-bill items"
            />
            <StatCard
              label="Roles"
              value="ADMIN + STAFF"
              description="JWT-secured endpoints"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-orange-500 to-orange-400 text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to take control of your stock?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Set up takes under a minute. Add your medicines, suppliers and
            customers — start selling smarter today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-orange-600 font-semibold hover:bg-orange-50 transition group"
            >
              Create an account
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

function StatCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl p-5 bg-white border border-orange-100 shadow-sm flex items-center gap-4">
      <div className="flex-1">
        <p className="text-xs uppercase tracking-wide text-orange-600 font-semibold">
          {label}
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}

export default LandingPage;
