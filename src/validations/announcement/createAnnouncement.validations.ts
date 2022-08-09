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
  limitDate: string;
}

export const createAnnouncementSchema: SchemaOf<ICreateAnnouncementValidate> =
  object().shape({
    title: string()
      .required("title is required")
      .matches(/^([a-zA-Z]+)$/, "Must contain only letters"),
    description: string().required("description is required"),
    year: string()
      .required("year is required")
      .matches(/^\d{4}$/, "year is invalid"),
    km: string()
      .required("km is required")
      .matches(/(\d+)| /g, "km is invalid"),
    limitDate: string()
      .required("limitDate is required")
      .test(
        (dateString) => new Date(dateString!).toString() !== "Invalid Date"
      ),

    price: string()
      .required("price is required")
      .matches(/(\d+)| /g, "price is invalid")
      .test((priceString) => parseFloat(priceString) !== NaN),
    isActive: boolean().required("isActive is required"),
    type: string().required("type is required").oneOf(["auction", "sale"]),
    typeVehicle: string()
      .required("typeVehicle is required")
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
