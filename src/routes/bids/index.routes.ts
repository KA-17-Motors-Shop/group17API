import { Router } from "express";

import createBidsController from "../../controllers/bids/createBid.controller";
import listBidsToAnnouncementController from "../../controllers/bids/listBidsToAnnouncement.controller";
import listBidsToUserController from "../../controllers/bids/listBidsToUser.controller";

import verifyIsAuction from "../../middlewares/bids/verifyIsAuction";
import verifyIsAvailable from "../../middlewares/bids/verifyIsAvailable";
import ensureAuth from "../../middlewares/ensureAuth.middleware";
import verifyIsUuid from "../../middlewares/verifyIsUuid.middleware";
import verifyIsActiveUser from "../../middlewares/verifyIsActiveUser.middleware";
import verifyLastValues from "../../middlewares/bids/verifyLastValue";

import auctionWinnerObserver from "../../observer/auctionWinner.observer";
import auctionFinishObserver from "../../observer/auctionFinish.observer";

const bidsRouter = Router();

bidsRouter.use(auctionFinishObserver);
bidsRouter.use(auctionWinnerObserver);

bidsRouter.get(
  "/announcement/:id",
  verifyIsUuid,
  verifyIsAvailable,
  verifyIsAuction,
  listBidsToAnnouncementController
);

bidsRouter.use(ensureAuth);

bidsRouter.post(
  "/announcement/:id",
  verifyIsUuid,
  verifyIsAvailable,
  verifyIsAuction,
  verifyIsActiveUser,
  verifyLastValues,
  createBidsController
);

bidsRouter.get("/user", listBidsToUserController);

export default bidsRouter;
