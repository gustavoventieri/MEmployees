import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import * as yup from "yup";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { Enviroment } from "../../shared/environment";
import { BaseLayout } from "../../shared/layouts";
import { AlertBox, ConfirmDialog, DetailsTools } from "../../shared/components";
import {
  employeeService,
  IEmployeeList,
} from "../../shared/services/api/controllers/employee/EmployeeServices";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { AutoCompletePosition } from "./components/AutoComplete";
import { TSeverity } from "../../shared/components/AlertBox/types/TSeverity";

// Função de validação dos horários de trabalho
const validateWorkHours = (
  workStartTime: string,
  workEndTime: string
): boolean => {
  // Converte os horários para objetos Date com a data fictícia de 01/01/1970
  const [startHour, startMinute] = workStartTime.split(":").map(Number);
  const [endHour, endMinute] = workEndTime.split(":").map(Number);

  const startDate = new Date();
  startDate.setHours(startHour, startMinute, 0, 0); // Define apenas a hora e minuto

  const endDate = new Date();
  endDate.setHours(endHour, endMinute, 0, 0); // Define apenas a hora e minuto

  // Verifica se o horário de término é antes do horário de início
  return endDate > startDate;
};

interface IFormData {
  name: string;
  email: string;
  workStartTime: string;
  workEndTime: string;
  intervalTime: string;
  positionId: number;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  positionId: yup.number().required(),
  email: yup.string().required().email(),
  name: yup.string().required().min(3),
  workStartTime: yup
    .string()
    .required("Work start time is required")
    .matches(
      /^(?:([01]?[0-9]|2[0-3]):([0-5][0-9]))$/,
      "Invalid time format (HH:mm)"
    )
    .test("valid-time", "Invalid start time", (value) => {
      if (!value) return false;
      const [hours, minutes] = value.split(":").map(Number);
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    }),
  workEndTime: yup
    .string()
    .required("Work end time is required")
    .matches(
      /^(?:([01]?[0-9]|2[0-3]):([0-5][0-9]))$/,
      "Invalid time format (HH:mm)"
    )
    .test("valid-time", "Invalid end time", (value) => {
      if (!value) return false;
      const [hours, minutes] = value.split(":").map(Number);
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    }),
  intervalTime: yup
    .string()
    .required("Interval time is required")
    .matches(
      /^(?:([01]?[0-9]|2[0-3]):([0-5][0-9]))$/,
      "Invalid time format (HH:mm)"
    )
    .test("valid-time", "Invalid interval time", (value) => {
      if (!value) return false;
      const [hours, minutes] = value.split(":").map(Number);
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    })
    .test(
      "interval-between-start-end",
      "Interval time must be between start and end times",
      function (value) {
        const { workStartTime, workEndTime } = this.parent;
        if (!workStartTime || !workEndTime || !value) return true;

        const [startHours, startMinutes] = workStartTime.split(":").map(Number);
        const [endHours, endMinutes] = workEndTime.split(":").map(Number);
        const [intervalHours, intervalMinutes] = value.split(":").map(Number);

        const startTimeInMinutes = startHours * 60 + startMinutes;
        const endTimeInMinutes = endHours * 60 + endMinutes;
        const intervalTimeInMinutes = intervalHours * 60 + intervalMinutes;

        return (
          intervalTimeInMinutes > startTimeInMinutes &&
          intervalTimeInMinutes < endTimeInMinutes
        );
      }
    ),
});

export const EditEmployee: React.FC = () => {
  const location = useLocation();
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [severity, setSeverity] = useState<TSeverity>("success");
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const secretKey = Enviroment.PASSDECRYPT;

  useEffect(() => {
    if (id !== "nova") {
      const decodedId = decodeURIComponent(id);
      const bytes = CryptoJS.AES.decrypt(decodedId, secretKey);
      const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
      setEmployeeId(Number(decryptedId));

      if (decryptedId !== null) {
        employeeService.getById(Number(decryptedId)).then((result) => {
          if (result instanceof Error) {
            console.log(result.message);
            navigate("/employee");
          } else {
            setLoading(false);
            formRef.current?.setData(result);
          }
        });
      }
    }
  }, [id]);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setOpenSnackBar(true);
    }
  }, [location.state]);

  const handleUpdate = (dados: Omit<IEmployeeList, "id">) => {
    // Verifica os horários de trabalho antes de continuar
    const { workStartTime, workEndTime } = dados;
    if (!validateWorkHours(workStartTime, workEndTime)) {
      formRef.current?.setErrors({
        workStartTime: "Work start time cannot be later than work end time",
        workEndTime: "Work end time must be later than work start time",
      });
      return;
    }

    // Validação do formulário
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setLoading(true);
        employeeService
          .updateById(Number(employeeId), {
            id: Number(employeeId),
            ...dadosValidados,
          })
          .then((result) => {
            setLoading(false);
            if (result instanceof Error) {
              console.log(result.message);
              navigate("/employee", {
                state: {
                  message: "Employee wasn't updated!",
                  severity: "error",
                },
              });
            } else {
              if (isSaveAndClose()) {
                navigate("/employee", {
                  state: {
                    message: "Employee Updated!",
                    severity: "success",
                  },
                });
              } else {
                setMessage("Employee Saved");
                setOpenSnackBar(true);
                setSeverity("success");
              }
            }
          });
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId === null) return;

    employeeService.deleteById(deleteId).then((result) => {
      if (result instanceof Error) {
        console.log(result.message);
      } else {
        navigate("/employee", {
          state: {
            message: "Employee Deleted!",
            severity: "success",
          },
        });
      }
      setOpenDialog(false);
      setDeleteId(null);
    });
  };

  return (
    <BaseLayout
      title="Edit Employee"
      toolsBar={
        <DetailsTools
          showDeleteButton
          showSaveAndExitButton
          showNewButton
          handleClickOnPrevious={() => navigate("/employee")}
          handleClickOnNew={() => navigate("/employee/new")}
          handleClickOnDelete={() => handleDelete(Number(employeeId))}
          handleClickOnSave={save}
          handleClickOnSaveAndExit={saveAndClose}
        />
      }
    >
      <VForm
        onSubmit={handleUpdate}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        ref={formRef}
      >
        <Box
          margin={2}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  disabled={isLoading}
                  label="Name"
                  name="name"
                />
              </Grid>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  disabled={isLoading}
                  label="Email"
                  name="email"
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  disabled={isLoading}
                  label="Work Start Time"
                  name="workStartTime"
                  placeholder="HH:MM"
                  inputProps={{
                    minLength: 5,
                    maxLength: 5,
                  }}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  disabled={isLoading}
                  label="Interval Time"
                  name="intervalTime"
                  inputProps={{
                    minLength: 5,
                    maxLength: 5,
                  }}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  disabled={isLoading}
                  label="Work End Time"
                  name="workEndTime"
                  inputProps={{
                    minLength: 5,
                    maxLength: 5,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <AutoCompletePosition isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>

      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
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

export default EditEmployee;
