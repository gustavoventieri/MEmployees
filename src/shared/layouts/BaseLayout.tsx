import {
  Box,
  Icon,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDrawerContext } from "../contexts";

interface IBaseLayoutProps {
  title: string;
  children: React.ReactNode;
}
export const BaseLayout: React.FC<IBaseLayoutProps> = ({ children, title }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { toggleDrawerOpen } = useDrawerContext();
  const theme = useTheme();
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        height={theme.spacing(12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography>{title}</Typography>
      </Box>
      <Box>Barra de Ferramentas</Box>

      <Box>{children}</Box>
    </Box>
  );
};
