const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all stations from the database
    const stations = await tables.stations.readAll();

    // Respond with the stations in JSON format
    res.json(stations);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const stations = await tables.stations.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the users in JSON format
    if (stations == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(stations);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the user data from the request body and params
  const stations = { ...req.body, id: req.params.id };

  try {
    // Update the user in the database
    await tables.stations.update(stations);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};


// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
};
