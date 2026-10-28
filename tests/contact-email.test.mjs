import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/contactEmail.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source.replaceAll("import.meta.env", "__emailjsEnv"), {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.CommonJS,
    esModuleInterop: true,
  },
}).outputText;

// Execute the real helper with a stub SDK. No test can import the real sender.
function loadSender(env = {}, result = async () => ({ status: 200, text: "OK" })) {
  const calls = [];
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    __emailjsEnv: env,
    require(specifier) {
      assert.equal(specifier, "@emailjs/browser");
      return {
        send(...args) {
          calls.push(JSON.parse(JSON.stringify(args)));
          return result();
        },
      };
    },
  });
  return { send: exports.sendContactEnquiry, calls };
}

const enquiry = {
  name: "Contact Form Test",
  email: "visitor@example.com",
  phone: "+15550101000",
  message: "First line of the enquiry.\nSecond line, with <literal text>.",
};

test("sends the four exact template variables and configured public identifiers", async () => {
  const { send, calls } = loadSender();
  const response = await send(enquiry);
  assert.equal(response.status, 200);
  assert.deepEqual(calls, [[
    "service_clu4c65",
    "template_yti2l9y",
    {
      user_name: enquiry.name,
      user_email: enquiry.email,
      user_phone: enquiry.phone,
      message: enquiry.message,
    },
    { publicKey: "caODYuv3Wp48p9Ms7" },
  ]]);
});

test("empty build variables fall back to the configured account", async () => {
  const { send, calls } = loadSender({
    VITE_EMAILJS_SERVICE_ID: "",
    VITE_EMAILJS_TEMPLATE_ID: "   ",
    VITE_EMAILJS_PUBLIC_KEY: "\t",
  });
  await send(enquiry);
  assert.equal(calls[0][0], "service_clu4c65");
  assert.equal(calls[0][1], "template_yti2l9y");
  assert.deepEqual(calls[0][3], { publicKey: "caODYuv3Wp48p9Ms7" });
});

test("explicit local overrides are trimmed and used together", async () => {
  const { send, calls } = loadSender({
    VITE_EMAILJS_SERVICE_ID: " service_test ",
    VITE_EMAILJS_TEMPLATE_ID: " template_test ",
    VITE_EMAILJS_PUBLIC_KEY: " public_test ",
  });
  await send(enquiry);
  assert.equal(calls[0][0], "service_test");
  assert.equal(calls[0][1], "template_test");
  assert.deepEqual(calls[0][3], { publicKey: "public_test" });
});

test("delivery errors reach the form instead of reporting success", async () => {
  const failure = new Error("Simulated EmailJS failure");
  const { send, calls } = loadSender({}, async () => { throw failure; });
  await assert.rejects(send(enquiry), (error) => error === failure);
  assert.equal(calls.length, 1);
});
