const crypto = require("crypto");

module.exports.encrypt = async (data, key) => {
  let encrypted = ""
  let derivedKey
  let cipher

  try {
    derivedKey = crypto.pbkdf2Sync(key, 'salt', 10000, 12, 'sha1');
  }
  catch (err) {
    // console.error("Encrypt:", err)
    return err
  }
  try {
    cipher = crypto.createCipheriv('des-ede3', derivedKey.toString('hex'), '');

    encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
  }
  catch (err) {
    // console.error("Encrypt:", err)
    return err
  }

  return encrypted;
}

module.exports.decrypt = async (data, key) => {
  let decrypted = ""
  let derivedKey
  let decipher

  try {
    derivedKey = crypto.pbkdf2Sync(key, 'salt', 10000, 12, 'sha1');
  }
  catch (err) {
    // console.error("Decrypt:", err)
    return false
  }
  try {
    decipher = crypto.createDecipheriv('des-ede3', derivedKey.toString('hex'), '');

    decrypted = decipher.update(data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
  }
  catch (err) {
    // console.error("Decrypt:", err)
    return err
  }

  return decrypted;
}
