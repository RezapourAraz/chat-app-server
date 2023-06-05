const userModel = require("../models/userModel");

module.exports = {
  signupUser: async (req, res) => {
    try {
      // check fields
      if (!req.body.userName || !req.body.password || !req.body.email) {
        return res.status(400).json({
          message: "invalid data",
          code: 400,
        });
      }

      // call model for insert data in database
      const result = await userModel.signupUserModel(req);

      // check result
      if (result) {
        return res.status(201).json({
          message: "created successfully",
          code: 201,
        });
      } else {
        return res.status(400).json({
          message: "this email address or userName already has been taken",
          code: 400,
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
  sinInUser: async (req, res) => {
    try {
      // check valid userName & password
      if (!req.body.userName || !req.body.password) {
        return res.status(400).json({
          message: "invalid data",
          code: 400,
        });
      }
      // call model for signIn result
      const result = await userModel.signInUserModel(req);

      return res.json(result);
    } catch (err) {
      return res.status(500).json({
        message: "internal server error",
        code: 500,
        error: err.message,
      });
    }
  },
};
