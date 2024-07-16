const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }

  // The run method - Populate the 'user' table with fake data

  run() {
    // Generate and insert fake data into the 'user' table
    for (let i = 0; i < 25; i += 1) {
      // Generate fake user data
      const fakeUser = {
        firstname: this.faker.person.firstName(), // Gnerate a fake name
        lastname: this.faker.person.lastName(), // Generate a fake name
        city: this.faker.location.city("FR"),
        email: this.faker.internet.email(), // Generate a fake email using faker library
        image: this.faker.image.avatarLegacy(), // Generate random image
        hashed_password: this.faker.internet.password(),
        role: "user",
        refName: `user_${i}`,
      };

      // Insert the fakeUser data into the 'user' table
      this.insert(fakeUser); // insert into user(email, password) values (?, ?)
    }
    return Promise.all(this.promises);
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
