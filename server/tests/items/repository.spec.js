// Import required dependencies

const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const userRepository = require("../../database/models/userRepository");
const carsRepository = require("../../database/models/carsRepository");
const SocketRepository = require("../../database/models/SocketRepository");
const stationsRepository = require("../../database/models/stationsRepository");

// Test suite for userRepository
describe("userRepository", () => {
  // Test: Check if userRepository extends AbstractRepository

  test("carsRepository extends AbstractRepository", async () => {
    expect(Object.getPrototypeOf(carsRepository)).toBe(AbstractRepository);
  });

  test("SocketRepository extends AbstractRepository", async () => {
    expect(Object.getPrototypeOf(SocketRepository)).toBe(AbstractRepository);
  });

  test("stationsRepository extends AbstractRepository", async () => {
    expect(Object.getPrototypeOf(stationsRepository)).toBe(AbstractRepository);
  });

  test("userRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(userRepository)).toBe(AbstractRepository);
  });
  // Test: Check if tables.user is an instance of userRepository
  test("tables.user = new userRepository", async () => {
    // Assertions
    expect(tables.user instanceof userRepository).toBe(true);
  });

  // Test: Check if tables.cars is an instance of carsRepository
  test("tables.cars = new carsRepository", async () => {
    // Assertions
    expect(tables.cars instanceof carsRepository).toBe(true);
  });

  // Test: Check if tables.stations is an instance of stationsRepository
  test("tables.stations = new stationsRepository", async () => {
    // Assertions
    expect(tables.stations instanceof stationsRepository).toBe(true);
  });

  // Test: Check if tables.socket is an instance of SocketRepository
  test("tables.socket = new SocketRepository", async () => {
    // Assertions
    expect(tables.socket instanceof SocketRepository).toBe(true);
  });

  // Test: Check if create method inserts data into the 'user' table
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

  // Test: Check if readAll method selects all data from the 'user' table
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
