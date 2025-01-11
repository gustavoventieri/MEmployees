import React, { useState } from "react";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from "yup";
import { BaseLayout } from "../../shared/layouts";
import { DetailsTools } from "../../shared/components";
import { useNavigate } from "react-router-dom";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { AdminService } from "../../shared/services/api/controllers/admin/AdminServices";

interface IFormData {
  name: string;
  email: string;
  password: string;
  c_password: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  c_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "As senhas não coincidem"),
});

export const AdminCreate: React.FC = () => {
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setLoading] = useState(false); // Seta o loading

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setLoading(true);
        AdminService.create({
          name: dadosValidados.name,
          email: dadosValidados.email,
          password: dadosValidados.password,
        }).then((result) => {
          setLoading(false);
          if (result instanceof Error) {
            navigate("/admin", {
              state: {
                message: "Admin Wasn't Created!",
                severity: "error",
              },
            });
          } else {
            navigate(`/admin`, {
              state: {
                message: "Position Created!",
                severity: "success",
              },
            });
          }
        });
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};
        errors.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message;
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
          showSaveAndExitButton={false}
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
                  label="Password"
                  name="password"
                  type="password"
                />
              </Grid>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  disabled={isLoading}
                  label="Confirm Password"
                  name="c_password"
                  type="password"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </BaseLayout>
  );
};
