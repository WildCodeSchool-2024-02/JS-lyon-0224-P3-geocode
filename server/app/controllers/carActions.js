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

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  const dataCar = req.body;
  try {
    // Insert the user into the database
    const insertId = await tables.car.create(dataCar);

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

// Ready to export the controller functions
module.exports = {
  browse,
  add,
};
