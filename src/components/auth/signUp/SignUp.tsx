import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Card,
  InputAdornment,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import { SelectChangeEvent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { authApiService } from "api/services/auth";
import { useApiErrorHandler } from "hooks/useApiErrorHandler";
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
}));

type SignUpData = {
  name: string;
  address: string;
  gender: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<SignUpData>;

const Signup = () => {
  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    address: "",
    gender: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  // Separate states for form validation errors and API errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  // const [apiErrors, setApiErrors] = useState<string[]>([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { handleApiError, apiErrors, clearApiErrors } = useApiErrorHandler();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
    validateField(name as keyof SignUpData, value as string);
    // Clear API errors when user starts typing
    // setApiErrors([]);
    clearApiErrors();
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
    validateField("gender", value);
    // setApiErrors([]);
    clearApiErrors();
  };

  const validateField = (name: keyof SignUpData, value: string) => {
    const newErrors = { ...formErrors };

    switch (name) {
      case "name":
        newErrors.name = value.trim() === "" ? "Name is required" : "";
        break;
      case "userName":
        newErrors.userName = value.trim() === "" ? "userName is required" : "";
        break;
      case "password":
        newErrors.password = value.trim() === "" ? "Password is required" : "";
        newErrors.password =
          value.length < 8 ? "Password must be at least 8 characters long" : "";
          const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

          if (!passwordRegex.test(value)) {
            newErrors.password =
              "Password must contain at least one number and one special character";
          }
        if (formData.confirmPassword) {
          newErrors.confirmPassword =
            value !== formData.confirmPassword ? "Passwords do not match" : "";
        }
        break;
      case "confirmPassword":
        newErrors.confirmPassword =
          value.trim() === "" ? "Confirm Password is required" : "";
        newErrors.confirmPassword =
          value !== formData.password ? "Passwords do not match" : "";
        break;
      case "gender":
        newErrors.gender = value.trim() === "" ? "Gender is required" : "";
        break;
      default:
        break;
    }

    setFormErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = Object.values(formErrors).every((error) => !error);

    if (isValid) {
      try {
        const response = await authApiService.register(formData);
        setLoading(true);
        console.log(response.message);
        navigate("/login", {
          state: {
            username: formData.userName,
            message: "user registration success",
            success: true,
          },
        });
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
        Create Your Account
      </Typography>

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
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!formErrors.name}
          helperText={formErrors.name}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Username"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          error={!!formErrors.userName}
          helperText={formErrors.userName}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Gender</InputLabel>
          <Select
            value={formData.gender}
            onChange={handleSelectChange}
            label="Gender"
            error={!!formErrors.gender}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {formErrors.gender && (
            <Typography color="error">{formErrors.gender}</Typography>
          )}
        </FormControl>
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          // value='Gopak@91456'
          value={formData.password}
          onChange={handleChange}
          error={!!formErrors.password}
          helperText={formErrors.password}
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Password must be at least 8 characters long">
                  <IconButton size="small">
                    <FaInfoCircle />
                  </IconButton>
                </Tooltip>
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
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          // value='Gopak@91456'
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!formErrors.confirmPassword}
          helperText={formErrors.confirmPassword}
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Password and confirm password should match">
                  <IconButton size="small">
                    <FaInfoCircle />
                  </IconButton>
                </Tooltip>
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
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
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "underline", color: "#1976d2" }}
          >
            Login here
          </Link>
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={
            Object.values(formErrors).some((error) => error) ||
            apiErrors.length > 0 ||
            loading
          }
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>
      </form>
    </StyledCard>
  );
};

export default Signup;
