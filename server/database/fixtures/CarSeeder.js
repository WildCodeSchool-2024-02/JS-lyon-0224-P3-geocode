const AbstractSeeder = require("./AbstractSeeder");
const database = require("../client");
const UserSeeder = require("./UserSeeder");
const SocketSeeder = require("./SocketSeeder");

class CarSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "cars",
      truncate: true,
      dependencies: [UserSeeder, SocketSeeder],
    });
  }

  async run() {
    // Fetch user IDs from the user table
    const [users] = await database.query(`SELECT id FROM user`);
    // Fetch socket types from the socket table
    const [sockets] = await database.query(`SELECT type FROM socket`);

    // Check if users and sockets tables are populated
    if (!users.length || !sockets.length) {
      throw new Error("Users or Sockets table is empty");
    }

    const userIds = users.map((user) => user.id);
    const socketTypes = sockets.map((socket) => socket.type);

    // Generate and insert fake car data
    for (let i = 0; i < users.length; i += 1) {
      // Check if the user already has a car
      const userHasCar = database.query(
        `SELECT * FROM cars WHERE user_id = ?`,
        [userIds[i]]
      );

      // If the user doesn't have a car, add a new one
      if (userHasCar.length === 0) {
        const fakeCar = {
          brand: this.faker.vehicle.manufacturer(),
          model: this.faker.vehicle.model(),
          socket: socketTypes[Math.floor(Math.random() * socketTypes.length)],
          user_id: userIds[i],
        };

        this.insert(fakeCar);
      }

      // Add additional cars for each user (if desired)
      for (let j = 1; j < Math.floor(Math.random() * 5) + 1; j += 1) {
        // Add logic to check if the user already has additional cars here
        const additionalCar = {
          brand: this.faker.vehicle.manufacturer(),
          model: this.faker.vehicle.model(),
          socket: socketTypes[Math.floor(Math.random() * socketTypes.length)],
          user_id: userIds[i],
        };

        this.insert(additionalCar);
      }
    }

    // Ensure all promises are resolved
  }
}

module.exports = CarSeeder;
