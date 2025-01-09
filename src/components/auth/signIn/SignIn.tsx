import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Card,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { useApiErrorHandler } from "hooks/useApiErrorHandler";
import { authApiService } from "api/services/auth";
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
}));

type SignInData = {
  userName: string;
  password: string;
};

const SignIn = () => {
  const [formData, setFormData] = useState<SignInData>({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignInData>({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { handleApiError, apiErrors, clearApiErrors } = useApiErrorHandler();
  const location = useLocation();

  // Destructure state values
  const { username, message, success } = location.state || {};

  useEffect(() => {
    if (username) {
      // Pre-fill the username field
      setFormData((prev) => ({ ...prev, userName: username }));
    }
  }, [username]);

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
      case "userName":
        newErrors.userName = value.trim() === "" ? "Username is required" : "";
        break;
      case "password":
        newErrors.password = value.trim() === "" ? "Password is required" : "";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = Object.values(errors).every((error) => !error);
    if (isValid) {
      try {
        const response = await authApiService.login(formData);
        setLoading(true);
        login(response.accessToken);
        navigate("/");
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <StyledCard>
      <Typography variant="h4" gutterBottom>
        Sign In to Your Account
      </Typography>

      {/* Display success or error message */}
      {message && (
        <Alert severity={success ? "success" : "error"} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {apiErrors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiErrors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="userName"
          type="text"
          value={formData.userName}
          onChange={handleChange}
          error={!!errors.userName}
          helperText={errors.userName}
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
  );
};

export default SignIn;
