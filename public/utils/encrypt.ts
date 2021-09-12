import { EncryptionInterface } from "./interfaces";
import db, { dbClose } from "./dbConnect";
import * as bcrypt from "bcrypt";
import * as CryptoJs from "crypto-js";

const saltRounds = 10;

const newPost = async (data: EncryptionInterface) => {
  try {
    const { sitename, username, password } = await encryptDataPassword(data);

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
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const encryptDataPassword = async (data: EncryptionInterface) => {
  const userPasswordHash = await encryptUserPassword(data.userPassword);
  const passwordHash = CryptoJs.AES.encrypt(
    data.password,
    userPasswordHash
  ).toString();

  const newData = {
    sitename: data.sitename,
    username: data.username,
    password: passwordHash,
  };
  return newData;
};

export default newPost;
