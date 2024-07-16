// Import access to database tables
const tables = require("../../database/tables");
// The B of BREAD - Browse (Read All) operation
const browseAsAdmin = async (req, res, next) => {
  try {
    // Fetch all userfrom the database
    const user = await tables.adminReadUser.readAllAsAdmin();

    // Respond with the userin JSON format
    res.json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browseAsAdmin,
};
