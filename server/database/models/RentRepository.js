const AbstractRepository = require("./AbstractRepository");

class RentRepository extends AbstractRepository {
  constructor() {
    super({ table: "rent" });
  }

  async create(rent) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, station_id, car_id, start_time, end_time) VALUES (?, ?, ?, ?, ?)`,
      [rent.stationId, rent.userId, rent.carId, rent.startTime, rent.endTime]
    );
    return { id: result.insertId, ...rent };
  }
}

module.exports = RentRepository;
