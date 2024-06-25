const express = require("express");

const router = express.Router();

// Import item-related actions
const { add } = require("../../../controllers/UsermessageActions");
// Route to get a list of items
router.post("/add", add);

module.exports = router;
/* ************************************************************************* */