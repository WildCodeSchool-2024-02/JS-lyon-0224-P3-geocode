const argon2 = require("argon2");

// Import access to database tables
const tables = require("../../database/tables");

const signin = async (req, res, next) => {
  try {


    // Fetch a specific user from the database based on the provided email
    const user = await tables.user.readByEmail(req.body.email);

    if (user == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password
    );

    if (verified === true) {
      // Respond with the user in JSON format (but without the hashed password)
      delete user.hashed_password;
      res.status(201).json({ id: user.id });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  signin,
};



