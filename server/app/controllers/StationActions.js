const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all stations from the database
    const station = await tables.station.readAll();

    // Respond with the stations in JSON format
    res.json(station);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Rent a charging spot
const rent = async (req, res, next) => {
  const dataRent = req.body;

  // Log the received rent data to debug

  try {
    const result = await tables.rent.create(dataRent);

    // After creating the rent, log the response

    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating rent:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the rent" });
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  rent,
};
