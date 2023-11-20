import { Router } from "express";
import { getAllTasks, createTask } from "../controller/TaskController.js" 

const routes = Router();

routes.get("/", getAllTasks);
routes.post("/create", createTask);


export {routes};
