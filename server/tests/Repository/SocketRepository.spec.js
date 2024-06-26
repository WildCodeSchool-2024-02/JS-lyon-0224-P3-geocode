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

  // Test: Check to find sockets
  test("readAll => select", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the readAll method of the socket repository
    const returned = await tables.socket.readAll();

    // Assertions
    expect(database.query).toHaveBeenCalledWith("select * from socket");
    expect(returned).toStrictEqual(rows);
  });

  // Test: Check if read method selects data from the 'socket' table based on id
  test("read => select with id", async () => {
    // Mock rows returned from the database
    const rows = [
      {
        id: undefined,
        type: undefined,
        socketTypes: [
          {
            type: undefined,
          },
        ],
      },
    ];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the read method of the socket repository
    const returned = await tables.socket.read(0);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "select * from socket where id = ?",
      [0]
    );
    expect(returned).toStrictEqual(rows[0]);
  });
});
