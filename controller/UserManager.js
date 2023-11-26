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
  const randomImg = `/img/profileImg/${Math.ceil(Math.random() * 10)}.jpg`;
  const fullName = req.body.fullName;
  const userEmail = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    await sql`
    INSERT INTO users(id, email, password, profileimagedir, fullname)
    VALUES (${userId}, ${userEmail}, ${hashedPassword}, ${randomImg}, ${fullName})`;
    console.log("Usuário cadastrado!");
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

const loginUser = async (req, res) => {
  const [ user ] = await sql`SELECT * FROM users WHERE email = ${req.body.email}`;
  if (user) {
    const passwordCheck = await bcrypt.compare(req.body.password, user.password);

    if (passwordCheck) {
      const token = tokenGeneration(user.id);
      res.cookie("token", token, {
        httpOnly: true,
      });
      res.cookie("userData", JSON.stringify(user), {
        httpOnly: true,
      })
      return res.redirect("/home");
    }

    return res.status(401).send();
  }

  res.status(401).end();
};

export { loginUser, getLoginForm, registerUser, getRegisterForm };
