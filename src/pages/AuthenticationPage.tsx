import React from "react";
import { Grid, Box, Typography, Card } from "@mui/material";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import Signup from "../components/auth/signUp/SignUp";
import SignIn from "../components/auth/signIn/SignIn";
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
}));

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const ImageContainer = styled(Box)({
  width: "100%",
  height: "300px",
  overflow: "hidden",
  borderRadius: "12px",
  marginBottom: "24px",
});
const pageContent: Record<
  string,
  { title: string; description: string; imageUrl: string }
> = {
  "/login": {
    title: "Welcome Back",
    description:
      "Please sign in to continue your journey with us. We’ve missed you!",
    imageUrl: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2",
  },
  "/register": {
    title: "Join Our Community",
    description: "Sign up today and become part of our amazing community.",
    imageUrl: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2",
  },
};
const defaultContent = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  imageUrl: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1",
};
const AuthenticationPage = () => {
  const renderContent = () => {
    switch (location.pathname) {
      case "/login":
        return <SignIn />;
      case "/register":
        return <Signup />;
      default:
        return (
          <Typography variant="h6" color="error">
            Invalid Path! Please navigate to a valid page.
          </Typography>
        );
    }
  };

  const location = useLocation();
  const { title, description, imageUrl } =
    pageContent[location.pathname] || defaultContent;
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid item xs={12} md={6}>
        <StyledCard elevation={0}>
          <ImageContainer>
            <StyledImage
              src={imageUrl}
              alt="People collaborating"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1";
              }}
            />
          </ImageContainer>
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {description}
          </Typography>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6}>
        {renderContent()}
      </Grid>
    </Grid>
  );
};

export default AuthenticationPage;
