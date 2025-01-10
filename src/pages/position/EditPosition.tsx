import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import * as yup from "yup";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { Enviroment } from "../../shared/environment";
import { BaseLayout } from "../../shared/layouts";
import { AlertBox, ConfirmDialog, DetailsTools } from "../../shared/components";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import {
  IPositionList,
  PositionService,
} from "../../shared/services/api/controllers/position/PositionServices";
import { TSeverity } from "../../shared/components/alertBox/types/TSeverity";

interface IFormData {
  name: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  name: yup.string().required().max(150).min(3),
});

export const EditPosition: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const { id = "nova" } = useParams<"id">();

  const [positionId, setPositionId] = useState<number | null>(null); // Seta o Id da posição
  const [severity, setSeverity] = useState<TSeverity>("success"); // Seta o nivel do alert
  const [isLoading, setLoading] = useState(true); // Seta o loading
  const [message, setMessage] = useState(""); // Seta a mensagem do alert
  const [openSnackBar, setOpenSnackBar] = useState(false); // seta o estado do alert
  const [openDialog, setOpenDialog] = useState(false); // Controla o modal de exclusão
  const [deleteId, setDeleteId] = useState<number | null>(null); // Armazena o ID do item a ser excluído
  const secretKey = Enviroment.PASSDECRYPT;

  useEffect(() => {
    if (id !== "nova") {
      const decodedId = decodeURIComponent(id);
      const bytes = CryptoJS.AES.decrypt(decodedId, secretKey);
      const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
      setPositionId(Number(decryptedId));

      if (decryptedId !== null) {
        PositionService.getById(Number(decryptedId)).then((result) => {
          if (result instanceof Error) {
            console.log(result.message);
            navigate("/position");
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

  const handleUpdate = (dados: Omit<IPositionList, "id">) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setLoading(true);
        PositionService.updateById(Number(positionId), {
          id: Number(positionId),
          ...dadosValidados,
        }).then((result) => {
          setLoading(false);
          if (result instanceof Error) {
            navigate("/position", {
              state: {
                message: "Position Wasn't Created!",
                severity: "error",
              },
            });
          } else {
            if (isSaveAndClose()) {
              navigate("/position", {
                state: {
                  message: "Position Updated!",
                  severity: "success",
                },
              });
            } else {
              setMessage("Position Saved");
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
    console.log(deleteId);
    PositionService.deleteById(deleteId).then((result) => {
      if (result instanceof Error) {
        setMessage(
          "You can't Delete This Tosition, It's Associated To Someone "
        );
        setOpenSnackBar(true);
      } else {
        navigate("/position", {
          state: {
            message: "Position Deleted!",
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
      title="Edit Position"
      toolsBar={
        <DetailsTools
          showDeleteButton
          showSaveAndExitButton
          showNewButton
          handleClickOnPrevious={() => navigate("/position")}
          handleClickOnNew={() => navigate("/position/new")}
          handleClickOnDelete={() => handleDelete(Number(positionId))}
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

export default EditPosition;
