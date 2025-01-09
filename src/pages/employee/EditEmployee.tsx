import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";

import { Enviroment } from "../../shared/environment";
import { BaseLayout } from "../../shared/layouts";
import { DetailsTools } from "../../shared/components";
import {
  employeeService,
  IEmployeeList,
} from "../../shared/services/employee/EmployeeServices";
import { VTextField } from "../../shared/forms";

export const EditEmployee: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const secretKey = Enviroment.PASSDECRYPT;
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
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
    setLoading(true);
    employeeService
      .updateById(Number(employeeId), { id: Number(employeeId), ...dados })
      .then((result) => {
        setLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/employee");
        }
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
          handleClickOnSave={() => formRef.current?.submitForm()}
          handleClickOnSaveAndExit={() => formRef.current?.submitForm()}
        />
      }
    >
      <Form
        onSubmit={handleUpdate}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        ref={formRef}
      >
        <VTextField placeholder="Name" name="name" />
        <VTextField placeholder="Email" name="email" />
        <VTextField placeholder="Position Id" name="positionId" />
      </Form>
    </BaseLayout>
  );
};

export default EditEmployee;
