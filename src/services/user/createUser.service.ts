import { hash } from "bcryptjs";
import { renderFile } from "ejs";
import path from "path";
import { IEmailRequest } from "../../interfaces/emails";
import { ICreateUser } from "../../interfaces/user";
import { prisma } from "../../prisma/client";
import { sendEmail } from "../../utils/sendEmail.util";

const createUserService = async (
  {
    name,
    email,
    cpf,
    phone,
    birhtDate,
    description,
    password,
    isSeller,
  }: ICreateUser,
  protocol: string,
  host: string | undefined
) => {
  const hashPassword = await hash(password, 10);

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
    },
    select: {
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
      <h1>Olá ${name}</h1>
      <p>Para usufruir de todas as funcionalidades de nossa plataforma confirme seu email através deste código de acesso</p>
      <h2>${accessToken}</h2>
      <a href="${protocol}://${host}/users/activate/${accessToken}">Clique aqui</a>
    `,
  };

  await renderFile(path.join("src/views/activateEmail.ejs"), {
    name: name[0].toUpperCase() + name.substring(1).toLowerCase(),
    protocol,
    host,
    accessToken: accessToken.toUpperCase(),
  })
    .then((result) => {
      emailData = {
        subject: "Ativação de usuário",
        to: email,
        text: result,
      };
    })
    .catch((err) => console.log(err));

  await sendEmail(emailData);

  return newUser;
};

export default createUserService;
