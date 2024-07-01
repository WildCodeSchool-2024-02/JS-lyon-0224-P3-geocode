const AbstractRepository = require("./AbstractRepository");

class CarRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "car" as configuration
    super({ table: "car" });
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
    // Execute the SQL SELECT query to retrieve all cars from the "car" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of cars
    return rows;
  }

  async update(car) {
    if (
      car.id === undefined ||
      car.brand === undefined ||
      car.model === undefined ||
      car.socket === undefined ||
      car.user_id === undefined
    ) {
      throw new Error("Missing required fields");
    }

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET brand = ?, model = ?, socket = ? WHERE user_id = ? AND id = ?`,
      [car.brand, car.model, car.socket, car.user_id, car.id]
    );

    return result.affectedRows;
  }
}

module.exports = CarRepository;
