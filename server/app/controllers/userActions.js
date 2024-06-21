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

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
};
