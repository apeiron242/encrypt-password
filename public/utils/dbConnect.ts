import * as sqlite3 from "sqlite3";
import * as os from "os";
import * as path from "path";

const db = new sqlite3.Database(
  path.join(os.homedir(), "pw-data.db"),
  (err) => {
    if (err) return console.error(err.message);
  }
);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS PW (
    id INTEGER PRIMARY KEY NOT NULL UNIQUE,
    sitename TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )`);
});

db.close((err) => {
  if (err) return console.error(err.message);
});

export default db;
