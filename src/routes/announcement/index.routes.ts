import { Router } from "express";

import ensureAuth from "../../middlewares/ensureAuth.middleware";
import verifyIsUuid from "../../middlewares/verifyIsUuid.middleware";
import verifyIsSeller from "../../middlewares/announcement/verifyIsSeller";
import verifyIsOwner from "../../middlewares/announcement/verifyIsOwner";
import verifyIsActiveUser from "../../middlewares/verifyIsActiveUser.middleware";

import multer from "multer";
import multerConfig from "../../config/multer";

import createAnnoncementController from "../../controllers/annoncements/createAnnouncement.controller";
import listAllAnnouncementController from "../../controllers/annoncements/listAllAnnouncement.controller";
import listAllAnnouncementBySellerIdController from "../../controllers/annoncements/listAllAnnouncementBySellerId.controller";
import listAnnouncementByIdController from "../../controllers/annoncements/listAnnouncementsById.controller";
import listMyAnnouncementsController from "../../controllers/annoncements/listMyAnnouncement.controller";
import deleteAnnouncementController from "../../controllers/annoncements/deleteAnnouncement.controller";
import updateAnnouncementController from "../../controllers/annoncements/updateAnnouncement.controller";
import deleteImageController from "../../controllers/annoncements/deleteImage.controller";
import changeStatusController from "../../controllers/annoncements/changeStatus.controller";

import {
  createAnnouncementSchema,
  validateAnnouncement,
} from "../../validations/announcement/createAnnouncement.validations";
import {
  UpdateAnnouncementSchema,
  validateAnnouncementUpdate,
} from "../../validations/announcement/updateAnnouncement.validations";
import verifyIsCompledet from "src/middlewares/announcement/verifyIsCompleted";

const announcementRouter = Router();

const upload = multer(multerConfig);

announcementRouter.get("", listAllAnnouncementController); // listar anuncios ( sem autenticação )
announcementRouter.get("/:id", verifyIsUuid, listAnnouncementByIdController); // listar anuncio ( sem autenticação )
announcementRouter.get(
  "/seller/:id",
  verifyIsUuid,
  listAllAnnouncementBySellerIdController
); // listar anuncios de um vendedor( sem autenticação )

announcementRouter.use(ensureAuth);

announcementRouter.post(
  "",
  verifyIsSeller,
  verifyIsActiveUser,
  upload.fields([{ name: "images", maxCount: 5 }]),
  validateAnnouncement(createAnnouncementSchema),

  createAnnoncementController
); // Criar anuncio

announcementRouter.get(
  "/me/seller",
  verifyIsSeller,
  listMyAnnouncementsController
); // listar meus anuncios ( somente anunciante )

announcementRouter.patch(
  "/:id",
  upload.fields([{ name: "images", maxCount: 5 }]),
  verifyIsUuid,
  verifyIsOwner,
  verifyIsCompledet,
  validateAnnouncementUpdate(UpdateAnnouncementSchema),
  updateAnnouncementController
); // atualizar anuncio
announcementRouter.patch(
  "/status/:id",
  verifyIsUuid,
  verifyIsOwner,
  verifyIsCompledet,
  changeStatusController
); // alterar status do anuncio ( ativado / desativado )

announcementRouter.delete(
  "/:id",
  verifyIsUuid,
  verifyIsOwner,
  verifyIsCompledet,
  deleteAnnouncementController
); // deletar anuncio
announcementRouter.delete(
  "/:id/:fileName",
  verifyIsUuid,
  verifyIsOwner,
  verifyIsCompledet,
  deleteImageController
); // deletar imagem

export default announcementRouter;
