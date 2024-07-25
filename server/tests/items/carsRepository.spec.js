// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const carsRepository = require("../../database/models/CarRepository");

// Test suite for carsRepository
describe("carsRepository", () => {
  // Test: Check if carsRepository extends AbstractRepository
  test("carsRepository extends AbstractRepository", async () => {
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
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);
  });
});
