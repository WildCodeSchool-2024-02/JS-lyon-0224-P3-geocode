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
  const { sub } = req.auth;
  try {
    // Fetch a specific user from the database based on the provided ID
    const users = await tables.user.read(sub);

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

const edit = async (req, res, next) => {
  const user = { ...req.body, id: req.params.id };
  try {
    const affectedRows = await tables.user.update(user);
    if (affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error("Error in edit action:", err);
    res.status(500).json({ error: "Internal server error" });
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const dataUser = req.body;

  // Log the received data to debug

  try {
    const insertId = await tables.user.create(dataUser);

    // After creating the user, log the response

    res.status(201).json({ insertId });
  } catch (err) {
    console.error("Error creating user:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
    next(err);
  }
};

// The D of BREAD - Delete operation
const drop = async (req, res, next) => {
  const { id } = req.params;
  try {
    const affectedRows = await tables.user.drop(id);
    if (affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  drop,
};
