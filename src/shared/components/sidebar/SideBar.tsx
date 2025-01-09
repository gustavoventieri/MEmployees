import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { Box } from "@mui/system";

import { useAuthContext, useDrawerContext } from "../../contexts";
import { useAppThemeContext } from "../../contexts";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

// Lista de links para navegação no drawer
const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate();

  // Resolve o caminho e verifica se há uma correspondência parcial com a rota
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  // Quando um link é pressionado, o usuario é direcionado
  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

interface ISideBarProps {
  children: React.ReactNode;
}

interface DecodedToken {
  user_id: number;
  role: string;
  exp: number;
}

export const SideBar: React.FC<ISideBarProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { logout } = useAuthContext();
  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme, themeName } = useAppThemeContext();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Função para obter o token do localStorage e decodificar
    const getTokenFromLocalStorage = () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token); // Decodificando e tipando o token
          setRole(decoded.role); // Armazenando a role no estado
        } catch (error) {
          console.error("Erro ao decodificar o token", error);
        }
      }
    };

    getTokenFromLocalStorage();
  }, []);

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://yt3.ggpht.com/grfYgQadT8iNg9WPb-jkrKB-9224y_DBDXAOtV4Yt7cyQmtR47J_453uveQOTDsp_dRSH851TMM=s108-c-k-c0x00ffffff-no-rj"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(
                (drawerOption) =>
                  (role === "Admin" && (
                    <ListItemLink
                      to={drawerOption.path}
                      key={drawerOption.path}
                      icon={drawerOption.icon}
                      label={drawerOption.label}
                      onClick={smDown ? toggleDrawerOpen : undefined}
                    />
                  )) ||
                  (role === "User" &&
                    drawerOption.label !== "Admin" &&
                    drawerOption.label !== "User" && (
                      <ListItemLink
                        to={drawerOption.path}
                        key={drawerOption.path}
                        icon={drawerOption.icon}
                        label={drawerOption.label}
                        onClick={smDown ? toggleDrawerOpen : undefined}
                      />
                    ))
              )}
            </List>
          </Box>
        </Box>
        <Box margin="0" padding="0">
          <List component="nav">
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                {themeName === "light" ? (
                  <Icon>light_mode</Icon>
                ) : (
                  <Icon>dark_mode</Icon>
                )}
              </ListItemIcon>
              <ListItemText primary="Switch Theme" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon onClick={logout}>
                <Icon>person</Icon>
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
