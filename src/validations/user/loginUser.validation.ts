import { object, string } from "yup";

const loginUserSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          email: string()
            .required("email is required")
            .email("Invalid email format"),
          password: string().required("password is required"),
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
