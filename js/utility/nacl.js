import * as NaCl from 'tweetnacl';

import { convertUint8ArrayToBase64String } from 'utility';

export function generateNewKeys() {
  const newKeys = NaCl.box.keyPair();

  // always store ase base64 string
  const publicKey = convertUint8ArrayToBase64String(newKeys.publicKey);
  const privateKey = convertUint8ArrayToBase64String(newKeys.secretKey);

  return { publicKey, privateKey };
}

export function boxFor(message, theirPublicKey, mySecretKey) {
  const nonce = 0;
  return NaCl.box(message, nonce, theirPublicKey, mySecretKey);
}

export function encryptFor(message, theirPublicKey, mySecretKey) {
  const box = boxFor(message, theirPublicKey, mySecretKey);
  return box;
}

export function decryptFrom(message, theirPublicKey, mySecretKey) {
  const nonce = 0;
  const box = boxFor(message, theirPublicKey, mySecretKey);
  const decrypted = NaCl.box.open(box, nonce, theirPublicKey, mySecretKey);

  return decrypted;
}
