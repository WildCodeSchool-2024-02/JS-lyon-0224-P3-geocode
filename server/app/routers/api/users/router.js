const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, read, add, edit } = require("../../../controllers/userActions");

// Route to get a list of items
router.get("/", browse);

router.get("/:id", read);

router.put("/:id", edit);

router.post("/add", add);

/* ************************************************************************* */

module.exports = router;
