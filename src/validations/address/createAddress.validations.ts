import { number, object, string } from "yup";

const createAddressSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          zipCode: string()
            .required("zipCode is required")
            .matches(/^[0-9]{5}-[0-9]{3}$/, "zipCode is invalid"),
          state: string()
            .required("state is required")
            .matches(/^([a-zA-Z]+)$/, "Must contain only letters"),
          city: string()
            .required("city is required")
            .matches(/^([a-zA-Z]+)$/, "Must contain only letters"),
          street: string().required("street is required"),
          number: number()
            .typeError("you must specify a number")
            .required("number is required"),
          complement: string(),
        })
        .noUnknown(true),
      validateOptions: {
        abortEarly: false,
        stripUnknown: false,
      },
    },
  },
};

export default createAddressSchema;
