import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Home as HomeIcon } from "lucide-react";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "8rem",
              fontWeight: "bold",
              color: "primary.main",
              mb: 2,
              "& .bounce": {
                display: "inline-block",
                animation: `${bounce} 2s infinite`,
              },
              "& .spin": {
                display: "inline-block",
                animation: `${spin} 3s infinite linear`,
              },
            }}
          >
            <span className="bounce">4</span>
            <span className="spin">0</span>
            <span className="bounce">4</span>
          </Typography>

          <Typography
            variant="h4"
            sx={{
              mb: 2,
              color: "text.primary",
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "text.secondary",
            }}
          >
            The page you're looking for doesn't exist or has been moved.
          </Typography>

          <Button
            onClick={() => navigate("/")}
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              transition: "all 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            Back to Home
          </Button>
        </Box>

        {[...Array(15)].map((_, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              width: "40px",
              height: "40px",
              backgroundColor: "primary.main",
              opacity: 0.1,
              borderRadius: 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `${float} ${3 + Math.random() * 3}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transform: "rotate(45deg)",
            }}
          />
        ))}
      </Container>
    </Box>
  );
};

export default Error404;
