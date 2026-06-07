import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/routes/ProtectedRoute";

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
import UsersPage from "./pages/Users/UsersPage";
import SalesPage from "./pages/Sales/SalesPage";
import PurchasesPage from "./pages/Purchases/PurchasesPage";
import StockToolsPage from "./pages/StockTools/StockToolsPage";

const queryClient = new QueryClient();

const App1 = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Common (ADMIN + STAFF) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buy-stock"
              element={
                <ProtectedRoute>
                  <BuyStockPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sell-stock"
              element={
                <ProtectedRoute>
                  <SellStockPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/medicines"
              element={
                <ProtectedRoute>
                  <MedicinesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <CustomersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales"
              element={
                <ProtectedRoute>
                  <SalesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchases"
              element={
                <ProtectedRoute roles={["ROLE_ADMIN"]}>
                  <PurchasesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock-tools"
              element={
                <ProtectedRoute>
                  <StockToolsPage />
                </ProtectedRoute>
              }
            />

            {/* ADMIN ONLY */}
            <Route
              path="/suppliers"
              element={
                <ProtectedRoute roles={["ROLE_ADMIN"]}>
                  <SuppliersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute roles={["ROLE_ADMIN"]}>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute roles={["ROLE_ADMIN"]}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App1;
