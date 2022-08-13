import { number, object, string } from "yup";

const updateAddressSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          zipCode: string().matches(/^[0-9]{5}-[0-9]{3}$/, "O cep é inválido"),
          state: string().matches(
            /^([a-zA-Z]+)$/,
            "São aceitos somente letras"
          ),
          city: string().matches(/^([a-zA-Z]+)$/, "São aceitos somente letras"),
          street: string(),
          number: number().typeError("São aceitos somente números"),
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
