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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import { SelectChangeEvent } from "@mui/material";
import { Link } from "react-router-dom";
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  //   justifyContent: "center",
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

type SignUpData = {
  name: string;
  address: string;
  gender: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    address: "",
    gender: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<SignUpData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
    validateField(name as keyof SignUpData, value as string);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
    validateField("gender", value);
  };

  const validateField = (name: keyof SignUpData, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        newErrors.name = value.trim() === "" ? "Name is required" : "";
        break;
      case "username":
        newErrors.username = value.trim() === "" ? "Username is required" : "";
        break;
      case "password":
        newErrors.password = value.trim() === "" ? "password is required" : "";
        newErrors.password =
          value.length < 8 ? "Password must be at least 8 characters long" : "";
        if (formData.confirmPassword) {
          newErrors.confirmPassword =
            value !== formData.confirmPassword ? "Passwords do not match" : "";
        }
        break;
      case "confirmPassword":
        newErrors.confirmPassword =
          value.trim() === "" ? "confirmPassword is required" : "";

        newErrors.confirmPassword =
          value !== formData.password ? "Passwords do not match" : "";
        break;
      case "gender":
        newErrors.gender = value.trim() === "" ? "Gender is required" : "";
        break;
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
    <StyledCard>
      <Typography variant="h4" gutterBottom>
        Create Your Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
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
            error={!!errors.gender}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {errors.gender && (
            <Typography color="error">{errors.gender}</Typography>
          )}
        </FormControl>
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
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
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
        >
          Sign Up
        </Button>
      </form>
    </StyledCard>
  );
};

export default Signup;
