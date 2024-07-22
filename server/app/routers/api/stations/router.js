const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  rent,
  checkRent,
} = require("../../../controllers/StationActions");

const { verifyCookie } = require("../../../services/auth");

// Route to get a list of items
router.get("/", browse);

router.post("/rent", verifyCookie, rent);

router.get("/rent", checkRent);

/* ************************************************************************* */

module.exports = router;
