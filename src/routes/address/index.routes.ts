import { Router } from "express";

import createAddressController from "../../controllers/address/createAddress.controller";
import deleteAddressController from "../../controllers/address/deleteAddress.controller";
import listMyAddressController from "../../controllers/address/listMyAddress.controller";
import updateAddressController from "../../controllers/address/updateAddress.controller";

import zipCodeExists from "../../middlewares/address/zipCodeExists.middleware";
import ensureAuth from "../../middlewares/ensureAuth.middleware";

const addressRouter = Router();

addressRouter.use(ensureAuth);

addressRouter.post("", zipCodeExists, createAddressController);

addressRouter.get("", listMyAddressController);

addressRouter.patch("/:id", zipCodeExists, updateAddressController);
addressRouter.delete("/:id", deleteAddressController);

export default addressRouter;
