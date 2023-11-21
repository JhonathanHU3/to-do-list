import jwt from "jsonwebtoken";
import "dotenv/config";

let { SECRET } = process.env;

function tokenGeneration(userId) {
  return jwt.sign({ userId: userId }, SECRET, { expiresIn: 300 });
}

const verifyToken = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};

export { tokenGeneration, verifyToken };
