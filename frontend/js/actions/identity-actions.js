export const IDENTITY_IMPORT = 'IDENTITY_IMPORT';
export const IDENTITY_EXPORT = 'IDENTITY_EXPORT';

export function importIdentity(stringifiedJson) {
  return {
    type: IDENTITY_IMPORT,
    stringifiedJson: stringifiedJson,
  };
}

export function exportIdentity() {
  return {
    type: IDENTITY_EXPORT,
  };
}
