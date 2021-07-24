const { tripleDes } = require("../src");

let encrypted = tripleDes.encrypt("test", "encryptlab");
let decrypted = tripleDes.decrypt("iS22vsedn7c=", "encryptlab");

test("is encrypt work?", async () => {
  expect(await encrypted).toBeTruthy();
});

test("is decrypt work?", () => {
  expect(await decrypted).toBeTruthy();
});
