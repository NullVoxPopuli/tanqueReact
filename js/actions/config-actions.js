export const CONFIG_CHANGE_ALIAS    = 'CHANGE_ALIAS';
export const CHANGE_KEYS            = 'CHANGE_KEYS';
export const CHANGE_UID             = 'CHANGE_UID';
export const CONFIG_REGENERATE_UID  = 'CONFIG_REGENERATE_UID';
export const CONFIG_REGENERATE_KEYS = 'CONFIG_REGENERATE_KEYS';

export function changeAlias(newAlias) {
  return {
    type: CONFIG_CHANGE_ALIAS,
    alias: newAlias,
  };
}

export function regenerateUid() {
  return {
    type: CONFIG_REGENERATE_UID,
  };
}

export function regenerateKeys() {
  return {
    type: CONFIG_REGENERATE_KEYS,
  };
}
