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

    if (userWithCars.length === 0) {
      res.sendStatus(404);
    } else {
      const user = {
        id: userWithCars[0].id,
        firstname: userWithCars[0].firstname,
        lastname: userWithCars[0].lastname,
        email: userWithCars[0].email,
        city: userWithCars[0].city,
        image: userWithCars[0].image,
        admin: userWithCars[0].admin,
        cars: userWithCars.map((car) => ({
          id: car.car_id,
          brand: car.brand,
          model: car.model,
          socket: car.socket,
        })),
      };
      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  readWithCars,
};
