// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const stationsRepository = require("../../database/models/StationRepository");

// Test suite for stationsRepository
describe("stationsRepository", () => {
  // Test: Check if stationsRepository extends AbstractRepository
  test("stationsRepository extends AbstractRepository", async () => {
    expect(Object.getPrototypeOf(stationsRepository)).toBe(AbstractRepository);
  });
  test("tables.stations = new stationsRepository", async () => {
    // Assertions
    expect(tables.stations instanceof stationsRepository).toBe(true);
  });
  test("create => insert into", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);
  });
});
