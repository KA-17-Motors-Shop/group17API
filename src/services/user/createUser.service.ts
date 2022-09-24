import { hash } from "bcryptjs";
import { renderFile } from "ejs";
import path from "path";
import randomColor from "randomcolor";
import { IEmailRequest } from "../../interfaces/emails";
import { ICreateUser } from "../../interfaces/user";
import { prisma } from "../../prisma/client";
import { sendEmail } from "../../utils/sendEmail.util";

const createUserService = async ({
  name,
  email,
  cpf,
  phone,
  birhtDate,
  description,
  password,
  isSeller,
}: ICreateUser) => {
  const hashPassword = await hash(password, 10);

  const avatarColor = randomColor({
    luminosity: "dark",
  });

  const accessToken = (Math.random() + 10).toString(36).substring(3);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      cpf,
      phone,
      birhtDate: new Date(birhtDate),
      description,
      password: hashPassword,
      isSeller,
      accessToken,
      avatarColor,
    },
    select: {
      id: true,
      name: true,
      email: true,
      cpf: true,
      phone: true,
      birhtDate: true,
      description: true,
      isSeller: true,
    },
  });

  let emailData: IEmailRequest = {
    subject: "Ativação de usuário",
    to: email,
    text: `
      <h1>Olá ${name[0].toUpperCase() + name.substring(1).toLowerCase()}</h1>
      <p>Para usufruir de todas as funcionalidades de nossa plataforma confirme seu email através deste código de acesso</p>
      <h2>${accessToken.toUpperCase()}</h2>
    `,
  };

  await renderFile(path.join("src/views/activateEmail.ejs"), {
    name: name[0].toUpperCase() + name.substring(1).toLowerCase(),
    accessToken: accessToken.toUpperCase(),
  })
    .then((result) => {
      emailData.text = result;
    })
    .catch((err) => console.log(err));

  await sendEmail(emailData);

  return newUser;
};

export default createUserService;
