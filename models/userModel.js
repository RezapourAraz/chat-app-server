const connection = require("../dbService");
const bcrypt = require("bcrypt");

module.exports = {
  signupUserModel: async (req) => {
    const { email, userName, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const registeredEmail = await connection("users")
      .where({ email: email })
      .first();

    const registeredUserName = await connection("users")
      .where({
        userName: userName,
      })
      .first();

    if (!registeredEmail && !registeredUserName) {
      const result = await connection("users").insert({
        userName,
        email,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      });

      if (result[0]) return result[0];
    } else {
      return null;
    }
  },
  signInUserModel: async (req) => {
    const { userName, password } = req.body;

    const user = await connection("users")
      .select(
        "id",
        "firstName",
        "lastName",
        "userName",
        "email",
        "password",
        "profile",
        "phone"
      )
      .where("userName", userName)
      .first();

    if (user) {
      // check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        return {
          data: user,
          code: 200,
          message: "successfully",
        };
      } else {
        return { message: "invalid password", code: 400 };
      }
    } else {
      return { message: "user not found", code: 404 };
    }
  },
};
