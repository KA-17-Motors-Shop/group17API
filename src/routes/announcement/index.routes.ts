import { Request, Response, Router } from "express";

import createAnnoncementController from "../../controllers/annoncements/createAnnouncement.controller";
import ensureAuth from "../../middlewares/ensureAuth.middleware";
import verifyIsUuid from "../../middlewares/verifyIsUuid.middleware";

// Imports para o AWS
import multer from "multer";
import multerConfig from "../../config/multer";
import S3Storage from "../../utils/s3Storage";

const announcementRouter = Router();

const upload = multer(multerConfig);

announcementRouter.get(""); // listar anuncios ( sem autenticação )
announcementRouter.get("/:id", verifyIsUuid); // listar anuncio ( sem autenticação )

announcementRouter.use(ensureAuth);

announcementRouter.post(
  "",
  upload.fields([{ name: "images", maxCount: 5 }]),
  createAnnoncementController
); // Criar anuncio

announcementRouter.get("/me"); // listar meus anuncios ( somente anunciante )

announcementRouter.patch("/:id", verifyIsUuid); // atualizar anuncio
announcementRouter.patch("/status/:id", verifyIsUuid); // alterar status do anuncio ( ativado / desativado )

announcementRouter.delete("/:id"); // deletar anuncio

/// EXEMPLO DE MANIPULAÇÃO E AWS  \\\
// const upload = multer(multerConfig);

announcementRouter.get(
  "/example/:file",
  async (req: Request, res: Response) => {
    const s3Storage = new S3Storage();

    const { file } = req.params;

    const fileUrl = await s3Storage.getFile(file);
    return res.json(fileUrl);
  }
);

announcementRouter.delete(
  "/example/:file",
  async (req: Request, res: Response) => {
    const s3Storage = new S3Storage();

    const { file } = req.params;

    await s3Storage.deleteFile(file);
    return res.send();
  }
);

export default announcementRouter;
