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
import { TSeverity } from "../../shared/components/alertBox/types/TSeverity";

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

export const EditEmployee: React.FC = () => {
  const location = useLocation();
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [employeeId, setEmployeeId] = useState<number | null>(null); // Seta o id do employee para ser excluido
  const [severity, setSeverity] = useState<TSeverity>("success"); // Tipo do Alert
  const [isLoading, setLoading] = useState(true); // Seta o loading
  const [message, setMessage] = useState(""); // Seta a mensagem do Alert
  const [openSnackBar, setOpenSnackBar] = useState(false); // Seta o estado do Alert
  const [openDialog, setOpenDialog] = useState(false); // Controla o modal de exclusão
  const [deleteId, setDeleteId] = useState<number | null>(null); // Armazena o ID do item a ser excluído
  const secretKey = Enviroment.PASSDECRYPT; // Senha Jwt

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
              navigate("/position", {
                state: {
                  message: "Employee wasn't created!",
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
    setDeleteId(id); // Armazenando o ID para exclusão
    setOpenDialog(true); // Abrindo o modal
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
      setDeleteId(null); // Limpa o ID após a exclusão
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
                <AutoCompletePosition isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>

      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)} // Fecha o modal sem fazer nada
        onConfirm={handleConfirmDelete} // Executa a exclusão
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
