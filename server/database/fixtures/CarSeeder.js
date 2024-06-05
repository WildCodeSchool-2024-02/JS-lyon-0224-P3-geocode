const AbstractSeeder = require("./AbstractSeeder");
const UserSeeder = require("./UserSeeder");

class CarSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "cars", truncate: true, dependencies: [UserSeeder] });
  }

  // The run method - Populate the 'Car' table with fake data

  run() {
    // Generate and insert fake data into the 'Car' table
    for (let i = 0; i < 20; i += 1) {
      // Generate fake Car data
      const fakeCar = {
        brand: this.faker.vehicle.manufacturer(), // Generate a fake car brand
        model: this.faker.vehicle.model(), // Generate a fake car model
        Socket: this.faker.lorem.word(), // generate random word for socket
        user_id: this.getRef(`user_${i}`).insertId,
      };
      // Insert the fakeCar data into the 'Car' table
      this.insert(fakeCar); // insert into Car(email, password) values (?, ?)
    }
  }
}

// Export the CarSeeder class
module.exports = CarSeeder;
