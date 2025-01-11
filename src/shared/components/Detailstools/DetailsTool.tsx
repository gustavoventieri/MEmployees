import {
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box, Theme, useMediaQuery, useTheme } from "@mui/system";

interface IDetailsTools {
  newButtonText?: string;
  showNewButton?: boolean;
  showNewButtonLoading?: boolean;
  handleClickOnNew?: () => void;

  saveButtonText?: string;
  showSaveButton?: boolean;
  showSaveButtonLoading?: boolean;
  handleClickOnSave?: () => void;

  saveAndExitButtonText?: string;
  showSaveAndExitButton?: boolean;
  showSaveAndExitButtonLoading?: boolean;
  handleClickOnSaveAndExit?: () => void;

  previousButtonText?: string;
  showPreviousButton?: boolean;
  showPreviousButtonLoading?: boolean;
  handleClickOnPrevious?: () => void;

  deleteButtonText?: string;
  showDeleteButton?: boolean;
  showDeleteButtonLoading?: boolean;

  handleClickOnDelete?: () => void;
}

export const DetailsTools: React.FC<IDetailsTools> = ({
  newButtonText = "New",
  showNewButton = true,
  showNewButtonLoading = false,
  handleClickOnNew,
  saveButtonText = "Save",
  showSaveButton = true,
  showSaveButtonLoading = false,
  handleClickOnSave,
  saveAndExitButtonText = "Save and Exit",
  showSaveAndExitButton = false,
  showSaveAndExitButtonLoading = false,
  handleClickOnSaveAndExit,
  previousButtonText = "Previous",
  showPreviousButton = true,
  showPreviousButtonLoading = false,
  handleClickOnPrevious,
  deleteButtonText = "Delete",
  showDeleteButton = true,
  showDeleteButtonLoading = false,
  handleClickOnDelete,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
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
      {showSaveButton && !showSaveButtonLoading && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={handleClickOnSave}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Save
          </Typography>
        </Button>
      )}
      {showSaveButtonLoading && <Skeleton width={100} height={60} />}
      {showSaveAndExitButton &&
        !showSaveAndExitButtonLoading &&
        !smDown &&
        !mdDown && (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            startIcon={<Icon>save</Icon>}
            onClick={handleClickOnSaveAndExit}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Save and Exit
            </Typography>
          </Button>
        )}
      {showSaveAndExitButtonLoading && !smDown && !mdDown && (
        <Skeleton width={100} height={60} />
      )}

      {showDeleteButton && !showDeleteButtonLoading && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={handleClickOnDelete}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Delete
          </Typography>
        </Button>
      )}
      {showDeleteButtonLoading && <Skeleton width={100} height={60} />}

      {showNewButton && !showNewButtonLoading && !smDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={handleClickOnNew}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            New
          </Typography>
        </Button>
      )}
      {showNewButtonLoading && <Skeleton width={100} height={60} />}
      {showPreviousButton &&
        (showNewButton ||
          showDeleteButton ||
          showSaveButton ||
          showSaveAndExitButton) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {showPreviousButton && !showPreviousButtonLoading && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={handleClickOnPrevious}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Previous
          </Typography>
        </Button>
      )}
      {showPreviousButtonLoading && <Skeleton width={100} height={60} />}
    </Box>
  );
};
