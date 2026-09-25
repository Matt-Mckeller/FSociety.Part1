import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  credentialsMatch,
  parseBasicAuthorization,
  siteGateEnabled,
} from "./site-access";

describe("site access gate", () => {
  it("treats missing user or empty password as open", () => {
    assert.equal(siteGateEnabled(undefined, "x"), false);
    assert.equal(siteGateEnabled("human", undefined), false);
    assert.equal(siteGateEnabled("human", ""), false);
    assert.equal(siteGateEnabled("human", "secret"), true);
  });

  it("parses Basic credentials and rejects junk", () => {
    const token = Buffer.from("human:secret", "utf8").toString("base64");
    assert.deepEqual(parseBasicAuthorization(`Basic ${token}`), {
      user: "human",
      pass: "secret",
    });
    assert.equal(parseBasicAuthorization(null), null);
    assert.equal(parseBasicAuthorization("Bearer abc"), null);
    assert.equal(parseBasicAuthorization("Basic !!!"), null);
  });

  it("matches only the configured pair", () => {
    const creds = { user: "human", pass: "secret" };
    assert.equal(credentialsMatch(creds, "human", "secret"), true);
    assert.equal(credentialsMatch(creds, "human", "other"), false);
    assert.equal(credentialsMatch(null, "human", "secret"), false);
  });
});
