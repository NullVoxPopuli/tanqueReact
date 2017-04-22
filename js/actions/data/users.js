export const IMPORT = 'data/users/IMPORT';
export const EXPORT = 'data/users/EXPORT';

export const import = json => ({ type: IMPORT, json });
export const export = json => ({ type: EXPORT, json });
