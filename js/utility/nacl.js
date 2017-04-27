import * as NaCl from 'tweetnacl';
// TODO: switch to https://www.npmjs.com/package/secure-random
import * as randomBytes from 'random-bytes';

import { convertUint8ArrayToBase64String } from 'utility';

export function generateNewKeys() {
  const newKeys = NaCl.box.keyPair();

  // always store ase base64 string
  const publicKey = convertUint8ArrayToBase64String(newKeys.publicKey);
  const privateKey = convertUint8ArrayToBase64String(newKeys.secretKey);

  return { publicKey, privateKey };
}

export function encryptFor(messageWithoutNonce, theirPublicKey, mySecretKey) {
  const nonce = newNonce();
  const message = `${nonce}${messageWithoutNonce}`;
  const box = NaCl.box(message, nonce, theirPublicKey, mySecretKey);

  return box;
}

export function decryptFrom(messageWithNonce, theirPublicKey, mySecretKey) {
  const nonce = 0;
  const message = messageWithNonce; // TODO: break out the prepended nonce

  const box = NaCl.box(message, nonce, theirPublicKey, mySecretKey);
  const decrypted = NaCl.box.open(box, nonce, theirPublicKey, mySecretKey);

  return decrypted;
}

export function newNonce() {
  return randomBytes.sync(24);
}
