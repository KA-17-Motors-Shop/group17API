import { renderFile } from "ejs";
import path from "path";
import AppError from "../../errors/appError";
import { IEmailRequest } from "../../interfaces/emails";
import { prisma } from "../../prisma/client";
import { sendEmail } from "../../utils/sendEmail.util";

const recoveryPasswordService = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(404, "Not Found");
  }

  const accessToken = (Math.random() + 10).toString(36).substring(3);

  await prisma.user.update({
    where: { id: user.id },
    data: { accessToken },
  });

  const emailData: IEmailRequest = {
    subject: "Recuperação de senha",
    to: email,
    text: `
      <h1>Recuperação de senha</h1>
      <h2>${accessToken}</h2>
      <p>caso não tenha feito a solicitação apenas ignore está mensagem</p>
    `,
  };

  await renderFile(path.join("src/views/passwordRecovery.ejs"), {
    name: user.name[0].toUpperCase() + user.name.substring(1).toLowerCase(),
    accessToken: accessToken.toUpperCase(),
  })
    .then((result) => {
      emailData.text = result;
    })
    .catch((err) => console.log(err));

  await sendEmail(emailData);

  return { status: "Success" };
};

export default recoveryPasswordService;
