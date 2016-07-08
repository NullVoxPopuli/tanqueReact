export default {
  schema: {
    properties: {
      id: { },

      // { message: xxx, uid: yyy }
      content: { },
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
