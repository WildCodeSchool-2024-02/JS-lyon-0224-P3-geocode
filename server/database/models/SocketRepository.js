const AbstractRepository = require("./AbstractRepository");

class SocketRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "socket" as configuration
    super({ table: "socket" });
  }

  // The C of CRUD - Create operation

  async create(socket) {
    // Execute the SQL INSERT query to add a new socket to the "socket" table
    const [result] = await this.database.query(


      `insert into ${this.table} (type) values (?)`,
      [socket.type]

    );

    // Return the ID of the newly inserted socket
    return result.insertId;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all sockets from the "socket" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of sockets
    return rows;
  }
}

module.exports = SocketRepository;
