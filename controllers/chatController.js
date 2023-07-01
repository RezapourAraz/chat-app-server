const chatModel = require("../models/chatModel");

module.exports = {
  createOrGetChat: async (req, res) => {
    try {
      const result = await chatModel.createOrGetChatModel(req);

      if (result) {
        return res.status(201).json({
          data: result,
          message: "created successfully",
          code: 201,
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
  getAllUserChat: async (req, res) => {
    try {
      const result = await chatModel.getAllUserChatsModel(req);

      if (result)
        return res.status(200).json({
          message: "successfully",
          code: 200,
          data: result,
        });
    } catch (err) {
      return res.status(500).json({
        message: "internal server error",
        code: 500,
        error: err.message,
      });
    }
  },
  deleteUserChat: async (req, res) => {
    try {
      const result = await chatModel.deleteChatModel(req);

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

      console.log(result);
    } catch (err) {
      return res.status(500).json({
        message: "internal server error",
        code: 500,
        error: err.message,
      });
    }
  },
};
