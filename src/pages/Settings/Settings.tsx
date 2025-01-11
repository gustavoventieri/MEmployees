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
} from "@mui/material";
import { useAppThemeContext } from "../../shared/contexts";
import { photos } from "../../shared/assets";

const carrouselProps = {
  background: [photos.red, photos.azul, photos.laranja],
  icons: [photos.laptop],
  title: ["Elegant Dashboard", "Manage Your Employees", "orange"],
  context: [
    "Our dashboard is elegant and visually appealing, with vibrant colors and a clean layout that make navigation seamless and enjoyable",
    "Easily manage employee details, update information, and communicate through email directly from the platform.",
    "c",
  ],
};

export const Login2 = () => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { toggleTheme, themeName } = useAppThemeContext();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Mudar a imagem automaticamente a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carrouselProps.background.length
      );
    }, 5000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

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
        sx={{
          width: { xs: "100%", md: "50%" }, // Garantindo 50% da largura em dispositivos médios ou maiores
        }}
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
        <Box width="60%">
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
            fullWidth
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
          md={6} // Ajustando para a outra metade da tela
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden", // Garante que as imagens que saem da tela não apareçam
          }}
        >
          <Box
            display="flex"
            height="100%"
            width="100%"
            sx={{
              flexDirection: "row",
              transition: "transform 1s ease-in-out",
              backgroundImage: `url(${carrouselProps.background[currentImageIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              objectFit: "cover",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%", // Ajuste a posição do ícone para aparecer no topo
                left: "50%",
                transform: "translateX(-50%)", // Centra o ícone horizontalmente
                color: "white",
                textAlign: "center",
              }}
            >
              {/* Ícone */}
              <Box
                sx={{
                  backgroundImage: `url(${carrouselProps.icons[currentImageIndex]})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  width: 300, // Ajuste o tamanho do ícone conforme necessário
                  height: 100, // Ajuste o tamanho do ícone conforme necessário
                  margin: "0 auto", // Centraliza o ícone
                }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: "70%", // Ajuste a posição do texto para que fique abaixo do ícone
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                textAlign: "center",
              }}
            >
              <Box marginTop={10}>
                <Typography
                  variant="h3"
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
                    fontSize: "0.9rem",
                  }}
                >
                  {carrouselProps.context[currentImageIndex]}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Bolinhas de navegação */}
          <Box
            sx={{
              position: "absolute",
              bottom: 90,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1, // Espaço entre as bolinhas
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
