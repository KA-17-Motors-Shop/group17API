import { object, string } from "yup";

const loginUserSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          email: string()
            .required("Email é obrigatório")
            .email("Email é inválido"),
          password: string().required("Senha é obrigatório"),
        })
        .noUnknown(true),
      validateOptions: {
        abortEarly: false,
        stripUnknown: false,
      },
    },
  },
};

export default loginUserSchema;
