import { Router } from "express";

import createAddressController from "../../controllers/address/createAddress.controller";
import deleteAddressController from "../../controllers/address/deleteAddress.controller";
import listMyAddressController from "../../controllers/address/listMyAddress.controller";
import updateAddressController from "../../controllers/address/updateAddress.controller";
import changeDefaultAddressController from "../../controllers/address/cahngeDefaultAddress.controller";

import zipCodeExists from "../../middlewares/address/zipCodeExists.middleware";
import ensureAuth from "../../middlewares/ensureAuth.middleware";
import verifyIsActiveUser from "../../middlewares/verifyIsActiveUser.middleware";
import verifyIsUuid from "../../middlewares/verifyIsUuid.middleware";

import { expressYupMiddleware } from "express-yup-middleware";

import createAddressSchema from "../../validations/address/createAddress.validations";
import updateAddressSchema from "../../validations/address/updateAddress.validations";
import getAddressByIdController from "src/controllers/address/getAddressById.controller";

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
addressRouter.get("/:id", verifyIsUuid, getAddressByIdController);

addressRouter.patch(
  "/:id",
  expressYupMiddleware({ schemaValidator: updateAddressSchema }),
  verifyIsUuid,
  zipCodeExists,
  updateAddressController
);

addressRouter.patch(
  "/default/:id",
  verifyIsUuid,
  changeDefaultAddressController
);

addressRouter.delete("/:id", verifyIsUuid, deleteAddressController);

export default addressRouter;
