import React from "react";
import { Navigate } from "react-router-dom";
import ResponsiveAppBar from "components/header/ResponsiveAppBar";
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
  return (
    <>
      <ResponsiveAppBar />
      {children}
    </>
  );
};

export default PrivateRouteGuard;
