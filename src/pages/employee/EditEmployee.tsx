import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import * as yup from "yup";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { Enviroment } from "../../shared/environment";
import { BaseLayout } from "../../shared/layouts";
import { DetailsTools } from "../../shared/components";
import {
  employeeService,
  IEmployeeList,
} from "../../shared/services/api/controllers/employee/EmployeeServices";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
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

export const EditEmployee: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const secretKey = Enviroment.PASSDECRYPT;
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (id !== "nova") {
      const decodedId = decodeURIComponent(id);
      const bytes = CryptoJS.AES.decrypt(decodedId, secretKey);
      const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
      setEmployeeId(Number(decryptedId));

      if (decryptedId !== null) {
        employeeService.getById(Number(decryptedId)).then((result) => {
          if (result instanceof Error) {
            alert(result.message);
            navigate("/employee");
          } else {
            setLoading(false);
            formRef.current?.setData(result);
          }
        });
      }
    }
  }, [id]);

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
              alert(result.message);
              navigate("/employee");
            } else {
              if (isSaveAndClose()) {
                navigate("/employee");
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
      employeeService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          return alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/employee");
        }
      });
    }
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
    </BaseLayout>
  );
};

export default EditEmployee;
