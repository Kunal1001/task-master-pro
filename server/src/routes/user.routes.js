import { Router } from "express";
import { handleRegister, handleLogin, isAdmin, getAllUsers } from "../controllers/user.controller.js";
import { isAuthentic, passport } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(handleRegister)
userRouter.route("/login").post(isAuthentic, handleLogin);
userRouter.route("/isadmin").get(isAdmin);
userRouter.route("/getusers").get(getAllUsers);



export {userRouter};