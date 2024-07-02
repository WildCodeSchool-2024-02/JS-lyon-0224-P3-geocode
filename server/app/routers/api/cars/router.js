const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  add,
  edit,
  read,
  drop,
} = require("../../../controllers/CarActions");

// Route to get a list of items
router.get("/", browse);

router.get("/:id", read);

router.post("/", add);

router.put("/:id", edit);

router.delete("/:id", drop);
/* ************************************************************************* */

module.exports = router;
