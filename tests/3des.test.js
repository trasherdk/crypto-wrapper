const { tripleDes } = require("../src");

let encrypted = tripleDes.encrypt("test", "encryptlab");
let decrypted = tripleDes.decrypt("iS22vsedn7c=", "encryptlab");

test("is encrypt work?", () => {
  expect(encrypted).toBeTruthy();
});

test("is decrypt work?", () => {
  expect(decrypted).toBeTruthy();
});
