import { Router } from "express";
import activateUserController from "../../controllers/user/activateUser.controller";
import createUserController from "../../controllers/user/createUser.controller";
import recoveryPasswordController from "../../controllers/user/recoveryPassword.controller";

const userRoutes = Router();

userRoutes.post("/signup", createUserController); //Cadastro
userRoutes.patch("/activate/:accessToken", activateUserController); //Ativação
userRoutes.post("/signup"); // Login
userRoutes.get("/"); // Get All
userRoutes.get("/me"); // Get Me
userRoutes.patch("/me"); // Update Me
userRoutes.patch("/password"); // Update password
userRoutes.post("/reset/password", recoveryPasswordController); // Reset password
userRoutes.patch("/reset/password"); // Reset password
userRoutes.delete("/me"); // Delete Me

export default userRoutes;
