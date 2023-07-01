const connection = require("../dbService");

module.exports = {
  createOrGetChatModel: async (req) => {
    const { userOne, userTwo } = req.body;

    const findChat = await connection("chats")
      .where({ user_one: userOne, user_two: userTwo })
      .orWhere({ user_one: userTwo, user_two: userOne })
      .first();

    if (!findChat) {
      const result = await connection("chats").insert({
        user_one: userOne,
        user_two: userTwo,
        updated_at: new Date(),
        created_at: new Date(),
      });
      if (result[0]) return result[0];
    } else {
      return findChat;
    }
  },
  getAllUserChatsModel: async (req) => {
    const { userId } = req.params;

    const result = await connection("chats")
      .where({ user_one: userId })
      .orWhere({ user_two: userId });

    if (result) return result;
  },
  deleteChatModel: async (req) => {
    const { chatId } = req.params;

    const result = await connection("chats").where("id", chatId).del();
    return result;
  },
};
