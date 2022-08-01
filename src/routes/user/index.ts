import { Router } from "express";
import createUserController from "../../controllers/user/createUser.controller";

const userRoutes = Router();

userRoutes.post("/signup", createUserController); //Cadastro
userRoutes.patch("/activate"); //Ativação
userRoutes.post("/signup"); // Login
userRoutes.get("/"); // Get All
userRoutes.get("/me"); // Get Me
userRoutes.patch("/me"); // Update Me
userRoutes.patch("/password"); // Update password
userRoutes.get("/reset/password"); // Reset password
userRoutes.delete("/me"); // Delete Me

export default userRoutes;
