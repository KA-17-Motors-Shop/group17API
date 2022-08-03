import { boolean, object, string } from "yup";

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
