import React, { useRef, useState } from "react";
import CryptoJS from "crypto-js";

import { BaseLayout } from "../../shared/layouts";
import { DetailsTools } from "../../shared/components";
import { useNavigate } from "react-router-dom";
import { Form } from "@unform/web";
import { VTextField } from "../../shared/forms";
import {
  employeeService,
  IEmployeeList,
} from "../../shared/services/employee/EmployeeServices";
import { FormHandles } from "@unform/core";
import { Enviroment } from "../../shared/environment";

interface IFormData {
  name: string;
  email: string;
  positionId: number;
}

export const CreateEmployee: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setLoading] = useState(false);
  const secretKey = Enviroment.PASSDECRYPT;
  const encryptData = (data: number) => {
    return CryptoJS.AES.encrypt(data.toString(), secretKey).toString();
  };

  const handleSave = (dados: IFormData) => {
    employeeService.create(dados).then((result) => {
      setLoading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        const encryptedId = encryptData(result);
        const encodedId = encodeURIComponent(encryptedId);
        navigate(`/employee/edit/${encodedId}`);
      }
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
          handleClickOnSave={() => formRef.current?.submitForm()}
        />
      }
    >
      <Form
        onSubmit={handleSave}
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
