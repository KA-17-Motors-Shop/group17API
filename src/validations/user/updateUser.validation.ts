import { object, string } from "yup";

const updateUserSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          name: string().matches(/^([a-zA-Z]+)$/, "São aceitos somente letras"),
          email: string().email("Email é inválido"),
          cpf: string().matches(
            /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
            "CPF é inválido"
          ),
          phone: string().matches(
            /(\(\d{2}\)\s)(\d{4,5}-\d{4})/g,
            "Telefone inválido"
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
