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
      const { chatId } = req.query;

      if (!chatId) {
        return res.status(400).json({
          message: "invalid data",
          resultCode: 400,
        });
      }

      const messages = await messageModel.getUserMessagesModel(chatId);

      return res.json(messages);
    } catch (err) {
      return res.status(500).json({
        message: "internal server error",
        resultCode: 500,
        error: err.message,
      });
    }
  },

  deleteUserMessage: async (req, res) => {
    try {
      const result = await messageModel.deleteUserMessageModel(req);

      if (result) {
        return res.status(200).json({
          message: "delete successfully",
          code: 200,
        });
      } else {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: "internal server error",
        code: 500,
        error: err.message,
      });
    }
  },
};
