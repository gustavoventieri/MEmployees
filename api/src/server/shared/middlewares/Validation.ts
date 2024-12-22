import { RequestHandler } from "express";
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup";
import { StatusCodes } from "http-status-codes";

// Tipagem para partes de uma requisição HTTP (body, header, params, query)
type TProperty = "body" | "header" | "params" | "query";

// Tipagem para uma função que retorna o Schema de validação de um tipo
type TGetSchema = <T extends Maybe<AnyObject>>(
  schema: ObjectSchema<T> // Recebe um schema de validação
) => ObjectSchema<T>; // Retorna o mesmo schema

// Tipagem para um objeto com todos os Schemas de validação (body, header, params, query)
type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

// Tipagem para uma função que retorna um objeto com schemas parciais de validação
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

// Tipagem para uma função de validação que usa os schemas de validação
type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

// Função que valida os schemas passados por parametro
export const validation: TValidation =
  (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    // Perfoma cada schema passado
    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as TProperty], { abortEarly: false });
      } catch (err) {
        const yupError = err as ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
          if (error.path === undefined) return;
          errors[error.path] = error.message;
        });

        errorsResult[key] = errors;
      }
    });

    // Caso nenhum erro na validação, o fluxo segue
    if (Object.entries(errorsResult).length === 0) {
      return next();
    }
    res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    return;
  };
