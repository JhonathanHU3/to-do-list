import { randomUUID } from "node:crypto";
import { sql } from "../database/db.js";

const getAllTasks = async (req, res) => {
  try {
    const taskList = await sql`SELECT * FROM tasks`;
    return res.render("tarefas", { taskList });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body;

  if (!task.task) {
    return res.redirect("/");
  }

  try {
    const taskId = randomUUID();
    const taskText = task.task;

    await sql`
    INSERT INTO tasks(id, task)
    VALUES (${taskId}, ${taskText})`.then(() => console.log("Data inserted"));

    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export { getAllTasks, createTask };
