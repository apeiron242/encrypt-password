import db, { dbClose } from "./dbConnect";
import * as CryptoJs from "crypto-js";
import { encryptUserPassword } from "./encrypt";
import { EncryptionInterface } from "./interfaces";

export const decrypt = async (password: string) => {
  return new Promise(async (resolve) => {
    try {
      const hash = await encryptUserPassword(password);
      const data: EncryptionInterface[] = [];
      db.serialize(() => {
        db.all("SELECT * FROM pw", (err, rows) => {
          data.push(...rows);
          resolve(data);
        });
      });
    } catch (e) {
      console.log(e);
    }
  });
};
