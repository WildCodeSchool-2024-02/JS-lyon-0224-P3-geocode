const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { 
    browse,
    add,
} = require("../../../controllers/userActions");

// Route to get a list of items
router.get("/", browse);
// Route to add a new user
router.post("/add", add);
/* ************************************************************************* */

module.exports = router;
