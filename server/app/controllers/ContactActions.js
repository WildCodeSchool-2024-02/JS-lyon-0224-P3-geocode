// Import access to database tables
const tables = require("../../database/tables");
// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
    // Extract the user data from the request body
    const dataUser = req.body;
    try {
      // Insert the user into the database
      const insertId = await tables.user.create(dataUser);
  
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
module.exports = {
    add
};