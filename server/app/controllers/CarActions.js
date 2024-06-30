// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all cars from the database
    const cars = await tables.car.readAll();

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
    const result = await tables.car.create(dataCar);

    // After creating the car, log the response

    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating car:", err);
    res.status(500).json({ error: "An error occurred while creating the car" });
    next(err);
  }
};

const edit = async (req, res, next) => {
  const car = { ...req.body, id: req.params.id };
  try {
    const affectedRows = await tables.car.update(car);
    if (affectedRows === 0) {
      res.status(404).json({ error: "Car not found" });
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
  add,
  edit,
};
