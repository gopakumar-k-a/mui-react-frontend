import React from "react";
import { Navigate } from "react-router-dom";

interface RouteGuardProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const PrivateRouteGuard: React.FC<RouteGuardProps> = ({
  isAuthenticated,
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default PrivateRouteGuard