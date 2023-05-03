const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function hashMessage(message) {
  return keccak256(Uint8Array.from(message));
}

function verifySignature(sig, msg, publicKey) {
  const msgHash = hashMessage(msg);
  return secp256k1.verify(sig, msgHash, publicKey);
}

module.exports = {
  verifySignature,
};
