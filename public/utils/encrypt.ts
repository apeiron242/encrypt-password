import { EncryptionInterface } from "./interfaces";
import db from "./dbConnect";
import * as bcrypt from "bcrypt";
import * as CryptoJs from "crypto-js";

const saltRounds = 10;

export const newPost = async (data: EncryptionInterface) => {
  try {
    data = await encryptDataPassword(data);
    db.run(
      `INSERT INTO PW(sitename, username, password) VALUES(?,?,?)`,
      [data.siteName, data.username, data.password],
      (err) => {
        return err;
      }
    );

    return "ok";
  } catch (error) {
    return error;
  }
};

const encryptUserPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const encryptDataPassword = async (data: EncryptionInterface) => {
  const userPasswordHash = await encryptUserPassword(data.userPassword);
  const passwordHash = CryptoJs.AES.encrypt(
    data.password,
    userPasswordHash
  ).toString();

  data = {
    siteName: data.siteName,
    username: data.username,
    password: passwordHash,
  };
  return data;
};
