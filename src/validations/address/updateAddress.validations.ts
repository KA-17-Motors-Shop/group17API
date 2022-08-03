import { number, object, string } from "yup";

const updateAddressSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          zipCode: string().matches(
            /^[0-9]{5}-[0-9]{3}$/,
            "zipCode is invalid"
          ),
          state: string().matches(/^([a-zA-Z]+)$/, "Must contain only letters"),
          city: string().matches(/^([a-zA-Z]+)$/, "Must contain only letters"),
          street: string().required("street is required"),
          number: number().typeError("you must specify a number"),
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

export default updateAddressSchema;
