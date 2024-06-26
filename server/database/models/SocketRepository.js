const AbstractRepository = require("./AbstractRepository");

class SocketRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "socket" as configuration
    super({ table: "socket" });
  }

  // The C of CRUD - Create operation

  async create(socket) {
    const [result] = await this.database.query(
      `insert into ${this.table} (type) values (?)`,
      [socket.type]
    );
    return result.insertId;
  }

  async readAll() {
    const query = `select * from ${this.table}`;
    const [rows] = await this.database.query(query);
    return rows;
  }

  async read(id) {
    const query = `select * from ${this.table} where id = ?`;
    const [rows] = await this.database.query(query, [id]);
    return rows[0];
  }
}

module.exports = SocketRepository;
