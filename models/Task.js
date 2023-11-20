import { sql } from "./db.js";

const taskTable = sql`
CREATE TABLE tasks (
    id PRIMARY KEY NOT NULL,
    task TEXT NOT NULL,
    check BOOLEAN NOT NULL,
    date TIMESTAMP DEFAULT Now()
);`.then(() => {
  console.log("The table has been created!");
});

export { taskTable };
