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
import CryptoJS from "crypto-js";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { useDebounce, UseToken } from "../../shared/hooks";
import { Enviroment } from "../../shared/environment";
import { useAppThemeContext } from "../../shared/contexts";
import { AlertBox, ConfirmDialog, ToolsBar } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import {
  AdminService,
  IAdminList,
} from "../../shared/services/api/controllers/admin/AdminServices";
import { TSeverity } from "../../shared/components/AlertBox/types/TSeverity";

export const AdminsList: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();
  const { uid } = UseToken();
  const { themeName } = useAppThemeContext();

  const [rows, setRows] = useState<IAdminList[]>([]); // Seta as linhas da tabela
  const [count, setCount] = useState(0); // Seta o valor de admins
  const [isLoading, setIsLoading] = useState(true); // Seta o loading
  const [message, setMessage] = useState(""); // Seta a mensagem do alert
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [severity, setSeverity] = useState<TSeverity>("success"); // Tipo de Alert
  const [openDialog, setOpenDialog] = useState(false); // Controla o modal de exclusão
  const [deleteId, setDeleteId] = useState<number | null>(null); // Armazena o ID do item a ser excluído

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
      AdminService.getAll(page, search).then(async (result) => {
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

    AdminService.deleteById(deleteId).then((result) => {
      if (result instanceof Error) {
        setMessage("Admin Wasn't Deleted!");
        setOpenSnackBar(true);
        setSeverity("error");
      } else {
        setRows((oldRows) => oldRows.filter((row) => row.id !== deleteId));
        setMessage("Admin Deleted!");
        setOpenSnackBar(true);
      }
      setOpenDialog(false);
      setDeleteId(null); // Limpa o ID após a exclusão
    });
  };

  return (
    <BaseLayout
      title="List Admins"
      toolsBar={
        <ToolsBar
          showSearchInput
          showNewButton
          searchText={search}
          handleClinkNew={() => navigate("/admin/new")}
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
              {uid === 1 && <TableCell width={400}>Actions</TableCell>}

              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!isLoading &&
              uid === 1 &&
              rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(row.id)}
                        disabled={row.id === 1}
                      >
                        <Icon>delete</Icon>
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                );
              })) ||
              (!isLoading &&
                uid !== 1 &&
                rows.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  );
                }))}
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
