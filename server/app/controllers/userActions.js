// Import access to database tables

const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all userfrom the database
    const user = await tables.user.readAll();

    // Respond with the userin JSON format
    res.json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const users = await tables.user.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the users in JSON format
    if (users == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const { user, car } = req.body;

  const connection = await tables.user.database.getConnection();

  try {
    await connection.beginTransaction();

    // Insert the user into the database
    const userId = await tables.user.create(user, connection);

    // Add the user_id to the car data
    car.user_id = userId;

    // Insert the car into the database
    await tables.car.create(car, connection);

    // Commit the transaction
    await connection.commit();

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId: userId });
  } catch (err) {
    // Rollback the transaction in case of error
    await connection.rollback();
    res.status(500).json({ error: "An error occurred during the signup process" });
    next(err);
  } finally {
    connection.release();
  }
};


// Ready to export the controller functions
module.exports = {
  browse,
  read,
  add,
};
