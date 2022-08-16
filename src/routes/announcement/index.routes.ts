import { Router } from "express";

import ensureAuth from "../../middlewares/ensureAuth.middleware";
import verifyIsUuid from "../../middlewares/verifyIsUuid.middleware";
import verifyIsSeller from "../../middlewares/announcement/verifyIsSeller";
import verifyIsOwner from "../../middlewares/announcement/verifyIsOwner";
import verifyIsActiveUser from "../../middlewares/verifyIsActiveUser.middleware";
import verifyIsCompledet from "../../middlewares/announcement/verifyIsCompleted";

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

import auctionFinishObserver from "../../observer/auctionFinish.observer";
import auctionWinnerObserver from "../../observer/auctionWinner.observer";

const announcementRouter = Router();

const upload = multer(multerConfig);

announcementRouter.use(auctionWinnerObserver);
announcementRouter.use(auctionFinishObserver);

announcementRouter.get("", listAllAnnouncementController);
announcementRouter.get("/:id", verifyIsUuid, listAnnouncementByIdController);
announcementRouter.get(
  "/seller/:id",
  verifyIsUuid,
  listAllAnnouncementBySellerIdController
);

announcementRouter.use(ensureAuth);

announcementRouter.post(
  "",
  verifyIsSeller,
  verifyIsActiveUser,
  upload.fields([{ name: "images", maxCount: 5 }]),
  validateAnnouncement(createAnnouncementSchema),

  createAnnoncementController
);

announcementRouter.get(
  "/me/seller",
  verifyIsSeller,
  listMyAnnouncementsController
);
announcementRouter.patch(
  "/:id",
  upload.fields([{ name: "images", maxCount: 5 }]),
  verifyIsUuid,
  verifyIsOwner,
  verifyIsCompledet,
  validateAnnouncementUpdate(UpdateAnnouncementSchema),
  updateAnnouncementController
);
announcementRouter.patch(
  "/status/:id",
  verifyIsUuid,
  verifyIsOwner,
  verifyIsCompledet,
  changeStatusController
);
announcementRouter.delete(
  "/:id",
  verifyIsUuid,
  verifyIsOwner,
  verifyIsCompledet,
  deleteAnnouncementController
);
announcementRouter.delete(
  "/:id/:fileName",
  verifyIsUuid,
  verifyIsOwner,
  verifyIsCompledet,
  deleteImageController
);

export default announcementRouter;
