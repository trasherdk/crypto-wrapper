const { scrypt } = require('../src');

const clearText = 'This is the text to encode as password';

describe('Test scrypt hashing and compare', () => {
  describe('Test hashing with default parameters', () => {
    const hashLength = 64;
    const saltLength = 16;

    test('It should create a hash string', async () => {
      const hashString = await scrypt.hash(clearText);
      expect(hashString).toBeTruthy();
    });

    test(`Hash string should be ${(hashLength + saltLength) * 2} characters in length`, async () => {
      const hashString = await scrypt.hash(clearText);
      expect(hashString.length).toBe((hashLength + saltLength) * 2);
    });

    test('Compare should return true for match', async () => {
      const hashString = await scrypt.hash(clearText);
      const result = await scrypt.compare(hashString, clearText);
      expect(result).toBeTruthy();
    });

    test('Compare should return false for mismatch', async () => {
      const hashString = await scrypt.hash(clearText);
      const result = await scrypt.compare(hashString, 'some bullshit string');
      expect(result).toBeFalsy();
    });
  });

  describe('Test hashing with hashLength 128 parameters', () => {
    const hashLength = 128;
    const saltLength = 16;

    test('It should create a hash string', async () => {
      const hashString = await scrypt.hash(clearText, hashLength);
      expect(hashString).toBeTruthy();
    });

    test(`Hash string should be ${(hashLength + saltLength) * 2} characters in length`, async () => {
      const hashString = await scrypt.hash(clearText, hashLength);
      expect(hashString.length).toBe((hashLength + saltLength) * 2);
    });

    test('Compare should return true for match', async () => {
      const hashString = await scrypt.hash(clearText, hashLength);
      const result = await scrypt.compare(hashString, clearText, hashLength);
      expect(result).toBeTruthy();
    });

    test('Compare should return false for mismatch', async () => {
      const hashString = await scrypt.hash(clearText, hashLength);
      const result = await scrypt.compare(hashString, 'some bullshit string', hashLength);
      expect(result).toBeFalsy();
    });
  });

  describe('Test hashing with hashLength=128, saltLength=32 parameters', () => {
    const hashLength = 128;
    const saltLength = 32;

    test('It should create a hash string', async () => {
      const hashString = await scrypt.hash(clearText, hashLength, saltLength);
      expect(hashString).toBeTruthy();
    });

    test(`Hash string should be ${(hashLength + saltLength) * 2} characters in length`, async () => {
      const hashString = await scrypt.hash(clearText, hashLength, saltLength);
      expect(hashString.length).toBe((hashLength + saltLength) * 2);
    });

    test('Compare should return true for match', async () => {
      const hashString = await scrypt.hash(clearText, hashLength, saltLength);
      const result = await scrypt.compare(hashString, clearText, hashLength, saltLength);
      expect(result).toBeTruthy();
    });

    test('Compare should return false for mismatch', async () => {
      const hashString = await scrypt.hash(clearText, hashLength, saltLength);
      const result = await scrypt.compare(hashString, 'some bullshit string', hashLength, saltLength);
      expect(result).toBeFalsy();
    });
  });
});
