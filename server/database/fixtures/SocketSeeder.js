const AbstractSeeder = require("./AbstractSeeder");

class SocketSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "socket", truncate: true });
  }

  run() {
    const socketTypes = [
      { type: "Type1" },
      { type: "Type2" },
      { type: "Type3" },
      { type: "Type4" },
      { type: "Type5" },
    ];


    socketTypes.forEach(async (socket) => {
      await this.insert(socket);
    });
  }
}

module.exports = SocketSeeder;
