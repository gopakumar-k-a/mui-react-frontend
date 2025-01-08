
import React from 'react';
import { Route, Navigate  } from 'react-router-dom';

interface RouteGuardProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

 const PublicRouteGuard: React.FC<RouteGuardProps> = ({
  isAuthenticated,
  children,
}) => {
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default PublicRouteGuard