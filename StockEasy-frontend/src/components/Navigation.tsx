import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Pill, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type NavItem = {
  name: string;
  path: string;
  roles?: string[]; // optional role restriction
};

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Buy Stock", path: "/buy-stock" },
  { name: "Sell Stock", path: "/sell-stock" },
  { name: "Medicines", path: "/medicines" },
  { name: "Customers", path: "/customers" },
  { name: "Sales", path: "/sales" },
  { name: "Stock Tools", path: "/stock-tools" },

  // ADMIN ONLY
  { name: "Suppliers", path: "/suppliers", roles: ["ROLE_ADMIN"] },
  { name: "Purchases", path: "/purchases", roles: ["ROLE_ADMIN"] },
  { name: "Reports", path: "/reports", roles: ["ROLE_ADMIN"] },
  { name: "Users", path: "/users", roles: ["ROLE_ADMIN"] },

  { name: "Profile", path: "/profile" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // hide navbar if not logged in
  if (!isAuthenticated || !user) {
    return null;
  }

  // filter menu items by role
  const visibleNavItems = NAV_ITEMS.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(user.role);
  });

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
            <span className="text-xl font-bold">StockEasy</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {visibleNavItems.map((item) => (
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

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
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
              {visibleNavItems.map((item) => (
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

              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
