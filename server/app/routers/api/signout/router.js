const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { signout } = require("../../../controllers/AuthActions");

router.post("/", signout);


/* ************************************************************************* */

module.exports = router;
