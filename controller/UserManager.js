import { randomUUID } from "node:crypto";
import { sql } from "../database/db.js";
import { tokenGeneration } from "./TokenController.js";
import bcrypt from "bcrypt";

const getLoginForm = async (req, res) => {
  try {
    return res.render("index");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getRegisterForm = async (req, res) => {
  try {
    return res.render("cadastro");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const registerUser = async (req, res) => {
  const userId = randomUUID();
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    await sql`
    INSERT INTO users(id, email, password)
    VALUES (${userId}, ${req.body.email}, ${hashedPassword})`;
    console.log("Usuário cadastrado!");
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

const loginUser = async (req, res) => {
  const user = await sql`SELECT * FROM users WHERE email = ${req.body.email}`;
  if (user.length === 1) {
    const { password: passwordHash } = user[0];
    const passwordCheck = await bcrypt.compare(req.body.password, passwordHash);

    if (passwordCheck) {
      const { id } = user[0];
      const token = tokenGeneration(id);
      res.cookie("token", token, {
        httpOnly: true,
      });
      return res.redirect("/home");
    }

    return res.status(401).send();
  }

  res.status(401).end();
};

export { loginUser, getLoginForm, registerUser, getRegisterForm };
