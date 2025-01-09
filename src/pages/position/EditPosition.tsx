import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import * as yup from "yup";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { Enviroment } from "../../shared/environment";
import { BaseLayout } from "../../shared/layouts";
import { DetailsTools } from "../../shared/components";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import {
  IPositionList,
  PositionService,
} from "../../shared/services/api/controllers/position/PositionServices";

interface IFormData {
  name: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  name: yup.string().required().max(150).min(3),
});

export const EditPosition: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const [positionId, setPositionId] = useState<number | null>(null);
  const secretKey = Enviroment.PASSDECRYPT;
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (id !== "nova") {
      const decodedId = decodeURIComponent(id);
      const bytes = CryptoJS.AES.decrypt(decodedId, secretKey);
      const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
      setPositionId(Number(decryptedId));

      if (decryptedId !== null) {
        PositionService.getById(Number(decryptedId)).then((result) => {
          if (result instanceof Error) {
            alert(result.message);
            navigate("/position");
          } else {
            setLoading(false);
            formRef.current?.setData(result);
          }
        });
      }
    }
  }, [id]);

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
            alert(result.message);
            navigate("/position");
          } else {
            if (isSaveAndClose()) {
              navigate("/position");
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

  const handleDelete = (id: number) => {
    /* eslint-disable-next-line no-restricted-globals */
    if (confirm("Realmente deseja apagar?")) {
      PositionService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          return alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/position");
        }
      });
    }
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
    </BaseLayout>
  );
};

export default EditPosition;
