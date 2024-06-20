const fs = require("fs");

const Papa = require("papaparse");

const AbstractSeeder = require("./AbstractSeeder");

class StationSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "stations", truncate: true });
  }

  run() {
    const csvFile = fs.readFileSync("public/assets/stations.csv", "utf8");
    const csv = Papa.parse(csvFile);

    for (let i = 1; i < csv.data.length; i += 1) {
      const row = csv.data[i];

      const station = {
        address: row[4],
        geo_x: parseFloat(row[6]),
        geo_y: parseFloat(row[7]),
        power: parseFloat(row[10]),
        spots: parseFloat(row[8]),
        type: row[11],
      };

      // Some of the data had empty fields, so we needed to filter it.

      if (
        !Number.isNaN(station.geo_x) === true &&
        !Number.isNaN(station.geo_y) === true &&
        !Number.isNaN(station.power) === true &&
        !Number.isNaN(station.spots) === true
      )
        this.insert(station);
    }
  }
}
module.exports = StationSeeder;
