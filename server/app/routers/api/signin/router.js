const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { signin } = require("../../../controllers/authActions");


router.post("/", signin);

/* ************************************************************************* */

module.exports = router;
