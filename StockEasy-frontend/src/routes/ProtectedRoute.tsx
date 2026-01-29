// src/routes/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type ProtectedRouteProps = {
  children: JSX.Element;
  roles?: string[]; // optional role restriction
};

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  // not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // role restricted route
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
