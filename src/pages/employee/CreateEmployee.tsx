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

interface IFormData {
  name: string;
  email: string;
  positionId: number;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  positionId: yup.number().required(),
  email: yup.string().required().email(),
  name: yup.string().required().min(3),
});

export const CreateEmployee: React.FC = () => {
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const [isLoading, setLoading] = useState(false);
  const secretKey = Enviroment.PASSDECRYPT;

  const encryptData = (data: number) => {
    return CryptoJS.AES.encrypt(data.toString(), secretKey).toString();
  };

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        employeeService.create(dadosValidados).then((result) => {
          setLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            const encryptedId = encryptData(result);
            const encodedId = encodeURIComponent(encryptedId);
            if (isSaveAndClose()) {
              navigate("/employee");
            } else {
              navigate(`/employee/edit/${encodedId}`);
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
                <AutoCompletePosition isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </BaseLayout>
  );
};