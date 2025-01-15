import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import * as yup from "yup";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { Enviroment } from "../../shared/environment";
import { BaseLayout } from "../../shared/layouts";
import { AlertBox, ConfirmDialog, DetailsTools } from "../../shared/components";

import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { TSeverity } from "../../shared/components/AlertBox/types/TSeverity";
import {
  IUserDetails,
  UserServices,
} from "../../shared/services/api/controllers/users/UsersServices";

// Função de validação dos horários de trabalho
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

export const EditUser: React.FC = () => {
  const location = useLocation();
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [userId, setuserId] = useState<number | null>(null);
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
      setuserId(Number(decryptedId));

      if (decryptedId !== null) {
        UserServices.getById(Number(decryptedId)).then((result) => {
          if (result instanceof Error) {
            console.log(result.message);
            navigate("/user");
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

  const handleUpdate = (dados: Omit<IUserDetails, "id">) => {
    // Validação do formulário
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setLoading(true);
        UserServices.updateById(Number(userId), {
          id: Number(userId),
          ...dadosValidados,
        }).then((result) => {
          setLoading(false);
          if (result instanceof Error) {
            console.log(result.message);
            navigate("/user", {
              state: {
                message: "User wasn't updated!",
                severity: "error",
              },
            });
          } else {
            if (isSaveAndClose()) {
              navigate("/user", {
                state: {
                  message: "User Updated!",
                  severity: "success",
                },
              });
            } else {
              setMessage("User Saved");
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

    UserServices.deleteById(deleteId).then((result) => {
      if (result instanceof Error) {
        console.log(result.message);
      } else {
        navigate("/user", {
          state: {
            message: "User Deleted!",
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
      title="Edit User"
      toolsBar={
        <DetailsTools
          showDeleteButton
          showSaveAndExitButton
          showNewButton
          handleClickOnPrevious={() => navigate("/user")}
          handleClickOnNew={() => navigate("/user/new")}
          handleClickOnDelete={() => handleDelete(Number(userId))}
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

export default EditUser;
