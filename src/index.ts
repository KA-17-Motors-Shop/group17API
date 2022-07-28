import app from "./app";
import { prisma } from "./prisma/client";

const PORT = process.env.PORT || 6000;

async function runServer() {
  await prisma.$connect();

  app.listen(PORT, () =>
    console.log(`App running at http://localhost:${PORT}`)
  );
}

runServer();
