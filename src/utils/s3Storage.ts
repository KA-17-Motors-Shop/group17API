import aws, { S3 } from "aws-sdk";
import axios from "axios";
import fs from "fs";
import mime from "mime";
import path from "path";
import multerConfig from "../config/multer";
import AppError from "../errors/appError";

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_S3_REGION_NAME,
    });
  }

  async saveFile(filename: string): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, filename);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new AppError(404, "File not found");
    }

    const fileContent = await fs.promises.readFile(originalPath);

    this.client
      .putObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
  }

  async getFile(filename: string) {
    const urlFile = `https://${
      process.env.AWS_BUCKET_NAME
    }.s3.sa-east-1.amazonaws.com/${filename.replace(" ", "+")}`;

    return await axios
      .get(urlFile)
      .then((res) => {
        if (res.status === 200) {
          return urlFile;
        }
      })
      .catch((_) => {});
  }

  async deleteFile(filename: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename,
      })
      .promise();
  }
}

export default S3Storage;
