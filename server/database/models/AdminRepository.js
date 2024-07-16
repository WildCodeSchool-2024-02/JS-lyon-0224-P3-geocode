const AbstractRepository = require("./AbstractRepository");

class AdminRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // Read all users with their associated cars
  async readAllAsAdmin() {
    const [rows] = await this.database.query(`
      SELECT 
        user.id, user.firstname, user.lastname, user.email, user.city,
        car.id AS car_id, car.brand, car.model, car.socket
      FROM ${this.table}
      LEFT JOIN car ON user.id = car.user_id
    `);

    return rows;
  }
}

module.exports = AdminRepository;
