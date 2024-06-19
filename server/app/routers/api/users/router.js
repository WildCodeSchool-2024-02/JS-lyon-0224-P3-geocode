const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  readWithCars,
  add,
} = require("../../../controllers/userActions");

// Route to get a list of items
router.get("/", browse);

router.get("/:id", read);

router.get("/:id/cars", readWithCars); // New route to get user with cars

router.post("/", add);


/* ************************************************************************* */

module.exports = router;
