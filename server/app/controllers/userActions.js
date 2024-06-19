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
    const users = await tables.users.read(req.params.id);

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
// New action to fetch user with cars
const readWithCars = async (req, res, next) => {
  try {
    const userWithCars = await tables.user.readWithCars(req.params.id);

    if (!userWithCars) {
      res.sendStatus(404);
    } else {
      res.status(200).json(userWithCars);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  const dataUser = req.body;
  try {
    // Insert the user into the database
    const insertId = await tables.user.create(dataUser);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    res
      .status(500)
      .json({ error: "une error est survenue lors de la création du user" });
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  readWithCars,
  add,
};
