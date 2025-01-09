import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userApiService } from "api/services/user"; // Make sure to replace this with actual API service
import { useApiErrorHandler } from "hooks/useApiErrorHandler";

const passwordValidationRegex =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  onClose,
}) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    errors: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [showPasswords, setShowPasswords] = useState<{
    currentPassword: boolean;
    newPassword: boolean;
    confirmPassword: boolean;
  }>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const { handleApiError, apiErrors, clearApiErrors } = useApiErrorHandler();

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      setLoading(true);
      const response = await userApiService.updatePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      if (response.success) {
        setMessage("Password changed successfully!");
        setForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          errors: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          },
        });
        clearApiErrors();
      } else {
        setMessage("Failed to change password.");
      }
    } catch (error) {
      setMessage("");
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setForm((prevForm) => {
      const updatedForm = {
        ...prevForm,
        [name]: value,
        errors: {
          ...prevForm.errors,
          [name]: "", // Clear the error for the current field
        },
      };
  
      // Optionally, validate the field dynamically
      if (name === "newPassword") {
        if (!passwordValidationRegex.test(value)) {
          updatedForm.errors.newPassword =
            "Password must be at least 8 characters long, contain a number and a special character.";
        } else if (value === prevForm.currentPassword) {
          updatedForm.errors.newPassword =
            "New password cannot be the same as the current password.";
        } else {
          updatedForm.errors.newPassword = "";
        }
      }
  
      if (name === "confirmPassword") {
        if (value !== prevForm.newPassword) {
          updatedForm.errors.confirmPassword =
            "New password and confirmation do not match.";
        } else {
          updatedForm.errors.confirmPassword = "";
        }
      }
  
      return updatedForm;
    });
  };
  

  const handleSubmit = async () => {
    let isValid = true;
    const newErrors = { ...form.errors };

    if (!form.currentPassword) {
      newErrors.currentPassword = "Current password is required.";
      isValid = false;
    }

    if (!passwordValidationRegex.test(form.newPassword)) {
      newErrors.newPassword =
        "Password must be at least 8 characters long, contain a number and a special character.";
      isValid = false;
    } else if (form.newPassword === form.currentPassword) {
      newErrors.newPassword =
        "New password cannot be the same as the current password.";
      isValid = false;
    }

    if (form.confirmPassword !== form.newPassword) {
      newErrors.confirmPassword = "New password and confirmation do not match.";
      isValid = false;
    }

    if (isValid) {
      await handleChangePassword(
        form.currentPassword,
        form.newPassword,
        form.confirmPassword
      );

      //   onClose();
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        errors: newErrors,
      }));
    }
  };

  const handleTogglePasswordVisibility = (
    field: keyof typeof showPasswords
  ) => {
    setShowPasswords((prevShowPasswords) => ({
      ...prevShowPasswords,
      [field]: !prevShowPasswords[field],
    }));
  };

  const handleCloseModal = () => {
    onClose();
    setMessage("");
    clearApiErrors();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        {message && (
          <Alert
            severity={
              message === "Password changed successfully!" ? "success" : "error"
            }
            sx={{ mb: 2 }}
          >
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

        <TextField
          label="Current Password"
          type={showPasswords.currentPassword ? "text" : "password"}
          fullWidth
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          margin="normal"
          error={!!form.errors.currentPassword}
          helperText={form.errors.currentPassword}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() =>
                  handleTogglePasswordVisibility("currentPassword")
                }
                edge="end"
              >
                {showPasswords.currentPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            ),
          }}
        />
        <TextField
          label="New Password"
          type={showPasswords.newPassword ? "text" : "password"}
          fullWidth
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          margin="normal"
          error={!!form.errors.newPassword}
          helperText={form.errors.newPassword}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => handleTogglePasswordVisibility("newPassword")}
                edge="end"
              >
                {showPasswords.newPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <TextField
          label="Confirm New Password"
          type={showPasswords.confirmPassword ? "text" : "password"}
          fullWidth
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          margin="normal"
          error={!!form.errors.confirmPassword}
          helperText={form.errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() =>
                  handleTogglePasswordVisibility("confirmPassword")
                }
                edge="end"
              >
                {showPasswords.confirmPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="secondary"
          disabled={
            loading ||
            !!form.errors.currentPassword ||
            !!form.errors.newPassword ||
            !!form.errors.confirmPassword
          }
        >
          {loading ? "Changing..." : "Change Password"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
