const { tripleDes } = require("../src");

const clearText = "test"
const cryptText = "iS22vsedn7c=" // Just wrong "A6fH4bsKKgw="
const password = "encryptlab"

test('is encrypt work?', async () => {
  const encrypted = tripleDes.encrypt(clearText, password)

  expect(await encrypted).toBeTruthy();
});

test('is decrypt work?', async () => {
  const decrypted = tripleDes.decrypt(Buffer.from(cryptText, "base64"), password);

  expect(await decrypted).toBeTruthy();
});

test('is encrypt/decrypt what we expect?', async () => {
  let enc = await tripleDes.encrypt(clearText, password)
  let dec = await tripleDes.decrypt(Buffer.from(enc, "base64"), password);
  expect(enc).toEqual(cryptText)
  expect(dec).toEqual(clearText)
})
