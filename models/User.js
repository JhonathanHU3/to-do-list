import { sql } from "../database/db.js";

sql`
CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT Now()
);`.then(() => {
  console.log("The table has been created!");
});
