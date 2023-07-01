const connection = require("../dbService");
const bcrypt = require("bcrypt");

module.exports = {
  postUserMessageModel: async (req) => {
    const { chatId, senderId, content } = req.body;

    // console.log(chatId, senderId, content);

    // const encryptedMessage = await bcrypt.hash(content, 10);

    const result = await connection("messages").insert({
      sender_id: senderId,
      chat_id: chatId,
      content: content,
      updated_at: new Date(),
      created_at: new Date(),
    });

    if (result[0]) return result[0];
  },

  getUserMessagesModel: async (chatId) => {
    const messages = await connection("messages")
      .select(
        "id",
        "chat_id",
        "sender_id",
        "content",
        "updated_at",
        "created_at"
      )
      .where({ chat_id: chatId });

    if (messages) {
      return {
        data: messages,
        resultCode: 200,
        message: "successfully",
      };
    } else {
      return {
        message: "not found",
        resultCode: 404,
      };
    }
  },

  deleteUserMessageModel: async (req) => {
    const { messageId } = req.params;

    const result = await connection("messages").where("id", messageId).del();

    return result;
  },
};
