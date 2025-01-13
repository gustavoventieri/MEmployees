import {
  Box,
  Chip,
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

    // Horário atual
    const [currentHours, currentMinutes] = [now.getHours(), now.getMinutes()];

    // Horário de início e término de trabalho
    const [startHours, startMinutes] = workStartTime.split(":").map(Number);
    const [endHours, endMinutes] = workEndTime.split(":").map(Number);

    // Configurando os horários de início e término de trabalho
    const startTime = new Date();
    startTime.setHours(startHours, startMinutes, 0, 0);

    const endTime = new Date();
    endTime.setHours(endHours, endMinutes, 0, 0);

    // Calculando o horário de intervalo (1 hora após o início do expediente)
    const breakStartTime = new Date(startTime.getTime());
    breakStartTime.setHours(startHours + 1, startMinutes, 0, 0); // Intervalo começa 1 hora após o início do expediente

    const breakEndTime = new Date(breakStartTime.getTime());
    breakEndTime.setHours(breakStartTime.getHours() + 1); // Intervalo dura 1 hora

    // Verificando se está no horário de intervalo
    if (breakStartTime <= now && breakEndTime >= now) {
      return "Intervalo";
    }

    // Verificando se o horário atual está dentro do horário de trabalho
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

                    {(isWorking(row.workStartTime, row.workEndTime) ===
                      "Trabalhando" && (
                      <TableCell>
                        <Chip label="Working" color="success" />
                      </TableCell>
                    )) ||
                      (isWorking(row.workStartTime, row.workEndTime) ===
                        "Não Trabalhando" && (
                        <TableCell>
                          <Chip label="Not Working" color="error" />
                        </TableCell>
                      )) ||
                      (isWorking(row.workStartTime, row.workEndTime) ===
                        "Intervalo" && (
                        <TableCell>
                          <Chip label="BreakTime" color="warning" />
                        </TableCell>
                      ))}

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
