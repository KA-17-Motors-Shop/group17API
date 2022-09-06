import { Router } from "express";

import activateUserController from "../../controllers/user/activateUser.controller";
import createUserController from "../../controllers/user/createUser.controller";
import deleteUserController from "../../controllers/user/deleteUser.controller";
import listAllUsersController from "../../controllers/user/listAllUsers.controller";
import listUserProfileController from "../../controllers/user/listUserProfile.controller";
import userLoginController from "../../controllers/user/loginUser.controller";
import recoveryPasswordController from "../../controllers/user/recoveryPassword.controller";
import updatePasswordController from "../../controllers/user/updatePassword.controller";
import updateUserController from "../../controllers/user/updateUser.controller";
import recoveryNewCodeActivateController from "../../controllers/user/recoveryNewCodeActivate.controller";

import ensureAuth from "../../middlewares/ensureAuth.middleware";

import verifyAccessToken from "../../middlewares/user/verifyAccessToken.middleware";
import verifyDuplicatedCpf from "../../middlewares/user/verifyDuplicatedCpf";
import verifyDuplicatedEmail from "../../middlewares/user/verifyDuplicatedEmail.middleware";
import verifyPassword from "../../middlewares/user/verifyPassword.middleware";

import { expressYupMiddleware } from "express-yup-middleware";

import zipCodeExists from "../../middlewares/address/zipCodeExists.middleware";
import createUserSchema from "../../validations/user/createUser.validations";
import loginUserSchema from "../../validations/user/loginUser.validation";
import {
  resetPasswordUserSchema,
  updatePasswordUserSchema,
} from "../../validations/user/updatePassword.validation";
import updateUserSchema from "../../validations/user/updateUser.validation";

const userRoutes = Router();

userRoutes.post(
  "/signup",
  expressYupMiddleware({ schemaValidator: createUserSchema }),
  zipCodeExists,
  verifyDuplicatedCpf,
  verifyDuplicatedEmail,
  createUserController
);
userRoutes.patch("/activate/:accessToken", activateUserController);
userRoutes.post(
  "/signin",
  expressYupMiddleware({ schemaValidator: loginUserSchema }),
  userLoginController
);

userRoutes.post("/reset/password", recoveryPasswordController);
userRoutes.patch(
  "/reset/password/:accessToken",
  expressYupMiddleware({ schemaValidator: resetPasswordUserSchema }),
  verifyAccessToken,
  updatePasswordController
);

userRoutes.use(ensureAuth);

userRoutes.get("/recovery/code", recoveryNewCodeActivateController);

userRoutes.get("/", listAllUsersController);
userRoutes.get("/me", listUserProfileController);

userRoutes.patch(
  "/me",
  expressYupMiddleware({ schemaValidator: updateUserSchema }),
  verifyDuplicatedCpf,
  verifyDuplicatedEmail,
  updateUserController
);
userRoutes.patch(
  "/password",
  expressYupMiddleware({ schemaValidator: updatePasswordUserSchema }),
  verifyPassword,
  updatePasswordController
);
userRoutes.delete("/me", deleteUserController);
export default userRoutes;
