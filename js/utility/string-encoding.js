export function convertUint8ArrayToBase64String(array) {
  const string = String.fromCharCode.apply(null, array);
  return btoa(string);
}

export function convertBase64StringToUint8Array(base64) {
  const string = atob(base64);
  const buffer = new ArrayBuffer(string.length); // one byte per char, cause only UTF8
  const array = new Uint8Array(buffer);

  for (let i = 0, strLen = string.length; i < strLen; i++) {
    array[i] = string.charCodeAt(i);
  }

  return array;
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
