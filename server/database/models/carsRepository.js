const AbstractRepository = require("./AbstractRepository");

class carsRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "cars" as configuration
    super({ table: "cars" });
  }

  // The C of CRUD - Create operation

  async create(cars) {
    // Execute the SQL INSERT query to add a new cars to the "cars" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, cars_id) values (?, ?)`,
      [cars.title, cars.cars_id]
    );

    // Return the ID of the newly inserted cars
    return result.insertId;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all carss from the "cars" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of carss
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve the cars with the given ID from the "cars" table
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the cars with the given ID
    return rows[0];
  }
}

module.exports = carsRepository;
