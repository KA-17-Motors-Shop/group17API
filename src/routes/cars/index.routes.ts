import { Request, Response, Router } from "express";
import multer from "multer";
import multerConfig from "../../config/multer";

import S3Storage from "../../utils/s3Storage";

const carsRouter = Router();

const upload = multer(multerConfig);

carsRouter.post(
  "",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const s3Storage = new S3Storage();

    const file: Express.Multer.File = req.file;

    await s3Storage.saveFile(file.filename);

    return res.send();
  }
);

carsRouter.get("/:file", async (req: Request, res: Response) => {
  const s3Storage = new S3Storage();

  const { file } = req.params;

  const fileUrl = await s3Storage.getFile(file);
  return res.json(fileUrl);
});

carsRouter.delete("/:file", async (req: Request, res: Response) => {
  const s3Storage = new S3Storage();

  const { file } = req.params;

  await s3Storage.deleteFile(file);
  return res.send();
});

export default carsRouter;
