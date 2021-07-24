const { tripleDes } = require("../src");

let encrypted = tripleDes.encrypt("test","encryptlab")
let decrypted = tripleDes.decrypt(Buffer.from("A6fH4bsKKgw=","utf-8"),"encryptlab");

test('is encrypt work?', async () => {
  expect(await encrypted).toBeTruthy();
});

test('is decrypt work?', async () => {
  expect(await decrypted).toBeTruthy();
});