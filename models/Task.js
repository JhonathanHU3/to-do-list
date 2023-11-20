import { sql } from "../database/db.js";

sql`
CREATE TABLE tasks (
    id TEXT PRIMARY KEY NOT NULL,
    task TEXT NOT NULL,
    checked BOOLEAN NOT NULL DEAFULT FALSE,
    date TIMESTAMP DEFAULT Now()
);`.then(() => {
  console.log("The table has been created!");
});
