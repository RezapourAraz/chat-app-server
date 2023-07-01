const connection = require("../dbService");

module.exports = {
  addContactModel: async (req) => {
    const { userOne, userTwo } = req.body;

    const isContact = await connection("contacts")
      .where({
        user_one: userOne,
        user_two: userTwo,
      })
      .orWhere({ user_one: userTwo, user_two: userOne })
      .first();

    if (!isContact) {
      const result = await connection("contacts").insert({
        user_one: userOne,
        user_two: userTwo,
        updated_at: new Date(),
        created_at: new Date(),
      });

      return result[0];
    } else {
      return null;
    }
  },
  getAllContactsModel: async (req) => {
    const { userId } = req.params;

    const result = await connection("contacts")
      .where({ user_one: userId })
      .orWhere({ user_two: userId });

    if (result) return result;
  },
  deleteContactModel: async (req) => {
    const { contactId } = req.params;

    const result = await connection("contacts").where("id", contactId).del();
    return result;
  },
};
