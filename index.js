import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {routes} from "./routes/routes.js"

const app = express();
const port = 3000;

// Configuration to use __dirname in ES6+
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(routes);

app.listen(
  {
    host: "0.0.0.0",
    port: process.env.PORT ?? port,
  },
  () => console.log(`Server open on port ${port}`)
);
