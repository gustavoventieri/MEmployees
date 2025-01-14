import React, { useState } from "react";

import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from "yup";

import { BaseLayout } from "../../shared/layouts";
import { DetailsTools } from "../../shared/components";
import { useNavigate } from "react-router-dom";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";

import { encryptData } from "../../shared/services/decrypt/CryptoServices";
import { UserServices } from "../../shared/services/api/controllers/users/UsersServices";

interface IFormData {
  name: string;
  email: string;
  password: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  email: yup.string().required().email(),
  name: yup.string().required().min(3),
  password: yup.string().required().min(8),
});

export const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setLoading] = useState(false); // Seta o loading

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        UserServices.create(dadosValidados).then((result) => {
          setLoading(false);
          if (result instanceof Error) {
            navigate(`/user`, {
              state: {
                message: "User Wasn't Created!",
                severity: "error",
              },
            });
          } else {
            const encryptedId = encryptData(result);
            const encodedId = encodeURIComponent(encryptedId);
            if (isSaveAndClose()) {
              navigate(`/user`, {
                state: {
                  message: "User Created!",
                  severity: "success",
                },
              });
            } else {
              navigate(`/user/edit/${encodedId}`, {
                state: {
                  message: "User created! You Can Edit Now!",
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
      title="Create User"
      toolsBar={
        <DetailsTools
          showDeleteButton={false}
          showNewButton={false}
          showSaveAndExitButton
          handleClickOnPrevious={() => navigate("/user")}
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
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </BaseLayout>
  );
};
