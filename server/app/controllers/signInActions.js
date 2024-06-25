// Import access to database tables
const tables = require("../../database/tables");

const signIn = async (req, res, next) => {
  try {

    // Fetch a specific user from the database based on the provided email
    const user = await tables.user.readByEmail(req.body.email);


    if (user == null || user.password !== req.body.password) {


      res.sendStatus(422);
    } else {
      // Respond with the user in JSON format (but without the hashed password)


      res.json({ id: user.id });
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware


    next(err);
  }
};

module.exports = {
  signIn,
};