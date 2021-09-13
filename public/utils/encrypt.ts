import { EncryptionInterface } from "./interfaces";
import db from "./dbConnect";
import * as CryptoJs from "crypto-js";

const newPost = async (data: EncryptionInterface) => {
  try {
    const { sitename, username, password } = await encryptData(data);

    db.serialize(async () => {
      const stmt = db.prepare(
        `INSERT INTO pw (sitename, username, password) VALUES (?,?,?)`
      );
      stmt.run([sitename, username, password]);
    });
  } catch (error) {
    console.log(error);
    return error;
  }
  return "ok";
};

export const encryptUserPassword = async (password: string) => {
  const hash = CryptoJs.SHA256(password);
  return hash.toString();
};

const encryptData = async (data: EncryptionInterface) => {
  const userPasswordHash = await encryptUserPassword(data.userPassword);
  const usernameHash = CryptoJs.AES.encrypt(
    data.username,
    userPasswordHash
  ).toString();
  const passwordHash = CryptoJs.AES.encrypt(
    data.password,
    userPasswordHash
  ).toString();

  const newData = {
    sitename: data.sitename,
    username: usernameHash,
    password: passwordHash,
  };
  return newData;
};

export default newPost;
