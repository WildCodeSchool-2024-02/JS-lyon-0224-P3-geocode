const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const station = await tables.station.readAll();
    res.json(station);
  } catch (err) {
    next(err);
  }
};

// Rent a charging spot
const rent = async (req, res, next) => {
  const dataRent = req.body;

  try {
    const result = await tables.rent.create(dataRent);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating rent:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the rent" });
    next(err);
  }
};

const checkRent = async (req, res, next) => {
  const userId = req.query.user_id || req.user?.id;
  try {
    const result = await tables.rent.getRent(userId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No reservations found for this user" });
    }
  } catch (err) {
    console.error("Error fetching rent:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the rent" });
    next(err);
  }
};

module.exports = {
  browse,
  rent,
  checkRent,
};
