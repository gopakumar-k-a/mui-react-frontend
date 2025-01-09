import React from "react";
import { Navigate } from "react-router-dom";
import ResponsiveAppBar from "components/header/ResponsiveAppBar";
import { Box } from "@mui/material";
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
      <Box style={{ marginBottom: "100px"  ,paddingTop: "20px"}}>
{/* <h1>hii</h1> */}
        {children}
      </Box>
    </>
  );
};

export default PrivateRouteGuard;
