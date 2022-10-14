import { boolean, number, object, string } from "yup";

const createUserSchema = {
  schema: {
    body: {
      yupSchema: object()
        .shape({
          name: string()
            .required("Nome é obrigatório")
            .matches(/[a-zA-Z\u00C0-\u00FF ]+/i, "São aceitos somente letras"),
          email: string()
            .required("Email é obrigatório")
            .email("Email é inválido"),
          cpf: string()
            .required("CPF é obrigatório")
            .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF é inválido"),
          phone: string()
            .required("Telefone é obrigatório")
            .matches(/(\(\d{2}\)\s)(\d{4,5}-\d{4})/g, "Telefone inválido"),
          birhtDate: string().required("Data de nascimento é obrigatório"),
          description: string(),
          password: string().required("Senha é obrigatório"),
          isSeller: boolean().required("Campo obrigatório"),
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

export default createUserSchema;
