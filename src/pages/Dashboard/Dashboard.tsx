import {
  Box,
  Card,
  CardContent,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import {
  AlertBox,
  FullScreenBarChart,
  ToolsBar,
} from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { PositionService } from "../../shared/services/api/controllers/position/PositionServices";
import { employeeService } from "../../shared/services/api/controllers/employee/EmployeeServices";
import { UseToken } from "../../shared/hooks";
import { AdminService } from "../../shared/services/api/controllers/admin/AdminServices";
import { TSeverity } from "../../shared/components/AlertBox/types/TSeverity";
import { useLocation } from "react-router-dom";
import { UserServices } from "../../shared/services/api/controllers/users/UsersServices";

export const Dashboard = () => {
  const { role, uid } = UseToken();
  const location = useLocation();

  const [isLoadingPositions, setIsLoadingPositions] = useState(true); // Seta o loading de Positions
  const [totalCountPositions, setTotalCountPositions] = useState(0); // Seta o total de position

  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true); // Seta o loading de Employees
  const [totalCountEmployees, setTotalCountEmployees] = useState(0); // Seta o total de Employees

  const [isLoadingAdmins, setIsLoadingAdmins] = useState(true); // Seta o loading de Admins
  const [totalCountAdmins, setTotalCountAdmins] = useState(0); // Seta o total de Admins

  const [isLoadingUsers, setIsLoadingUsers] = useState(true); // Seta o loading de Users
  const [totalCountUsers, setTotalCountUsers] = useState(0); // Seta o total de Users

  const [message, setMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [severity, setSeverity] = useState<TSeverity>("success");

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  useEffect(() => {
    setIsLoadingPositions(true);
    setIsLoadingEmployees(true);
    setIsLoadingUsers(true);
    setIsLoadingAdmins(true);

    PositionService.getAll(1).then((result) => {
      setIsLoadingPositions(false);

      if (result instanceof Error) {
        console.log(result.message);
      } else {
        setTotalCountPositions(result.totalCount);
      }
    });
    employeeService.getAll(1).then((result) => {
      setIsLoadingEmployees(false);

      if (result instanceof Error) {
        console.log(result.message);
      } else {
        setTotalCountEmployees(result.totalCount);
      }
    });

    AdminService.getAll(1).then((result) => {
      setIsLoadingAdmins(false);

      if (result instanceof Error) {
        console.log(result.message);
      } else {
        setTotalCountAdmins(result.totalCount);
      }
    });

    UserServices.getAll(1).then((result) => {
      setIsLoadingUsers(false);

      if (result instanceof Error) {
        console.log(result.message);
      } else {
        setTotalCountUsers(result.totalCount);
      }
    });

    if (location.state?.message) {
      setMessage(location.state.message);
      setOpenSnackBar(true);
    }
  }, [location.state]);

  const chartData = [
    { categoria: "Admins", total: totalCountAdmins },
    { categoria: "Users", total: totalCountUsers },
    { categoria: "Employees", total: totalCountEmployees },
    { categoria: "Positions", total: totalCountPositions },
  ];

  return (
    <BaseLayout title="Dashboard" toolsBar={<ToolsBar showNewButton={false} />}>
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            {role === "Admin" && (
              <>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  borderRadius={20}
                >
                  <Card>
                    <CardContent>
                      <Typography fontWeight={900} variant="h5" align="center">
                        Total of Users
                      </Typography>

                      <Box
                        padding={6}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {!isLoadingAdmins && (
                          <Typography variant="h2" fontWeight={900}>
                            {totalCountAdmins}
                          </Typography>
                        )}
                        {isLoadingAdmins && (
                          <Typography variant="h6">Loading...</Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <Card>
                    <CardContent>
                      <Typography fontWeight={900} variant="h5" align="center">
                        Total of Admins
                      </Typography>

                      <Box
                        padding={6}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {!isLoadingAdmins && (
                          <Typography variant="h2" fontWeight={900}>
                            {totalCountAdmins}
                          </Typography>
                        )}
                        {isLoadingAdmins && (
                          <Typography variant="h6">Loading...</Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography fontWeight={900} variant="h5" align="center">
                    Total of Employees
                  </Typography>

                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingEmployees && (
                      <Typography variant="h2" fontWeight={900}>
                        {totalCountEmployees}
                      </Typography>
                    )}
                    {isLoadingEmployees && (
                      <Typography variant="h6">Loading...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography fontWeight={900} variant="h5" align="center">
                    Total of Positions
                  </Typography>

                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingPositions && (
                      <Typography variant="h2" fontWeight={900}>
                        {totalCountPositions}
                      </Typography>
                    )}
                    {isLoadingPositions && (
                      <Typography variant="h6">Loading...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <AlertBox
          message={message}
          open={openSnackBar}
          onClose={handleClose}
          severity={severity}
        />
      </Box>

      <FullScreenBarChart data={chartData}></FullScreenBarChart>
    </BaseLayout>
  );
};
