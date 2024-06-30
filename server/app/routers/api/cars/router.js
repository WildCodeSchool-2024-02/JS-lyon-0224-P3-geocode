const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, add, edit } = require("../../../controllers/CarActions");

// Route to get a list of items
router.get("/", browse);

router.post("/", add);

router.put("/:id", edit);

/* ************************************************************************* */

module.exports = router;
