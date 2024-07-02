const AbstractSeeder = require("./AbstractSeeder");

class SocketSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "socket", truncate: true });
  }

  run() {
    const socketTypes = [
      { type: "T2" },
      { type: "E/F" },
      { type: "T3" },
      { type: "Combo" },
      { type: "Chademo" },
    ];

    socketTypes.forEach(async (socket) => {
      await this.insert(socket);
    });
  }
}

module.exports = SocketSeeder;
