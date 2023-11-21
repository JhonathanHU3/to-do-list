import "dotenv/config";
import postgres from "postgres";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGLINK } = process.env;

export const sql = postgres(PGLINK, {
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
});
