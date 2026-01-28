import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Pages */
import LandingPage from "./pages/Landing/LandingPage";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import DashboardPage from "./pages/Dashboard/DashboardPage";
import BuyStockPage from "./pages/Stock/BuyStockPage";
import SellStockPage from "./pages/Stock/SellStockPage";
import MedicinesPage from "./pages/Medicines/MedicinesPage";
import CustomersPage from "./pages/Customers/CustomersPage";
import SuppliersPage from "./pages/Suppliers/SuppliersPage";
import ReportsPage from "./pages/Reports/ReportsPage";
import ProfilePage from "./pages/Profile/ProfilePage";

const queryClient = new QueryClient();

const App1 = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter
      future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
      >
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* App */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/buy-stock" element={<BuyStockPage />} />
          <Route path="/sell-stock" element={<SellStockPage />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App1;
