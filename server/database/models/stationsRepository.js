const AbstractRepository = require("./AbstractRepository");

class stationsRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "stations" as configuration
    super({ table: "stations" });
  }

  // The C of CRUD - Create operation

  async create(stations) {
    // Execute the SQL INSERT query to add a new stations to the "stations" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, stations_id) values (?, ?)`,
      [stations.title, stations.stations_id]
    );

    // Return the ID of the newly inserted stations
    return result.insertId;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all stationss from the "stations" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of stationss
    return rows;
  }
}

module.exports = stationsRepository;
