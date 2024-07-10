const AbstractRepository = require("./AbstractRepository");

class RentRepository extends AbstractRepository {
  constructor() {
    super({ table: "rent" });
  }

  async create(rent) {
    const formatDateTime = (dateTimeString) => {
      const date = new Date(dateTimeString);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const hh = String(date.getHours()).padStart(2, "0");
      const min = String(date.getMinutes()).padStart(2, "0");
      const ss = String(date.getSeconds()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    };

    const startTimeFormatted = formatDateTime(rent.startTime);
    const endTimeFormatted = formatDateTime(rent.endTime);

    const [result] = await this.database.query(
      `INSERT INTO rent (user_id, station_id, car_id, start_time, end_time) VALUES (?, ?, ?, ?, ?)`,
      [
        rent.userId,
        rent.stationId,
        rent.carId,
        startTimeFormatted,
        endTimeFormatted,
      ]
    );
    return { id: result.insertId, ...rent };
  }
}

module.exports = RentRepository;
