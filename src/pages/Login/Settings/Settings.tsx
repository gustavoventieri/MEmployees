import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Icon,
  Box,
  useMediaQuery,
  Theme,
  CircularProgress,
} from "@mui/material";
import { useAppThemeContext } from "../../../shared/contexts";
import { photos } from "../../../shared/assets";
import * as yup from "yup";

import { useAuthContext } from "../../../shared/contexts";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

export const Login = () => {
  const { login } = useAuthContext();

  const { toggleTheme, themeName } = useAppThemeContext();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const carrouselProps = {
    background: [photos.prisma, photos.circle, photos.linhas],
    icons: [],
    title: ["Elegant Dashboard", "Manage Your Employees", "Clean Design"],
    context: [
      "Our dashboard is elegant and visually appealing, with vibrant colors and a clean layout that make navigation seamless and enjoyable",
      "Easily manage employee details, update information, and communicate through email directly from the platform.",
      "The application is thoughtfully designed to be simple, efficient, and user-friendly, ensuring a seamless experience for users while making their tasks",
    ],
  };

  // Mudar a imagem automaticamente a cada 10 segundos
  useEffect(() => {
    // Reseta a visibilidade do texto antes da troca da imagem
    setTextVisible(false);

    // Troca a imagem a cada 10 segundos
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carrouselProps.background.length
      );
    }, 10000);

    // Atraso para mostrar o texto novamente após 2 segundos
    const timer = setTimeout(() => {
      setTextVisible(true);
    }, 8800); // 2 segundos após a troca da imagem

    // Limpa os intervalos e temporizadores
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [currentImageIndex]); // A cada mudança de imagem, o timer é reiniciado

  const handleSubmit = () => {
    setIsLoading(true);

    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((dadosValidados) => {
        login(dadosValidados.email, dadosValidados.password).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach((error) => {
          if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  return (
    <Grid
      container
      height="100vh"
      overflow="hidden"
      style={{
        backgroundSize: "cover",
      }}
    >
      <Grid
        item
        xs={12}
        md={6} // Ajustando para 50% da tela em dispositivos médios e maiores
        container
        display={"flex"}
        direction="column"
        justifyContent="center"
        alignItems="center"
        padding={4}
        position="relative"
        overflow="hidden"
      >
        <IconButton
          onClick={toggleTheme}
          color="primary"
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 1, // Garante que o botão fique acima do fundo
          }}
        >
          {themeName === "light" ? (
            <Icon>light_mode</Icon>
          ) : (
            <Icon>dark_mode</Icon>
          )}
        </IconButton>

        <Typography variant="h4" gutterBottom zIndex={1}>
          Login
        </Typography>
        <Box width={mdDown ? "90%" : "70%"}>
          <TextField
            label="E-mail"
            placeholder="Enter your email"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon sx={{ color: "gray" }}>mail</Icon>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { color: "gray" },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            InputLabelProps={{
              style: { color: "gray" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    sx={{ color: "gray" }}
                  >
                    {showPassword ? (
                      <Icon>visibility</Icon>
                    ) : (
                      <Icon>visibility_off</Icon>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <Icon sx={{ color: "gray" }}>lock</Icon>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            disabled={isLoading}
            onClick={handleSubmit}
            endIcon={
              isLoading ? (
                <CircularProgress
                  variant="indeterminate"
                  color="inherit"
                  size={20}
                />
              ) : undefined
            }
            sx={{
              marginTop: 2,
              backgroundColor: "#0066cc",
              "&:hover": { backgroundColor: "#004c99" },
            }}
          >
            Login
          </Button>
        </Box>
      </Grid>

      {/* Carrossel de Imagens - Apenas em telas maiores */}
      {!mdDown && (
        <Grid
          overflow="hidden"
          item
          xs={12}
          md={6}
          sx={{
            background: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Contêiner de imagens com transição */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1, // Mantém as imagens no fundo
            }}
          >
            {carrouselProps.background.map((bg, index) => (
              <Box
                key={index}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center -120px",
                  transition: "opacity 1.5s ease-in-out", // Ajustando a transição para a imagem
                  opacity: index === currentImageIndex ? 1 : 0, // Controla visibilidade
                }}
              />
            ))}
          </Box>

          {/* Texto separado das imagens */}
          <Box
            sx={{
              position: "absolute",
              zIndex: 2, // Garante que o texto está acima das imagens
              top: "78%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              textAlign: "center",
              opacity: textVisible ? 0 : 1, // Sincroniza a visibilidade do texto
              transition: "opacity 1.5s ease-in-out", // Sincroniza a transição de opacidade do texto com a imagem
            }}
          >
            <Typography
              variant={lgDown ? "h5" : "h4"}
              sx={{
                fontFamily: "EB Garamond, serif",
                fontWeight: 100,
                marginBottom: 2,
              }}
            >
              {carrouselProps.title[currentImageIndex]}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "monospace",
                fontWeight: 100,
                fontSize: lgDown ? "0.7rem" : "0.8rem",
              }}
            >
              {carrouselProps.context[currentImageIndex]}
            </Typography>
          </Box>

          {/* Bolinhas de navegação */}
          <Box
            sx={{
              position: "absolute",
              bottom: 90,
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              zIndex: 3, // Garante que as bolinhas estão acima também
            }}
          >
            {carrouselProps.background.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor:
                    index === currentImageIndex
                      ? "white"
                      : "rgba(255, 255, 255, 0.3)",
                  transition: "background-color 0.3s",
                }}
              />
            ))}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
