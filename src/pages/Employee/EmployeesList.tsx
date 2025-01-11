import {
  Box,
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

import {
  employeeService,
  IEmployeeList,
} from "../../shared/services/api/controllers/employee/EmployeeServices";
import { useDebounce } from "../../shared/hooks";
import { Enviroment } from "../../shared/environment";
import { useAppThemeContext } from "../../shared/contexts";
import { AlertBox, ConfirmDialog, ToolsBar } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";

export const EmployeesList: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const { themeName } = useAppThemeContext();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false); // Controla o modal de exclusão
  const [deleteId, setDeleteId] = useState<number | null>(null); // Armazena o ID do item a ser excluído
  const [message, setMessage] = useState(""); // Seta a mensagem do Alert
  const [openSnackBar, setOpenSnackBar] = useState(false); // Seta o estado do Alert
  const [rows, setRows] = useState<IEmployeeList[]>([]); // SEta as linhas da tabela
  const [count, setCount] = useState(0); //Seta o count de Emploeyees
  const [isLoading, setIsLoading] = useState(true); // Seta o Loading
  const secretKey = Enviroment.PASSDECRYPT;

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setOpenSnackBar(true);
    }
  }, [location.state]);

  const encryptData = (data: number) => {
    return CryptoJS.AES.encrypt(data.toString(), secretKey).toString();
  };

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
      employeeService.getAll(page, search).then(async (result) => {
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

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id); // Armazenando o ID para exclusão
    setOpenDialog(true); // Abrindo o modal
  };

  const handleConfirmDelete = () => {
    if (deleteId === null) return;

    employeeService.deleteById(deleteId).then((result) => {
      if (result instanceof Error) {
        console.log(result.message);
      } else {
        setRows((oldRows) => oldRows.filter((row) => row.id !== deleteId));
        setMessage("Employee Deleted!");
        setOpenSnackBar(true);
      }
      setOpenDialog(false);
      setDeleteId(null); // Limpa o ID após a exclusão
    });
  };

  function isWorking(workStartTime: string, workEndTime: string): string {
    const now = new Date();
    const [currentHours, currentMinutes] = [now.getHours(), now.getMinutes()];

    const [startHours, startMinutes] = workStartTime.split(":").map(Number);
    const [endHours, endMinutes] = workEndTime.split(":").map(Number);

    const startTime = new Date();
    startTime.setHours(startHours, startMinutes, 0, 0);

    const endTime = new Date();
    endTime.setHours(endHours, endMinutes, 0, 0);

    // Se o horário atual estiver entre o horário de início e o horário de término
    if (startTime <= now && endTime >= now) {
      return "Trabalhando";
    }

    return "Não Trabalhando";
  }

  return (
    <BaseLayout
      title="List Employees"
      toolsBar={
        <ToolsBar
          showSearchInput
          showNewButton
          searchText={search}
          handleClinkNew={() => navigate("/employee/new")}
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
              <TableCell>Status</TableCell>

              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
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
                        onClick={() => navigate(`/employee/edit/${encodedId}`)}
                      >
                        <Icon>edit</Icon>
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Box
                        display="inline-block"
                        width={12}
                        height={12}
                        borderRadius="50%"
                        sx={{
                          backgroundColor:
                            isWorking(row.workStartTime, row.workEndTime) ===
                            "Trabalhando"
                              ? "green"
                              : "red",
                          marginRight: 1,
                        }}
                      />
                      {isWorking(row.workStartTime, row.workEndTime)}
                    </TableCell>

                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.position?.name}</TableCell>
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
                <TableCell colSpan={5}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {count > 0 && count > Enviroment.LIMITE_LINHAS && (
              <TableRow>
                <TableCell colSpan={5}>
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
        severity="success"
      />
    </BaseLayout>
  );
};
