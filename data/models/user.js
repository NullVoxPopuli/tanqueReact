export default {
  schema: {
    properties: {
      id: {},
      alias: { type: 'string' },
      publicKey: { type: 'string' },
      location: { type: 'string' },
      status: { type: 'string' },
    },
  },
  relations: {
    hasMany: {
      chatRoom: {
        foreignKey: 'userWithId',
        localField: 'chatRooms',
      },
    },
  },
};

export var OFFLINE = 'offline';
export var ONLINE = 'online';
