'use strict';
const crypto = require('node:crypto');
const fs = require('node:fs');

const UINT32_MAX = 0xffffffff;
const BUF_LEN = 1024;
const BUF_SIZE = BUF_LEN * Uint32Array.BYTES_PER_ELEMENT;

const randomPrefetcher = {
  buf: crypto.randomBytes(BUF_SIZE),
  pos: 0,
  next() {
    const { buf, pos } = this;
    let start = pos;
    if (start == buf.length) {
      start = 0;
      crypto.randomFillSync(buf);
    }
    const end = start + Uint32Array.BYTES_PER_ELEMENT;
    this.pos = end;
    return buf.subarray(start, end);
  },
};

const cryptoRandom = () => {
  const buf = randomPrefetcher.next();
  return buf.readUInt32LE(0) / (UINT32_MAX + 1);
};

const generateUUID = () => {
  const h1 = randomPrefetcher.next().toString('hex');
  const h2 = randomPrefetcher.next().toString('hex');
  const buf = randomPrefetcher.next();
  buf[6] = (buf[6] & 0x0f) | 0x40;
  buf[8] = (buf[8] & 0x3f) | 0x80;
  const h3 = buf.toString('hex');
  const h4 = randomPrefetcher.next().toString('hex');
  const d2 = h2.substring(0, 4);
  const d3 = h3.substring(0, 4);
  const d4 = h3.substring(4, 8);
  const d5 = h2.substring(4, 8) + h4;
  return [h1, d2, d3, d4, d5].join('-');
};

const generateKey = (length, possible) => {
  const base = possible.length;
  let key = '';
  for (let i = 0; i < length; i++) {
    const index = Math.floor(cryptoRandom() * base);
    key += possible[index];
  }
  return key;
};

const CRC_LEN = 4;

const crcToken = (secret, key) => {
  const md5 = crypto.createHash('md5').update(key, secret);
  return md5.digest('hex').substring(0, CRC_LEN);
};

const generateToken = (secret, characters, length) => {
  const key = generateKey(length - CRC_LEN, characters);
  return key + crcToken(secret, key);
};

const validateToken = (secret, token) => {
  if (!token || token.length < CRC_LEN) return false;
  const length = token.length;
  const crc = token.slice(length - CRC_LEN);
  const key = token.slice(0, -CRC_LEN);
  return crcToken(secret, key) === crc;
};

const SCRYPT_PARAMS = {
  N: 32768,
  r: 8,
  p: 1,
  maxmem: 64 * 1024 * 1024,
  dkLen: 32,
};
const SCRYPT_PREFIX = '$scrypt$N=32768,r=8,p=1$,maxmem=67108864$,dkLen=32$';

const serializeHash = (hash, salt) => {
  const saltString = salt.toString('base64').split('=')[0];
  const hashString = hash.toString('base64').split('=')[0];
  return `${SCRYPT_PREFIX}${saltString}$${hashString}`;
};

const parseOptions = (options) => {
  const values = [];
  const items = options.split(',');
  for (const item of items) {
    const [key, value] = item.split('=');
    values.push([key, Number(value)]);
  }
  return Object.fromEntries(values);
};

const deserializeHash = (phcString) => {
  const [, name, options, salt64, hash64] = phcString.split('$');
  if (name !== 'scrypt') {
    throw new Error(
      'Unsupported hash algorithm, Node.js crypto module only supports scrypt'
    );
  }
  const params = parseOptions(options);
  const salt = Buffer.from(salt64, 'base64');
  const hash = Buffer.from(hash64, 'base64');
  return { params, salt, hash };
};

const SALT_LEN = 32;
const KEY_LEN = 64;

const hashPassword = async (password) => {
  const salt = crypto.randomBytes(SALT_LEN);
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, KEY_LEN, SCRYPT_PARAMS, (err, derivedKey) => {
      if (err) {
        reject(new Error('Error hashing the password: ' + err.message));
      } else {
        resolve(serializeHash(derivedKey, salt));
      }
    });
  });
};

let defaultHash;
hashPassword('')
  .then((hash) => {
    defaultHash = hash;
  })
  .catch((err) => {
    console.error('Error hashing password:', err);
  });

const validatePassword = (password, serHash = defaultHash) => {
  const { params, salt, hash } = deserializeHash(serHash);
  return new Promise((resolve, reject) => {
    crypto.scrypt(
      password,
      salt,
      hash.length,
      params,
      (err, hashedPassword) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(crypto.timingSafeEqual(hashedPassword, hash));
      }
    );
  });
};

const md5 = (filePath) => {
  const hash = crypto.createHash('md5');
  const file = fs.createReadStream(filePath);
  return new Promise((resolve, reject) => {
    file.on('error', reject);
    hash.once('readable', () => {
      resolve(hash.read().toString('hex'));
    });
    file.pipe(hash);
  });
};

module.exports = {
  cryptoRandom,
  generateUUID,
  generateKey,
  crcToken,
  generateToken,
  validateToken,
  serializeHash,
  deserializeHash,
  hashPassword,
  validatePassword,
  md5,
};
