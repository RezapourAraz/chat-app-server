const connection = require("../dbService");

module.exports = {
  postUserMessageModel: async (req) => {
    const { from, to, content } = req.body;

    const result = await connection("messages").insert({
      from,
      to,
      content,
      updated_at: new Date(),
      created_at: new Date(),
    });

    if (result[0]) return result[0];
  },

  getUserMessagesModel: async (from, to) => {
    //
    console.log(from, to);
    const messages = await connection("messages")
      .select("id", "from", "to", "content", "updated_at", "created_at")
      .where({ from: from, to: to });

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

  deleteUserMessageModel: async () => {},
};
