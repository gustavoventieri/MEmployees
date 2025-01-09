import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { ToolsBar } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { PositionService } from "../../shared/services/api/controllers/position/PositionServices";
import { employeeService } from "../../shared/services/api/controllers/employee/EmployeeServices";

export const Dashboard = () => {
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  const [totalCountPositions, setTotalCountPositions] = useState(0);
  const [totalCountEmployees, setTotalCountEmployees] = useState(0);

  useEffect(() => {
    setIsLoadingPositions(true);
    setIsLoadingEmployees(true);

    PositionService.getAll(1).then((result) => {
      setIsLoadingPositions(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountPositions(result.totalCount);
      }
    });
    employeeService.getAll(1).then((result) => {
      setIsLoadingEmployees(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountEmployees(result.totalCount);
      }
    });
  }, []);

  return (
    <BaseLayout title="Dashboard" toolsBar={<ToolsBar showNewButton={false} />}>
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total of Employees
                  </Typography>

                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingEmployees && (
                      <Typography variant="h1">
                        {totalCountEmployees}
                      </Typography>
                    )}
                    {isLoadingEmployees && (
                      <Typography variant="h6">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total of Positions
                  </Typography>

                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingPositions && (
                      <Typography variant="h1">
                        {totalCountPositions}
                      </Typography>
                    )}
                    {isLoadingPositions && (
                      <Typography variant="h6">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};
