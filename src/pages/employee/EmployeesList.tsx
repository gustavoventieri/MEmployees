import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ToolsBar } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  employeeService,
  IEmployeeList,
} from "../../shared/services/employee/EmployeeServices";
import { useDebounce } from "../../shared/hooks";
import { PositionService } from "../../shared/services/position/PositionServices";

export const PositionList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IEmployeeList[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      employeeService.getAll(1, search).then(async (result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          const employeesWithPosition = await Promise.all(
            result.data.map(async (employee) => {
              const position = await PositionService.getById(
                employee.positionId
              );

              return { ...employee, position: position };
            })
          );

          console.log(employeesWithPosition);
          setRows(employeesWithPosition);
          setCount(result.totalCount);
        }
      });
    });
  }, [search]);

  return (
    <BaseLayout
      title="List Employees"
      toolsBar={
        <ToolsBar
          showSearchInput
          showNewButton
          searchText={search}
          changeTextOnSearchInput={(text) =>
            setSearchParams({ search: text }, { replace: true })
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
              <TableCell>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Cargo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.position?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};
