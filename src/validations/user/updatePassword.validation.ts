import { object, string } from "yup";

const updatePasswordUserSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          newPassword: string().required("new password is required"),
          currentPassword: string().required("current password is required"),
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
          newPassword: string().required("password is required"),
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
