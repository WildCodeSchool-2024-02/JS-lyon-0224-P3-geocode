// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const stationsRepository = require("../../database/models/stationsRepository");

// Test suite for stationsRepository
describe("stationsRepository", () => {
  // Test: Check if stationsRepository extends AbstractRepository
  test("stationsRepository extends AbstractRepository", async () => {
    expect(Object.getPrototypeOf(stationsRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.stations is an instance of stationsRepository
  test("tables.stations = new stationsRepository", async () => {
    // Assertions
    expect(tables.stations instanceof stationsRepository).toBe(true);
  });

  // Test: Check to find all stations
  test("readAll => select", async () => {
    // Mock result of the database query
    const result = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Call the readAll method of the stations repository
    const returned = await tables.stations.readAll();

    // Assertions
    expect(database.query).toHaveBeenCalledWith("select * from stations");
    expect(returned).toStrictEqual(result);
  });

  // Test: Check if read method selects data from the 'stations' table based on id
  test("read => select with id", async () => {
    // Mock rows returned from the database
    const rows = [
      {
        id: undefined,
        title: undefined,
        stations_id: undefined,
      },
    ];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the read method of the stations repository
    const returned = await tables.stations.read(0);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "select * from stations where id = ?",
      [0]
    );
    expect(returned).toStrictEqual(rows[0]);
  });
});
