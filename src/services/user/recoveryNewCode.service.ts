import { renderFile } from "ejs";
import path from "path";
import { IEmailRequest } from "../../interfaces/emails";

import { prisma } from "../../prisma/client";
import { sendEmail } from "../../utils/sendEmail.util";

const recoveryNewCodeActivateService = async (userId: string) => {
  const accessToken = (Math.random() + 10).toString(36).substring(3);

  const user = await prisma.user.update({
    where: { id: userId },
    data: { accessToken },
  });

  let emailData: IEmailRequest = {
    subject: "Ativação de usuário",
    to: user.email,
    text: `
      <h1>Olá ${
        user.name[0].toUpperCase() + user.name.substring(1).toLowerCase()
      }</h1>
      <p>Para usufruir de todas as funcionalidades de nossa plataforma confirme seu email através deste código de acesso</p>
      <h2>${accessToken.toUpperCase()}</h2>
    `,
  };

  await renderFile(path.join("src/views/recoveryActivate.ejs"), {
    name: user.name[0].toUpperCase() + user.name.substring(1).toLowerCase(),
    accessToken: accessToken.toUpperCase(),
  })
    .then((result) => {
      emailData.text = result;
    })
    .catch((err) => console.log(err));

  await sendEmail(emailData);

  return { status: "OK" };
};

export default recoveryNewCodeActivateService;
