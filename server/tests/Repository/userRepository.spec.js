// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const userRepository = require("../../database/models/UserRepository");

// Test suite for userRepository
describe("userRepository", () => {
  test("userRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(userRepository)).toBe(AbstractRepository);
  });
  test("tables.user = new userRepository", async () => {
    // Assertions
    expect(tables.user instanceof userRepository).toBe(true);
  });
  test("create => insert into", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake user data
    const fakeuser = { user_id: 0 };

    // Call the create method of the user repository
    const returned = await tables.user.create(fakeuser);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "insert into user (firstname, lastname, email, password, city, admin) values (?, ?, ?, ?, ?, ?)",
      []
    );
    expect(returned).toBe(result.insertId);
  });
  test("readAll => select", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the readAll method of the user repository
    const returned = await tables.user.readAll();

    // Assertions
    expect(database.query).toHaveBeenCalledWith("select * from user");
    expect(returned).toStrictEqual(rows);
  });

  // Test: Check if read method selects data from the 'user' table based on id
  test("read => select with id", async () => {
    // Mock rows returned from the database
    const rows = [
      {
        admin: undefined,
        cars: [
          {
            brand: undefined,
            id: undefined,
            model: undefined,
            socket: undefined,
          },
        ],
        city: undefined,
        email: undefined,
        firstname: undefined,
        id: undefined,
        image: undefined,
        lastname: undefined,
      },
    ];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the read method of the user repository
    const returned = await tables.user.read(0);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      `
      SELECT 
        user.id, user.firstname, user.lastname, user.email, user.city, user.image, user.admin,
        cars.id as car_id, cars.brand, cars.model, cars.socket
      FROM user
      LEFT JOIN cars ON user.id = cars.user_id
      WHERE user.id = ?
    `,
      [0]
    );

    expect(returned).toStrictEqual(rows[0]);
  });
});
