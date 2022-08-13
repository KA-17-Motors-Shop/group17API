import { Router } from "express";

import createBidsController from "../../controllers/bids/createBid.controller";
import listBidsToAnnouncementController from "../../controllers/bids/listBidsToAnnouncement.controller";
import listBidsToUserController from "../../controllers/bids/listBidsToUser.controller";

import verifyIsAuction from "../../middlewares/bids/verifyIsAuction";
import verifyIsAvailable from "../../middlewares/bids/verifyIsAvailable";
import ensureAuth from "../../middlewares/ensureAuth.middleware";
import verifyIsUuid from "../../middlewares/verifyIsUuid.middleware";

import auctionWinnerObserver from "../../observer/auctionWinner.observer";
import auctionFinishObserver from "../../observer/auctionFinish.observer";

const bidsRouter = Router();

bidsRouter.use(ensureAuth);

bidsRouter.use(auctionFinishObserver);
bidsRouter.use(auctionWinnerObserver);

bidsRouter.post(
  "/announcement/:id",
  verifyIsUuid,
  verifyIsAvailable,
  verifyIsAuction,
  createBidsController
); // Fazer um lance

bidsRouter.get(
  "/announcement/:id",
  verifyIsUuid,
  verifyIsAvailable,
  verifyIsAuction,
  listBidsToAnnouncementController
); // Listar os lances do anúncio
bidsRouter.get("/user", listBidsToUserController); // Listar os lances do usuário

export default bidsRouter;
