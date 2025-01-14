import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Icon,
} from "@mui/material";
import * as yup from "yup";
import { BaseLayout } from "../../shared/layouts/BaseLayout";
import { UseToken } from "../../shared/hooks";
import { UserServices } from "../../shared/services/api/controllers/users/UsersServices";
import { useNavigate } from "react-router-dom";
import { AdminService } from "../../shared/services/api/controllers/admin/AdminServices";
import { AuthService } from "../../shared/services/api/controllers/auth/AuthService";


// Schema de validação
const settingsSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

const settingsSchemaOnlyEmailAndName = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

export const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { uid, role } = UseToken();
 

  const navigate = useNavigate();

  useEffect(() => {
    if (uid !== null) {
      if (role === "User") {
        UserServices.getById(uid).then((result) => {
          if (result instanceof Error) {
            // Exiba uma mensagem de erro ou redirecione
            console.error(result.message);
            navigate("/");
            return;
          }
          setName(result.name);
          setEmail(result.email);
        });
      } else {
        AdminService.getById(uid).then((result) => {
          if (result instanceof Error) {
            // Exiba uma mensagem de erro ou redirecione
            console.error(result.message);
            navigate("/");
            return;
          }
          setName(result.name);
          setEmail(result.email);
        });
      }
    }
  }, [uid]);


  const handleSubmit = () => {
    setIsLoading(true);

    if (role === "Admin") {
      if (password.length > 0 || confirmPassword.length > 0) {
        settingsSchema
          .validate(
            { oldPassword, password, confirmPassword, name, email },
            { abortEarly: false }
          )
          .then(async (dadosValidados) => {
            if (uid !== null) {
              await AdminService.getById(uid).then(async (result) => {
                if (result instanceof Error) {
                  // Exiba uma mensagem de erro ou redirecione
                  console.error(result.message);
                  navigate("/");
                  return;
                }
                await AuthService.auth({
                  email: result.email,
                  password: dadosValidados.oldPassword,
                }).then(async (result) => {
                  if (result instanceof Error) {
                    // Exiba uma mensagem de erro ou redirecione
                    console.error(result.message);
                    navigate("/");
                    return;
                  }

                  await AdminService.updateById(uid, {
                    name: dadosValidados.name,
                    email: dadosValidados.email,
                    password: dadosValidados.confirmPassword,
                  });
                  setIsLoading(false);
                  navigate("/dashboard", {
                    state: {
                      message: "Profile Updated",
                      severity: "success",
                    },
                  });
                });
              });
            }
          })
          .catch((err) => {
            setIsLoading(false);
            setNameError("");
            setEmailError("");
            setOldPasswordError("");
            setPasswordError("");
            setConfirmPasswordError("");

            err.inner.forEach((error: yup.ValidationError) => {
              if (error.path === "name") setNameError(error.message);
              if (error.path === "email") setEmailError(error.message);
              if (error.path === "oldPassword")
                setOldPasswordError(error.message);
              if (error.path === "password") setPasswordError(error.message);
              if (error.path === "confirmPassword")
                setConfirmPasswordError(error.message);
            });
          });
      } else {
        settingsSchemaOnlyEmailAndName
          .validate({ oldPassword, name, email }, { abortEarly: false })
          .then(async (dadosValidados) => {
            if (uid !== null) {
              await AdminService.getById(uid).then(async (result) => {
                if (result instanceof Error) {
                  // Exiba uma mensagem de erro ou redirecione
                  console.error(result.message);
                  navigate("/");
                  return;
                }
                await AuthService.auth({
                  email: result.email,
                  password: dadosValidados.oldPassword,
                }).then(async (result) => {
                  if (result instanceof Error) {
                    // Exiba uma mensagem de erro ou redirecione
                    console.error(result.message);
                    navigate("/");
                    return;
                  }

                  await AdminService.updateById(uid, {
                    name: dadosValidados.name,
                    email: dadosValidados.email,
                    password: dadosValidados.oldPassword,
                  });
                  setIsLoading(false);
                  navigate("/dashboard", {
                    state: {
                      message: "Profile Updated",
                      severity: "success",
                    },
                  });
                });
              });
            }
          })
          .catch((err) => {
            setIsLoading(false);
            setNameError("");
            setEmailError("");
            setOldPasswordError("");

            err.inner.forEach((error: yup.ValidationError) => {
              if (error.path === "name") setNameError(error.message);
              if (error.path === "email") setEmailError(error.message);
              if (error.path === "oldPassword")
                setOldPasswordError(error.message);
            });
          });
      }
    } else {
      if (password.length > 0 || confirmPassword.length > 0) {
        settingsSchema
          .validate(
            { oldPassword, password, confirmPassword, name, email },
            { abortEarly: false }
          )
          .then(async (dadosValidados) => {
            if (uid !== null) {
              await UserServices.getById(uid).then(async (result) => {
                if (result instanceof Error) {
                  // Exiba uma mensagem de erro ou redirecione
                  console.error(result.message);
                  navigate("/");
                  return;
                }
                await AuthService.auth({
                  email: result.email,
                  password: dadosValidados.oldPassword,
                }).then(async (result) => {
                  if (result instanceof Error) {
                    // Exiba uma mensagem de erro ou redirecione
                    console.error(result.message);
                    navigate("/");
                    return;
                  }

                  await UserServices.updateById(uid, {
                    id: uid,
                    name: dadosValidados.name,
                    email: dadosValidados.email,
                    password: dadosValidados.confirmPassword,
                  });
                  setIsLoading(false);
                  navigate("/dashboard", {
                    state: {
                      message: "Profile Updated",
                      severity: "success",
                    },
                  });
                });
              });
            }
          })
          .catch((err) => {
            setIsLoading(false);
            setNameError("");
            setEmailError("");
            setOldPasswordError("");
            setPasswordError("");
            setConfirmPasswordError("");

            err.inner.forEach((error: yup.ValidationError) => {
              if (error.path === "name") setNameError(error.message);
              if (error.path === "email") setEmailError(error.message);
              if (error.path === "oldPassword")
                setOldPasswordError(error.message);
              if (error.path === "password") setPasswordError(error.message);
              if (error.path === "confirmPassword")
                setConfirmPasswordError(error.message);
            });
          });
      } else {
        settingsSchemaOnlyEmailAndName
          .validate({ oldPassword, name, email }, { abortEarly: false })
          .then(async (dadosValidados) => {
            if (uid !== null) {
              await UserServices.getById(uid).then(async (result) => {
                if (result instanceof Error) {
                  // Exiba uma mensagem de erro ou redirecione
                  console.error(result.message);
                  navigate("/");
                  return;
                }
                await AuthService.auth({
                  email: result.email,
                  password: dadosValidados.oldPassword,
                }).then(async (result) => {
                  if (result instanceof Error) {
                    // Exiba uma mensagem de erro ou redirecione
                    console.error(result.message);
                    navigate("/");
                    return;
                  }

                  await UserServices.updateById(uid, {
                    id: uid,
                    name: dadosValidados.name,
                    email: dadosValidados.email,
                    password: dadosValidados.oldPassword,
                  });
                  setIsLoading(false);
                  navigate("/dashboard", {
                    state: {
                      message: "Profile Updated",
                      severity: "success",
                    },
                  });
                });
              });
            }
          })
          .catch((err) => {
            setIsLoading(false);
            setNameError("");
            setEmailError("");
            setOldPasswordError("");

            err.inner.forEach((error: yup.ValidationError) => {
              if (error.path === "name") setNameError(error.message);
              if (error.path === "email") setEmailError(error.message);
              if (error.path === "oldPassword")
                setOldPasswordError(error.message);
            });
          });
      }
    }
  };

  return (
    <BaseLayout title={false} toolsBar={false}>
      <Box
        sx={{
          width: { xs: "95%", sm: "75%", md: "60%", lg: "50%" },
          margin: "auto",
          padding: 4,

          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 4,
          marginTop: { xs: 4, sm: 8 },
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Edit User
        </Typography>
        <Typography variant="subtitle1" textAlign="center" mb={4}>
          Update your profile information below.
        </Typography>

        <TextField
          label="Name"
          placeholder="Enter your name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon sx={{ color: "gray" }}>person</Icon>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Email"
          placeholder="Enter your email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon sx={{ color: "gray" }}>mail</Icon>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Old Password"
          placeholder="Enter your old password"
          fullWidth
          type={showOldPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          error={!!oldPasswordError}
          helperText={oldPasswordError}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon sx={{ color: "gray" }}>lock</Icon>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <Icon>visibility</Icon>
                  ) : (
                    <Icon>visibility_off</Icon>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="New Password"
          placeholder="Enter your new password"
          fullWidth
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon sx={{ color: "gray" }}>lock</Icon>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Icon>visibility</Icon>
                  ) : (
                    <Icon>visibility_off</Icon>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm New Password"
          placeholder="Confirm your new password"
          fullWidth
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon sx={{ color: "gray" }}>lock</Icon>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Icon>visibility</Icon>
                  ) : (
                    <Icon>visibility_off</Icon>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: 3,
            padding: 1.5,
            fontSize: "1rem",
            background: "linear-gradient(90deg, #007bff, #0056b3)",
            "&:hover": {
              background: "linear-gradient(90deg, #0056b3, #003f8a)",
            },
          }}
          disabled={isLoading}
          onClick={handleSubmit}
          endIcon={isLoading && <CircularProgress color="inherit" size={20} />}
        >
          Save Changes
        </Button>
      </Box>
    </BaseLayout>
  );
};
