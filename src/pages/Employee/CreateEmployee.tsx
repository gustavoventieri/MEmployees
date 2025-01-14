import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from "yup";

import { BaseLayout } from "../../shared/layouts";
import { DetailsTools } from "../../shared/components";
import { useNavigate } from "react-router-dom";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { employeeService } from "../../shared/services/api/controllers/employee/EmployeeServices";
import { Enviroment } from "../../shared/environment";
import { AutoCompletePosition } from "./components/AutoComplete";
import { encryptData } from "../../shared/services/decrypt/CryptoServices";

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

export const CreateEmployee: React.FC = () => {
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setLoading] = useState(false); // Seta o loading


  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        employeeService.create(dadosValidados).then((result) => {
          setLoading(false);
          if (result instanceof Error) {
            navigate(`/employee`, {
              state: {
                message: "Employee Wasn't Created!",
                severity: "error",
              },
            });
          } else {
            const encryptedId = encryptData(result);
            const encodedId = encodeURIComponent(encryptedId);
            if (isSaveAndClose()) {
              navigate(`/employee`, {
                state: {
                  message: "Employee Created!",
                  severity: "success",
                },
              });
            } else {
              navigate(`/employee/edit/${encodedId}`, {
                state: {
                  message: "Employee created! You Can Edit Now!",
                  severity: "success",
                },
              });
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

  return (
    <BaseLayout
      title="Create Employee"
      toolsBar={
        <DetailsTools
          showDeleteButton={false}
          showNewButton={false}
          showSaveAndExitButton
          handleClickOnPrevious={() => navigate("/employee")}
          handleClickOnSave={save}
          handleClickOnSaveAndExit={saveAndClose}
        />
      }
    >
      <VForm
        onSubmit={handleSave}
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
                    minLength: 5, // Mínimo de 3 caracteres
                    maxLength: 5, // Máximo de 10 caracteres
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
                  placeholder="HH:MM"
                  inputProps={{
                    minLength: 5, // Mínimo de 3 caracteres
                    maxLength: 5, // Máximo de 10 caracteres
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
    </BaseLayout>
  );
};
