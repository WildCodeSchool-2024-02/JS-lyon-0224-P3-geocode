const AbstractRepository = require("./AbstractRepository");

class userRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [user.title, user.user_id]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  // Read a user with their associated cars
  async readWithCars(id) {
    const query = `
      SELECT 
        user.id, user.firstname, user.lastname, user.email, user.city, user.image, user.admin,
        cars.id as car_id, cars.brand, cars.model, cars.socket
      FROM ${this.table} user
      LEFT JOIN cars ON user.id = cars.user_id
      WHERE user.id = ?
    `;

    const [rows] = await this.database.query(query, [id]);
    return rows;
  }
}

module.exports = userRepository;
