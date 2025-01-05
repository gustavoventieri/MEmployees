import {
  Box,
  Icon,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ReactNode } from "react";
import { useAppThemeContext, useDrawerContext } from "../contexts";

interface IBaseLayoutProps {
  title: string;
  toolsBar?: ReactNode;
  children: React.ReactNode;
}
export const BaseLayout: React.FC<IBaseLayoutProps> = ({
  children,
  toolsBar,
  title,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const { toggleDrawerOpen } = useDrawerContext();
  const theme = useTheme();
  const { themeName } = useAppThemeContext();
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            {themeName === "light" ? (
              <Icon>menu</Icon>
            ) : (
              <Icon sx={{ color: 'white' }}>menu</Icon>
            )}
          </IconButton>
        )}

        <Typography
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          marginLeft={1}
        >
          {title}
        </Typography>
      </Box>

      {toolsBar && <Box>{toolsBar}</Box>}
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
