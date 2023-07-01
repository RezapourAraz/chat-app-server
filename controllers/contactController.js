const contactModel = require("../models/contactModel");

module.exports = {
  addContact: async (req, res) => {
    try {
      const { userOne, userTwo } = req.body;

      if (!userOne || !userTwo) {
        return res.status(400).json({
          message: "invalid data",
          code: 400,
        });
      }

      const result = await contactModel.addContactModel(req);

      if (result) {
        return res.status(201).json({
          data: result,
          message: "create successfully",
          code: 201,
        });
      } else {
        return res.status(200).json({
          message: "already contact",
          code: 200,
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
  getAllContacts: async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          message: "invalid data",
          code: 400,
        });
      }

      const result = await contactModel.getAllContactsModel(req);

      if (result) {
        return res.status(200).json({
          data: result,
          message: "successfully",
          code: 200,
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
  deleteUserChat: async (req, res) => {
    try {
      const result = await contactModel.deleteContactModel(req);

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
