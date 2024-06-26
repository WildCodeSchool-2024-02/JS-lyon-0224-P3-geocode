const AbstractRepository = require("./AbstractRepository");

class UsermessageRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "usermessage" as configuration
    super({ table: "usermessage" });
  }

  async create(Contact) {
    // Execute the SQL INSERT query to add a new contact to the "usermessage" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, subject, message) VALUES (?, ?, ?, ?, ?)`,
      [
        Contact.firstname,
        Contact.lastname,
        Contact.email,
        Contact.subject,
        Contact.message,
      ]
    );
    return result; // Optionally return the result or any relevant information
  }
}

module.exports = UsermessageRepository;
