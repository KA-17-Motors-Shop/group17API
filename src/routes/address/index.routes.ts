import { Router } from "express";

import createAddressController from "src/controllers/address/createAddress.controller";

import zipCodeExists from "../../middlewares/address/zipCodeExists.middleware";
import ensureAuth from "../../middlewares/ensureAuth.middleware";

const addressRouter = Router();

addressRouter.use(ensureAuth);

addressRouter.post("/", zipCodeExists, createAddressController); //cadastrar endereço

addressRouter.get("/"); //listar meus endereços

addressRouter.get("/:id"); //listar um de meus endereços
addressRouter.patch("/:id"); //atualizar um endereço
addressRouter.delete("/:id"); //deletar um endereço

export default addressRouter;
