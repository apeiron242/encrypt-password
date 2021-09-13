import db from "./dbConnect";
import * as CryptoJs from "crypto-js";
import { encryptUserPassword } from "./encrypt";
import { EncryptionInterface } from "./interfaces";

const decrypt = async (password: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hash = await encryptUserPassword(password);
      const data: EncryptionInterface[] = [];
      db.serialize(() => {
        db.all("SELECT * FROM pw", async (err, rows) => {
          if (err) return err.message;
          data.push(...rows);
          const result = await decryptData(data, hash);
          resolve(result);
        });
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const decryptData = (data: EncryptionInterface[], hash: string) => {
  const result: EncryptionInterface[] = [];

  data.forEach((elem) => {
    const { id, sitename } = elem;
    const username = CryptoJs.AES.decrypt(elem.username, hash).toString(
      CryptoJs.enc.Utf8
    );
    const password = CryptoJs.AES.decrypt(elem.password, hash).toString(
      CryptoJs.enc.Utf8
    );
    const obj: EncryptionInterface = {
      id,
      sitename,
      username,
      password,
    };
    result.push(obj);
  });
  return result;
};

export default decrypt;
