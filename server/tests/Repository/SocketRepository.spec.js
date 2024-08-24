// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const SocketRepository = require("../../database/models/SocketRepository");

// Test suite for SocketRepository
describe("SocketRepository", () => {
  // Test: Check if SocketRepository extends AbstractRepository
  test("SocketRepository extends AbstractRepository", async () => {
    expect(Object.getPrototypeOf(SocketRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.socket is an instance of SocketRepository
  test("tables.socket = new SocketRepository", async () => {
    // Assertions
    expect(tables.socket instanceof SocketRepository).toBe(true);
  });

  // Test: Check if create method inserts data into the 'socket' table
  test("create => insert into", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);
  });
});
