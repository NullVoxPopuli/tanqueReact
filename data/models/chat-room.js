export default {
  schema: {
    properties: {
      id: { type: 'string' },
    },
  },
  relations: {
    hasMany: {
      message: {
        foreignKey: 'chatRoomId',
        localField: 'messages',
      },
    },
    belongsTo: {
      user: {
        foreignKey: 'userWithId',
        localField: 'user',
      },
    },
  },
};
