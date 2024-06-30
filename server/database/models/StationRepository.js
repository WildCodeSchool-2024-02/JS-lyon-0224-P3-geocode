const AbstractRepository = require("./AbstractRepository");

class StationRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "stations" as configuration
    super({ table: "station" });
  }

  // The C of CRUD - Create operation

  async create(station) {
    // Execute the SQL INSERT query to add a new station to the "stations" table
    const [result] = await this.database.query(
      `insert into ${this.table} (address, geo_x, geo_y, power, spots, type) values (?, ?, ?, ?, ?, ?)`,
      [
        station.address,
        station.geo_x,
        station.geo_y,
        station.power,
        station.spots,
        station.type,
      ]
    );

    // Return the ID of the newly inserted station
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
    // Execute the SQL SELECT query to retrieve all stations from the "station" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of stations
    return rows;
  }

  async updateSpots(id, spots) {
    await this.database.query(
      `UPDATE ${this.table} SET spots = ? WHERE id = ?`,
      [spots, id]
    );
  }
}

module.exports = StationRepository;
