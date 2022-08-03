import { boolean, number, object, string } from "yup";

const createUserSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          name: string()
            .required("name is required")
            .matches(/^([a-zA-Z]+)$/, "Must contain only letters"),
          email: string()
            .required("email is required")
            .email("Invalid email format"),
          cpf: string()
            .required("Phone is required")
            .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF is invalid"),
          phone: string()
            .required("Phone is required")
            .matches(/^\d{2}\ \d{2}\ \d{4,5}\-\d{4}$/, "Phone is invalid"),
          birhtDate: string()
            .required("birhtDate is required")
            .test(
              (dateString) =>
                new Date(dateString!).toString() !== "Invalid Date"
            ),
          description: string(),
          password: string().required("password is required"),
          isSeller: boolean().required("isSeller is required"),
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

export default createUserSchema;
