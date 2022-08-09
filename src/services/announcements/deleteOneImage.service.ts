import S3Storage from "../../utils/s3Storage";

const deleteOneImagesAnnouncement = async (fileName: string) => {
  const s3Storage = new S3Storage();

  await s3Storage.deleteFile(fileName);
};

export default deleteOneImagesAnnouncement;
