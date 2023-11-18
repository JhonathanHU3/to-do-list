import { Router } from "express";
import {getAll} from "../controller/TaskController.js" 

const routes = Router();

routes.get("/", getAll);

export {routes};
