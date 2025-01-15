import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { useDebounce } from "../../shared/hooks";
import { Enviroment } from "../../shared/environment";
import { useAppThemeContext } from "../../shared/contexts";
import { AlertBox, ConfirmDialog, ToolsBar } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import {
  IPositionList,
  PositionService,
} from "../../shared/services/api/controllers/position/PositionServices";
import { TSeverity } from "../../shared/components/AlertBox/types/TSeverity";
import { encryptData } from "../../shared/services/decrypt/CryptoServices";

export const PositionList: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();
  const { themeName } = useAppThemeContext();

  const [openDialog, setOpenDialog] = useState(false); // Controla o modal de exclusão
  const [deleteId, setDeleteId] = useState<number | null>(null); // Armazena o ID do item a ser excluído
  const [message, setMessage] = useState(""); // Seta o mensagem do Alert
  const [openSnackBar, setOpenSnackBar] = useState(false); // Seta a mensagem do Alert
  const [severity, setSeverity] = useState<TSeverity>("success"); // Seta o nivel do Alert
  const [rows, setRows] = useState<IPositionList[]>([]); // Seta as linhas da tabela
  const [count, setCount] = useState(0); // Seta o count da tabela
  const [isLoading, setIsLoading] = useState(true); // Seta o loading

  const search = useMemo(() => {
    const query = searchParams.get("search") || "";

    return query;
  }, [searchParams]);

  const page = useMemo(() => {
    const query = Number(searchParams.get("page") || "1");

    return query;
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      PositionService.getAll(page, search).then(async (result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          console.log(result.message);
        } else {
          setRows(result.data);
          setCount(result.totalCount);
        }
      });
    });
  }, [search, page]);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setOpenSnackBar(true);
    }
  }, [location.state]);

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id); // Armazenando o ID para exclusão
    setOpenDialog(true); // Abrindo o modal
  };

  const handleConfirmDelete = () => {
    if (deleteId === null) return;

    PositionService.deleteById(deleteId).then((result) => {
      if (result instanceof Error) {
        setMessage(
          "You Can't Delete This Position, It's Associated To Someone "
        );
        setOpenSnackBar(true);
        setSeverity("error");
      } else {
        setRows((oldRows) => oldRows.filter((row) => row.id !== deleteId));
        setMessage("Position Deleted!");
        setOpenSnackBar(true);
        setSeverity("success");
      }
      setOpenDialog(false);
      setDeleteId(null); // Limpa o ID após a exclusão
    });
  };

  return (
    <BaseLayout
      title="List Positions"
      toolsBar={
        <ToolsBar
          showSearchInput
          showNewButton
          searchText={search}
          handleClinkNew={() => navigate("/position/new")}
          changeTextOnSearchInput={(texto) =>
            setSearchParams({ search: texto, page: "1" }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 2, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Actions</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              rows.map((row) => {
                const encryptedId = encryptData(row.id);
                const encodedId = encodeURIComponent(encryptedId);

                return (
                  <TableRow key={row.id}>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(row.id)}
                      >
                        <Icon>delete</Icon>
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/position/edit/${encodedId}`)}
                      >
                        <Icon>edit</Icon>
                      </IconButton>
                    </TableCell>

                    <TableCell>{row.name}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          {count === 0 &&
            !isLoading &&
            (themeName === "light" ? (
              <caption>{Enviroment.LISTAGEM_VAZIA}</caption>
            ) : (
              <caption style={{ color: "white" }}>
                {Enviroment.LISTAGEM_VAZIA}
              </caption>
            ))}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {count > 0 && count > Enviroment.LIMITE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Stack>
                    <Pagination
                      page={page}
                      count={Math.ceil(count / Enviroment.LIMITE_LINHAS)}
                      color="primary"
                      onChange={(_, newPage) => {
                        setSearchParams(
                          { search, page: newPage.toString() },
                          { replace: true }
                        );
                      }}
                    ></Pagination>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>

      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)} // Fecha o modal sem fazer nada
        onConfirm={handleConfirmDelete} // Executa a exclusão
        title="Confirmation"
        content="Are you sure you want to delete this record?"
      />

      <AlertBox
        message={message}
        open={openSnackBar}
        onClose={handleClose}
        severity={severity}
      />
    </BaseLayout>
  );
};
