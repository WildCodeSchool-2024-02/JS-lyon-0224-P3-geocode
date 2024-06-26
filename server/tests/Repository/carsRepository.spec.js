// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const carsRepository = require("../../database/models/carsRepository");

// Test suite for carsRepository
describe("carsRepository", () => {
  // Test: Check if carsRepository extends AbstractRepository
  test("carsRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(carsRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.cars is an instance of carsRepository
  test("tables.cars = new carsRepository", async () => {
    // Assertions
    expect(tables.cars instanceof carsRepository).toBe(true);
  });

  // Test: Check if create method inserts data into the 'cars' table
  test("create => insert into", async () => {
    // Mock result of the database query
    const result = { insertId: 1 };

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake cars data
    const fakecars = { cars_id: 0 };

    // Call the create method of the cars repository
    const returned = await tables.cars.create(fakecars);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "insert into cars (title, cars_id) values (?, ?)",
      [undefined, 0]
    );

    expect(returned).toBe(result.insertId);
  });
  test("readAll => select", async () => {
    // Mock empty rows returned from the database)
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the readAll method of the cars repository
    const returned = await tables.cars.readAll();

    // Assertions
    expect(database.query).toHaveBeenCalledWith("select * from cars");
    expect(returned).toStrictEqual(rows);
  });

  // Test: Check if read method selects data from the 'cars' table based on id
  test("read => select with id", async () => {
    // Mock rows returned from the database
    const rows = [
      {
        id: undefined,
        admin: undefined,
        cars: [
          {
            title: undefined,
            cars_id: undefined,
          },
        ],
      },
    ];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the read method of the cars repository
    const returned = await tables.cars.read(0);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "select * from cars where id = ?",
      [0]
    );
    expect(returned).toStrictEqual(rows[0]);
  });
});
