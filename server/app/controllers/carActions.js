// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all cars from the database
    const cars = await tables.cars.readAll();

    // Respond with the cars in JSON format
    res.json(cars);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add = async (req, res, next) => {
  const dataCar = req.body;

  // Log the received car data to debug

  try {
    const result = await tables.cars.create(dataCar);

    // After creating the car, log the response

    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating car:", err);
    res.status(500).json({ error: "An error occurred while creating the car" });
    next(err);
  }
};
// Ready to export the controller functions
module.exports = {
  browse,
  add,
};
