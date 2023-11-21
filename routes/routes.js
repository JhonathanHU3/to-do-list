import { Router } from "express";
import { getAllTasks, createTask } from "../controller/TaskController.js";
import {
  loginUser,
  registerUser,
  getLoginForm,
  getRegisterForm,
} from "../controller/UserManager.js";
import { verifyToken } from "../controller/TokenController.js";
import cookieParser from "cookie-parser";

const routes = Router();
routes.use(cookieParser());

routes.get("/", getLoginForm);
routes.get("/newuser", getRegisterForm);
routes.get("/home", verifyToken, getAllTasks);
routes.post("/create", verifyToken, createTask);
routes.post("/login", loginUser);
routes.post("/register", registerUser);

export { routes };
