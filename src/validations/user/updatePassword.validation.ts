import { object, string } from "yup";

const updatePasswordUserSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          newPassword: string().required("Uma nova senha é obrigatório"),
          currentPassword: string().required("Senha antiga é obrigatório"),
        })
        .noUnknown(true),
      validateOptions: {
        abortEarly: false,
        stripUnknown: false,
      },
    },
  },
};

const resetPasswordUserSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          newPassword: string().required("Senha é obrigatório"),
        })
        .noUnknown(true),
      validateOptions: {
        abortEarly: false,
        stripUnknown: false,
      },
    },
  },
};

export { updatePasswordUserSchema, resetPasswordUserSchema };
