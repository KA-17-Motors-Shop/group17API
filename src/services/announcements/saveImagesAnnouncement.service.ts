import multer from "multer";
import multerConfig from "../../config/multer";
import { prisma } from "../../prisma/client";
import S3Storage from "../../utils/s3Storage";

const saveImagesAnnouncementService = async (
  files:
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | Express.Multer.File[],
  announcementId: string
) => {
  const upload = multer(multerConfig);
  upload.array("images");

  const filesSerializer = JSON.parse(JSON.stringify(files));

  const promises = filesSerializer.images.map(
    async (file: Express.Multer.File) => {
      const s3Storage = new S3Storage();
      await s3Storage.saveFile(file.filename);

      await prisma.images.create({
        data: {
          fileName: file.filename,
          announcementId,
        },
        select: {
          fileName: true,
        },
      });

      return s3Storage.getFile(file.filename);
    }
  );
  return await Promise.all(promises);
};
export default saveImagesAnnouncementService;
