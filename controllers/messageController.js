const messageModel = require("../models/messageModel");

module.exports = {
  postUserMessage: async (req, res) => {
    try {
      const { from, to, content } = req.body;

      if ((!from || !to, !content)) {
        return res.status(400).json({
          message: "invalid data",
          resultCode: 400,
        });
      }

      const result = messageModel.postUserMessageModel(req);

      if (result) {
        return res.status(201).json({
          message: "created successfully",
          resultCode: 201,
          data: result,
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: "internal server error",
        resultCode: 500,
        error: err.message,
      });
    }
  },

  getAllUserMessages: async (req, res) => {
    try {
      const { from, to } = req.query;
      if (!from) {
        return res.status(400).json({
          message: "invalid data",
          resultCode: 400,
        });
      }

      const messages = await messageModel.getUserMessagesModel(from, to);

      return res.json(messages);
    } catch (err) {
      return res.status(500).json({
        message: "internal server error",
        resultCode: 500,
        error: err.message,
      });
    }
  },
};
