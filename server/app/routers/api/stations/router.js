const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, rent } = require("../../../controllers/StationActions");

const { verifyCookie } = require("../../../services/auth");

// Route to get a list of items
router.get("/", browse);

router.post("/rent", verifyCookie, rent);

/* ************************************************************************* */

module.exports = router;
