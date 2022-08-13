import { NextFunction, Request, Response } from "express";
import { boolean, object, SchemaOf, string } from "yup";

interface ICreateAnnouncementValidate {
  title: string;
  description: string;
  year: string;
  km: string;
  price: string;
  isActive: boolean;
  type: string;
  typeVehicle: string;
}

export const createAnnouncementSchema: SchemaOf<ICreateAnnouncementValidate> =
  object().shape({
    title: string()
      .required("Titúlo é obrigatório")
      .matches(/^([a-zA-Z]+)$/, "São aceitos somente letras"),
    description: string().required("Descrição é obrigatório"),
    year: string()
      .required("Ano é obrigatório")
      .matches(/^\d{4}$/, "Ano inválido"),
    km: string()
      .required("KM é obrigatório")
      .matches(/(\d+)| /g, "KM inválido"),
    price: string()
      .required("preço é obrigatório")
      .matches(/(\d+)| /g, "Preço inválido")
      .test((priceString) => parseFloat(priceString) !== NaN),
    isActive: boolean().required("Campo obrigatório"),
    type: string()
      .required("Tipo de anúncio é obrigatório")
      .oneOf(["auction", "sale"]),
    typeVehicle: string()
      .required("Tipo de veículo é obrigatório")
      .oneOf(["car", "motocycle"]),
  });

export const validateAnnouncement =
  (schema: SchemaOf<ICreateAnnouncementValidate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      try {
        await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        next();
      } catch (err: any) {
        return res.status(400).json({
          error: err.errors?.join(", "),
        });
      }
    } catch (err: any) {
      next(err);
    }
  };
