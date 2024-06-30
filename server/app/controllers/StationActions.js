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
  const { stationId, userId, carId, reservationTime, duration } = req.body;

  try {
    const station = await tables.station.read(stationId);
    if (station === null) {
      return res.status(404).json({ message: 'Station not found' });
    }

    if (station.spots <= 0) {
      return res.status(400).json({ message: 'No spots available' });
    }

    const reservation = await tables.rent.create({
      stationId,
      userId,
      carId,
      reservationTime,
      duration,
    });

    await tables.station.updateSpots(stationId, station.spots - 1);

    setTimeout(async () => {
      await tables.station.updateSpots(stationId, station.spots + 1);
    }, duration * 60 * 1000);

    return res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  rent,
};