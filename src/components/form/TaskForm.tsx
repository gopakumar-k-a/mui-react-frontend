import React, { useState } from "react";
import { userApiService } from "api/services/user";
import {
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  SelectChangeEvent,
  InputLabel,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormDataPayload } from "types/user";
import { useApiErrorHandler } from "hooks/useApiErrorHandler";

const theme = createTheme();

interface FormData {
  text: string;
  email: string;
  password: string;
  date: string;
  number: number | "";
  checkbox: boolean;
  radio: string;
  textarea: string;
  select: string;
  files: File[];
}

interface FormErrors {
  text?: string;
  email?: string;
  password?: string;
  date?: string;
  number?: string;
  radio?: string;
  textarea?: string;
  select?: string;
  files?: string;
  checkbox?: boolean;
}

export default function TaskFormCard() {
  const [formData, setFormData] = useState<FormData>({
    text: "",
    email: "",
    password: "",
    date: "",
    number: "",
    checkbox: false,
    radio: "",
    textarea: "",
    select: "",
    files: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { handleApiError, apiErrors, clearApiErrors } = useApiErrorHandler();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.text.trim()) {
      newErrors.text = "Text is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    } else if (isNaN(Date.parse(formData.date))) {
      newErrors.date = "Invalid date";
    }
    if (formData.number === "") {
      newErrors.number = "Number is required";
    } else if (isNaN(Number(formData.number))) {
      newErrors.number = "Invalid number";
    }
    if (!formData.radio) {
      newErrors.radio = "Please select an option";
    }
    if (!formData.textarea.trim()) {
      newErrors.textarea = "Textarea is required";
    }
    if (!formData.select) {
      newErrors.select = "Please select an option";
    }
    if (formData.files.length === 0) {
      newErrors.files = "Please upload at least one file";
    }
    if (!formData.checkbox) {
      newErrors.checkbox = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          const value = formData[key as keyof FormDataPayload];

          // Convert non-string values to strings
          if (typeof value !== "object") {
            // Ensure we don't process files here
            formDataToSend.append(key, String(value));
          }
        });
        formData.files.forEach((file) => {
          formDataToSend.append("files", file);
        });
        console.log("Form submitted:", formData);
        const response = await userApiService.uploadForm(formDataToSend);
        setIsSubmitted(true);
      } catch (error) {
        console.log(error);
        handleApiError(error);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      text: "",
      email: "",
      password: "",
      date: "",
      number: "",
      checkbox: false,
      radio: "",
      textarea: "",
      select: "",
      files: [],
    });
    setErrors({});
    clearApiErrors();
    setIsSubmitted(false);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, select: event.target.value as string }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: 2,
        }}
      >
        <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              form submission task 2
            </Typography>
            {isSubmitted ? (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "success.light",
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Typography>Form submitted successfully!</Typography>
                <Button type="button" variant="contained" onClick={handleReset}>
                  upload new data !
                </Button>
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                {apiErrors.length > 0 && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {apiErrors.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </Alert>
                )}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Text Input"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  error={!!errors.text}
                  helperText={errors.text}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email Input"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password Input"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Date Input"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.date}
                  helperText={errors.date}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Number Input"
                  name="number"
                  type="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  error={!!errors.number}
                  helperText={errors.number}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.checkbox}
                      onChange={handleInputChange}
                      name="checkbox"
                    />
                  }
                  label="Checkbox"
                />
                {errors.checkbox && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ marginLeft: "10px", display: "block" }}
                  >
                    Please select the checkbox
                  </Typography>
                )}
                <FormControl
                  component="fieldset"
                  margin="normal"
                  error={!!errors.radio}
                  fullWidth
                >
                  <FormLabel component="legend">Radio Buttons</FormLabel>
                  <RadioGroup
                    name="radio"
                    value={formData.radio}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="option1"
                      control={<Radio />}
                      label="Option 1"
                    />
                    <FormControlLabel
                      value="option2"
                      control={<Radio />}
                      label="Option 2"
                    />
                  </RadioGroup>
                  {errors.radio && (
                    <Typography variant="caption" color="error">
                      {errors.radio}
                    </Typography>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Textarea"
                  name="textarea"
                  multiline
                  rows={4}
                  value={formData.textarea}
                  onChange={handleInputChange}
                  error={!!errors.textarea}
                  helperText={errors.textarea}
                />
                <FormControl fullWidth margin="normal" error={!!errors.select}>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.select}
                    label="Age"
                    onChange={handleSelectChange}
                    name="select"
                  >
                    <MenuItem value="">Select an option</MenuItem>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                  </Select>
                  {errors.select && (
                    <Typography variant="caption" color="error">
                      {errors.select}
                    </Typography>
                  )}
                </FormControl>
                <Box sx={{ mt: 2, mb: 1 }}>
                  <Button variant="contained" component="label" fullWidth>
                    Upload Files
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                      name="files"
                      multiple
                    />
                  </Button>
                  {formData.files.length > 0 && (
                    <List>
                      {formData.files.map((file, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleRemoveFile(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemText primary={file.name} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {errors.files && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ display: "block" }}
                    >
                      {errors.files}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Box>
              </form>
            )}
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
