export default {
  schema: {
    properties: {
      id: { type: 'string' },
      content: { type: 'string' },
    },
  },
  relations: {
    belongsTo: {
      user: {
        foreignKey: 'userId',
        localField: 'fromUser',
      },
      chatRoom: {
        foreignKey: 'chatRoomId',
        localField: 'chatRoom',
      },
    },
  },
};
