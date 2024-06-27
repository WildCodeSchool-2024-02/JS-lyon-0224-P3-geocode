const AbstractRepository = require("./AbstractRepository");

class carsRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "cars" as configuration
    super({ table: "cars" });
  }

  // The C of CRUD - Create operation

  async create(car) {
    // Log the car data to ensure it's not null or undefined

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (brand, model, socket, user_id) VALUES (?, ?, ?, ?)`,
      [car.brand, car.model, car.socket, car.userId]
    );
    return { carId: result.insertId };
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all carss from the "cars" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of carss
    return rows;
  }
}

module.exports = carsRepository;
