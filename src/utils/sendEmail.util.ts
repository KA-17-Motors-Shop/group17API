import "dotenv/config";
import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/emails";
// import { AppError } from "../errors/AppError";

const sendEmail = async ({ subject, text, to }: IEmailRequest) => {
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
      console.log("Email send with success");
    })
    .catch((err) => {
      console.log(err);
      // throw new AppError("Error sending email, try again later", 500)
    });
};

export { sendEmail };
