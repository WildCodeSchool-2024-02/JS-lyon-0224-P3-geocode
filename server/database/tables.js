// Import the repository modules responsible for handling data operations on the tables
const UserRepository = require("./models/UserRepository");
const CarRepository = require("./models/CarRepository");
const StationRepository = require("./models/StationRepository");
const SocketRepository = require("./models/SocketRepository");
const UsermessageRepository = require("./models/UsermessageRepsitory");
const RentRepository = require("./models/RentRepository");
// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.user = new UserRepository();
tables.car = new CarRepository();
tables.station = new StationRepository();
tables.socket = new SocketRepository();
tables.usermessage = new UsermessageRepository();
tables.rent = new RentRepository();

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
