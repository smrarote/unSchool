import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
const SALT_ROUNDS = 10;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ?? 'IWILLDEDeMOIE4UMYL0V3';
const TOP_SECRET = process.env.TOP_SECRET ?? 'IWILLDEDeMOIE4UMYL0V3';
import jwt from 'jsonwebtoken';
import { Result } from '../global';
// generate hash based on the salt rounds
export const genHash = async (plainText: string): Promise<string> => {
  const salt: number | string = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(plainText, salt);
};

// compair the encryption
export const compHash = async (plainText: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plainText, hash);
};

// encryption
export const encrypt = async (data: string | object): Promise<string> => {
  if (typeof data === 'string') {
    data = { data: data };
  }
  // use AES512
  data = JSON.stringify(data);
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decrypt = async (ciphertText: string): Promise<object> => {
  const buffer = CryptoJS.AES.decrypt(ciphertText, ENCRYPTION_KEY);
  return JSON.parse(buffer.toString(CryptoJS.enc.Utf8));
};

export const jwtSign = (data: object, _ex: number = 60): string => {
  return jwt.sign(
    {
      data: data,
    },
    TOP_SECRET,
    {
      expiresIn: _ex * 60,
    },
  );
};

export const jwtVerify = (token: string): Result => {
  let decode = null;
  try {
    decode = jwt.verify(token, TOP_SECRET);
  } catch (error) {
    return { state: 'failed', error: error };
  }
  return { state: 'success', data: decode };
};
