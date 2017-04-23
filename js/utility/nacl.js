import * as NaCl from 'tweetnacl';

import { convertUint8ArrayToBase64String } from 'utility';

export function generateNewKeys() {
  const newKeys = NaCl.box.keyPair();

  // always store ase base64 string
  const publicKey = convertUint8ArrayToBase64String(newKeys.publicKey);
  const privateKey = convertUint8ArrayToBase64String(newKeys.secretKey);

  return { publicKey, privateKey };
}

export function encryptFor() {}
export function decryptFrom() {}
