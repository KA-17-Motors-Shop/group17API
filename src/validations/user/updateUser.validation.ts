import { object, string } from "yup";

const updateUserSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          name: string().matches(/^([a-zA-Z]+)$/, "Must contain only letters"),
          email: string().email("Invalid email format"),
          cpf: string().matches(
            /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
            "CPF is invalid"
          ),
          phone: string().matches(
            /^\d{2}\ \d{2}\ \d{4,5}\-\d{4}$/,
            "Phone is invalid"
          ),
          birhtDate: string().test(
            (dateString) => new Date(dateString!).toString() !== "Invalid Date"
          ),
          description: string(),
        })
        .noUnknown(true),
      validateOptions: {
        abortEarly: false,
        stripUnknown: false,
      },
    },
  },
};

export default updateUserSchema;
