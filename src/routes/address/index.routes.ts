import { Router } from "express";

import createAddressController from "../../controllers/address/createAddress.controller";
import deleteAddressController from "../../controllers/address/deleteAddress.controller";
import listMyAddressController from "../../controllers/address/listMyAddress.controller";
import updateAddressController from "../../controllers/address/updateAddress.controller";

import zipCodeExists from "../../middlewares/address/zipCodeExists.middleware";
import ensureAuth from "../../middlewares/ensureAuth.middleware";

import { expressYupMiddleware } from "express-yup-middleware";

import verifyIsUuid from "../../middlewares/verifyIsUuid.middleware";
import createAddressSchema from "../../validations/address/createAddress.validations";
import updateAddressSchema from "../../validations/address/updateAddress.validations";
import verifyIsActiveUser from "../../middlewares/verifyIsActiveUser.middleware";

const addressRouter = Router();

addressRouter.use(ensureAuth);

addressRouter.post(
  "",
  expressYupMiddleware({ schemaValidator: createAddressSchema }),
  verifyIsActiveUser,
  zipCodeExists,

  createAddressController
);

addressRouter.get("", listMyAddressController);

addressRouter.patch(
  "/:id",
  expressYupMiddleware({ schemaValidator: updateAddressSchema }),
  verifyIsUuid,
  zipCodeExists,
  updateAddressController
);
addressRouter.delete("/:id", verifyIsUuid, deleteAddressController);

export default addressRouter;
