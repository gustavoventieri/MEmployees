import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import { Enviroment } from "../../shared/environment";
import { BaseLayout } from "../../shared/layouts";
import { DetailsTools } from "../../shared/components";
import { employeeService } from "../../shared/services/employee/EmployeeServices";

export const EditEmployee: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const secretKey = Enviroment.PASSDECRYPT;
  const navigate = useNavigate();

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
          }
        });
      }
    }
  }, [id]);

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

  const handleDeleteClick = () => {
    if (employeeId !== null) {
      handleDelete(employeeId);
    } else {
      alert("ID do funcionário não encontrado.");
    }
  };

  return (
    <BaseLayout
      title="Edit Employee"
      toolsBar={
        <DetailsTools
          showDeleteButton={id !== "nova"}
          showSaveAndExitButton
          showNewButton={id !== "nova"}
          handleClickOnPrevious={() => navigate("/employee")}
          handleClickOnNew={() => navigate("/employee/new")}
          handleClickOnDelete={() => handleDeleteClick()}
        />
      }
    >
      <p>alo</p>
    </BaseLayout>
  );
};

export default EditEmployee;
