import { Router } from "express";

import buyAnnounceController from "../../controllers/purchase/buyAnnounce.controller";
import listMyPurchasesController from "../../controllers/purchase/listMyPurchases.controller";
import findPurchaseAnnounceController from "../../controllers/purchase/findPurchaseAnnounce.controller";

import verifyIsAvailable from "../../middlewares/purchase/verifyIsAvailable";
import verifyIsCompledet from "../../middlewares/announcement/verifyIsCompleted";
import ensureAuth from "../../middlewares/ensureAuth.middleware";
import verifyIsUuid from "../../middlewares/verifyIsUuid.middleware";

const purchasesRouter = Router();

purchasesRouter.use(ensureAuth);

purchasesRouter.post(
  "/buy/:id",
  verifyIsUuid,
  verifyIsCompledet,
  verifyIsAvailable,
  buyAnnounceController
);

purchasesRouter.get("/me", listMyPurchasesController);

purchasesRouter.get(
  "/annonce/:id",
  verifyIsUuid,
  findPurchaseAnnounceController
);

export default purchasesRouter;
