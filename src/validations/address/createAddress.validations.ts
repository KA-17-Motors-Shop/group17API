import { number, object, string } from "yup";

const createAddressSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          zipCode: string()
            .required("Cep é obrigatório")
            .matches(/^[0-9]{5}-[0-9]{3}$/, "O cep é inválido"),
          state: string()
            .required("Estado é obrigatório")
            .matches(/[a-zA-Z\u00C0-\u00FF ]+/i, "São aceitos somente letras"),
          city: string()
            .required("Cidade é obrigatório")
            .matches(/[a-zA-Z\u00C0-\u00FF ]+/i, "São aceitos somente letras"),
          street: string().required("A rua é obrigatória"),
          number: number()
            .typeError("São aceitos somente números")
            .required("Número é obrigatório"),
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

export default createAddressSchema;
