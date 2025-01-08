import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  //   justifyContent: "center",
  padding: theme.spacing(4),
}));

const ImageContainer = styled(Box)({
  width: "100%",
  height: "300px",
  overflow: "hidden",
  borderRadius: "12px",
  marginBottom: "24px",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

type SignInData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignInData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let newErrors = { ...errors };

    switch (name) {
      case "email":
        newErrors.email = !/^\S+@\S+\.\S+$/.test(value)
          ? "Invalid email format"
          : "";
        break;
      //   case "password":
      //     newErrors.password =
      //       value.length < 8 ? "Password must be at least 8 characters long" : "";
      //     break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = Object.values(errors).every((error) => !error);
    if (isValid) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    // <Grid container sx={{ minHeight: "100vh" }}>
    // <Grid item xs={12} md={6}>
    //   <StyledCard elevation={0}>
    //     <ImageContainer>
    //       <StyledImage
    //         src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2"
    //         alt="People collaborating"
    //         onError={(e) => {
    //           (e.target as HTMLImageElement).src =
    //             "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1";
    //         }}
    //       />
    //     </ImageContainer>
    //     <Typography variant="h3" gutterBottom>
    //       Welcome Back
    //     </Typography>
    //     <Typography variant="body1" color="text.secondary" paragraph>
    //       Please sign in to continue your journey with us. We’ve missed you!
    //     </Typography>
    //   </StyledCard>
    // </Grid>

    <StyledCard>
      <Typography variant="h4" gutterBottom>
        Sign In to Your Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {/* <Tooltip title="Password must be at least 8 characters long">
                      <IconButton size="small">
                        <FaInfoCircle />
                      </IconButton>
                    </Tooltip> */}
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography
          variant="body2"
          align="right"
          sx={{ marginTop: 2, paddingBottom: 2 }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "underline", color: "#1976d2" }}
          >
            Sign Up here
          </Link>
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Sign In
        </Button>
      </form>
    </StyledCard>

    // {/* </Grid> */}
  );
};

export default SignIn;
