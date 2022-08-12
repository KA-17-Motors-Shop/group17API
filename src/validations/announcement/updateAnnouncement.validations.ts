import { NextFunction, Request, Response } from "express";
import { object, SchemaOf, string } from "yup";

interface IUpdateAnnouncementValidate {
  title?: string;
  description?: string;
  year?: string;
  km?: string;
  price?: string;
  type?: string;
  typeVehicle?: string;
}

export const UpdateAnnouncementSchema: SchemaOf<IUpdateAnnouncementValidate> =
  object().shape({
    title: string().matches(/^([a-zA-Z]+)$/, "Must contain only letters"),
    description: string(),
    year: string().matches(/^\d{4}$/, "year is invalid"),
    km: string().matches(/(\d+)| /g, "km is invalid"),
    price: string()
      .matches(/(\d+)| /g, "price is invalid")
      .test((priceString) => parseFloat(priceString) !== NaN),
    type: string().oneOf(["auction", "sale"]),
    typeVehicle: string().oneOf(["car", "motocycle"]),
  });

export const validateAnnouncementUpdate =
  (schema: SchemaOf<IUpdateAnnouncementValidate>) =>
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
