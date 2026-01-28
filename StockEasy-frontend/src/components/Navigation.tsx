import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Pill } from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Buy Stock", path: "/buy-stock" },
  { name: "Sell Stock", path: "/sell-stock" },
  { name: "Medicines", path: "/medicines" },
  { name: "Customers", path: "/customers" },
  { name: "Suppliers", path: "/suppliers" },
  { name: "Reports", path: "/reports" },
  { name: "Profile", path: "/profile" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return (
        location.pathname === "/" ||
        location.pathname === "/dashboard"
      );
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-orange-100 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">
              StockEasy
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-orange-600 border-b-2 border-orange-500 pb-1"
                    : "text-muted-foreground hover:text-orange-500"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive(item.path)
                      ? "bg-orange-100 text-orange-600"
                      : "text-muted-foreground hover:bg-orange-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
