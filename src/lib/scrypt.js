const { promisify } = require('util');
const {randomBytes, scrypt, timingSafeEqual} = require('crypto');

const scryptPromise = promisify(scrypt);


/**
 * Create a hash from a string value
 * @param {string} plainText - value to hash
 * @param {number} hashLength - length of hash default 64
 * @param {number} saltLength - length of salt default 16
 * @returns {Promise<string|Error>} Promise<string|Error>
 */
 module.exports.hash = async (plainText, hashLength=64, saltLength=16) => {
  if (!plainText) {
    throw new Error('Parameter plainText string is empty!');
  }

  const salt = randomBytes(saltLength).toString('hex');
  const hashed = await scryptPromise(plainText, salt, hashLength);

  return `${salt}${hashed.toString('hex')}`;
}

/**
 * Compare hash with plaintext value
 * @param {string} hashed - Hashed string
 * @param {string} plainText - Plaintext string for comparison
 * @param {number} hashLength - length of hash default 64
 * @param {number} saltLength - length of salt default 16
 * @returns {Promise<boolean|Error>} Promise<boolean|Error>
 */
 module.exports.compare = async (hashed, plainText, hashLength=64, saltLength=16) => {
  if (!(hashed && plainText)) {
    throw new Error('Hashed and plainText strings are required!');
  }

  if (hashed.length !== (hashLength + saltLength) * 2) {
    throw new Error(`Hash string is invalid ${hashed.length} !== ${(hashLength + saltLength) * 2}`);
  }

  const hashHEX = hashed.substr(saltLength * 2);
  const saltHEX = hashed.substr(0, saltLength * 2);

  const hashToCompare = await scryptPromise(plainText, saltHEX, hashLength);
  return timingSafeEqual(Buffer.from(hashHEX, 'hex'), hashToCompare);
}
