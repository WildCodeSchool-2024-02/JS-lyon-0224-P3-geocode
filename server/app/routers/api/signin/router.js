const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { signin } = require("../../../controllers/AuthActions");

const validateSignIn = require("../../../services/validateSignIn")

router.post("/", validateSignIn, signin);


/* ************************************************************************* */

module.exports = router;
