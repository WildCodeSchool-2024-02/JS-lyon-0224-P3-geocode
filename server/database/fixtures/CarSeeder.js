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
    for (let i = 0; i < 50; i += 1) {
      // Adjusting to allow multiple cars per user
      const fakeCar = {
        brand: this.faker.vehicle.manufacturer(),
        model: this.faker.vehicle.model(),
        socket: socketTypes[Math.floor(Math.random() * socketTypes.length)],
        user_id: userIds[Math.floor(Math.random() * userIds.length)],
      };

      this.insert(fakeCar);
    }

    // Ensure all promises are resolved
    return Promise.all(this.promises);
  }
}

module.exports = CarSeeder;
