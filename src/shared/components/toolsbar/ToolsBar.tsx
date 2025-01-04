import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";
import React from "react";
import { useAppThemeContext } from "../../contexts";

interface IToolsBarProps {
  searchText?: string;
  showSearchInput?: boolean;
  changeTextOnSearchInput?: (newText: string) => void;
  newButtonText?: string;
  showNewButton?: boolean;
  handleClinkNew?: () => void;
}

export const ToolsBar: React.FC<IToolsBarProps> = ({
  searchText = "",
  showSearchInput = false,
  changeTextOnSearchInput,
  newButtonText = "New",
  showNewButton = false,
  handleClinkNew,
}) => {
  const { themeName } = useAppThemeContext();
  const theme = useTheme();
  return (
    <Box
      gap={1}
      marginX={2}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {showSearchInput && (
        <TextField
          size="small"
          value={searchText}
          placeholder="Search..."
          onChange={(e) => changeTextOnSearchInput?.(e.target.value)}
        />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        <Button
          variant="contained"
          color="primary"
          disableElevation
          endIcon={<Icon>add</Icon>}
          onClick={handleClinkNew}
        >
          {newButtonText}
        </Button>
      </Box>
    </Box>
  );
};
