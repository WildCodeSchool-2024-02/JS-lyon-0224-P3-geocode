const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, rent } = require("../../../controllers/StationActions");

// Route to get a list of items
router.get("/", browse);

router.post("/rent", rent);

/* ************************************************************************* */

module.exports = router;
