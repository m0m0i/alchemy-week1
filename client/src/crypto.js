import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

function hashMessage(message) {
  return keccak256(Uint8Array.from(message));
}

export function signMessage(msg, pk) {
  const hashedMessage = hashMessage(msg);
  return secp256k1.sign(hashedMessage, pk);
}
