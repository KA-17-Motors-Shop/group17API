import "dotenv/config";
import { createTransport } from "nodemailer";
import AppError from "../errors/appError";
import { IEmailRequest } from "../interfaces/emails";

const sendEmail = async ({ subject, text, to }: IEmailRequest) => {
  if (process.env.TEST) {
    return true;
  }

  const transporter = createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: text,
    })
    .then(() => {
      console.log("Email enviado com sucesso");
    })
    .catch((err) => {
      console.log(err);
      throw new AppError(500, "Error ao enviar email, tente novamente");
    });
};

export { sendEmail };
