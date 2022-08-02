import { Router } from "express";

import activateUserController from "../../controllers/user/activateUser.controller";
import createUserController from "../../controllers/user/createUser.controller";
import userLoginController from "../../controllers/user/loginUser.controller";
import recoveryPasswordController from "../../controllers/user/recoveryPassword.controller";
import updatePasswordController from "../../controllers/user/updatePassword.controller";

import ensureAuth from "../../middlewares/ensureAuth.middleware";
import verifyAccessToken from "../../middlewares/user/verifyAccessToken.middleware";
import verifyDuplicatedEmail from "../../middlewares/user/verifyDuplicatedEmail.middleware";
import verifyPassword from "../../middlewares/user/verifyPassword.middleware";

const userRoutes = Router();

userRoutes.post("/signup", verifyDuplicatedEmail, createUserController); //Cadastro
userRoutes.patch("/activate/:accessToken", activateUserController); //Ativação
userRoutes.post("/reset/password", recoveryPasswordController); // Reset password
userRoutes.patch(
  "/reset/password",
  verifyAccessToken,
  updatePasswordController
); // Reset password
userRoutes.post("/signup", userLoginController); // Login

userRoutes.use(ensureAuth);

userRoutes.get("/"); // Get All
userRoutes.get("/me"); // Get Me
userRoutes.patch("/me", verifyDuplicatedEmail); // Update Me
userRoutes.patch("/password", verifyPassword, updatePasswordController); // Update password
userRoutes.delete("/me"); // Delete Me

export default userRoutes;
