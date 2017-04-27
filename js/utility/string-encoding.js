const naclUtil = require('tweetnacl-util');

export function convertUint8ArrayToBase64String(array) {
  return naclUtil.encodeBase64(array);

  // const string = String.fromCharCode.apply(null, array);
  // return btoa(string);
}

export function convertBase64StringToUint8Array(base64) {
  return naclUtil.decodeBase64(base64);
  // const string = atob(base64);
  // const buffer = new ArrayBuffer(string.length); // one byte per char, cause only UTF8
  // const array = new Uint8Array(buffer);
  //
  // for (let i = 0, strLen = string.length; i < strLen; i++) {
  //   array[i] = string.charCodeAt(i);
  // }
  //
  // return array;
}

export function convertStringToUint8Array(string) {
  const base64 = btoa(string);
  return naclUtil.decodeBase64(base64);
}

export function convertUint8ArrayToString(array) {
  const base64 = convertUint8ArrayToBase64String(array);
  return atob(base64);
}

export function convertObjectToBase64String(object) {
  const json = JSON.stringify(object);
  const base64 = btoa(json);

  return base64;
}

export function convertBase64StringToObject(base64) {
  const json = atob(base64);
  const object = JSON.parse(json);

  return object;
}

export function objectToDataURL(object) {
  const string = convertObjectToBase64String(object);
  return `data:text/json;base64,${string}`;
}

// http://stackoverflow.com/a/39460727
export function base64ToHex(base64) {
  if (base64 === undefined) return undefined;

  // convert to binary, than to hex
  const raw = atob(base64);
  let hex = '';

  for (let i = 0; i < raw.length; i++ ) {
    let _hex = raw.charCodeAt(i).toString(16)
    hex += (_hex.length === 2 ?_hex:'0'+_hex);
  }

  return hex.toUpperCase();
}
