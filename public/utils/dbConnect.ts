import * as sqlite3 from "sqlite3";
import * as os from "os";
import * as path from "path";

sqlite3.verbose();

const db = new sqlite3.Database(path.join(os.homedir(), "pwdata.db"));

export const dbInit = async () => {
  db.serialize(async () => {
    db.run(`CREATE TABLE IF NOT EXISTS pw (
      id INTEGER PRIMARY KEY NOT NULL UNIQUE,
      sitename TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )`);
  });
};

export const dbClose = (): Promise<void> => {
  return new Promise((resolve) => {
    db.close();
    resolve();
  });
};

export default db;
