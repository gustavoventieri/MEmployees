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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import {
  employeeService,
  IEmployeeList,
} from "../../shared/services/api/controllers/employee/EmployeeServices";
import { useDebounce } from "../../shared/hooks";
import { Enviroment } from "../../shared/environment";
import { useAppThemeContext } from "../../shared/contexts";
import { ToolsBar } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";

export const EmployeesList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const { themeName } = useAppThemeContext();
  const [rows, setRows] = useState<IEmployeeList[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const secretKey = Enviroment.PASSDECRYPT;

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
          alert(result.message);
        } else {
          setRows(result.data);
          setCount(result.totalCount);
        }
      });
    });
  }, [search, page]);

  const handleDelete = (id: number) => {
    /* eslint-disable-next-line no-restricted-globals */
    if (confirm("Realmente deseja apagar?")) {
      employeeService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          return alert(result.message);
        } else {
          setRows((oldRows) => [
            ...oldRows.filter((oldRow) => oldRow.id !== id),
          ]);
          alert("Registro apagado com sucesso!");
          window.location.reload();
        }
      });
    }
  };

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
                <TableCell colSpan={4}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {count > 0 && count > Enviroment.LIMITE_LINHAS && (
              <TableRow>
                <TableCell colSpan={4}>
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
    </BaseLayout>
  );
};
