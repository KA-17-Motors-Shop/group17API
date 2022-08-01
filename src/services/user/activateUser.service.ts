import { renderFile } from "ejs";
import path from "path";
import { IEmailRequest } from "../../interfaces/emails";
import { prisma } from "../../prisma/client";
import { sendEmail } from "../../utils/sendEmail.util";

const activateUserService = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const [user] = await prisma.user.findMany({ where: { accessToken } });

  if (!user) {
    return { status: "Error" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { isActivate: true, accessToken: null },
  });

  let emailData: IEmailRequest = {
    subject: "Obrigado Motor Shop",
    to: user.email,
    text: `
      <h1>Obrigado por se juntar a nossa plataforma</h1>
    `,
  };

  await renderFile(path.join("src/views/returnToActivateUser.ejs"))
    .then((result) => {
      emailData.text = result;
    })
    .catch((err) => console.log(err));

  await sendEmail(emailData);

  return { status: "Success" };
};

export default activateUserService;
