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

const { verifyCookie } = require("../../../services/auth");

// Route to get a list of items
router.get("/", verifyCookie, browse);

router.get("/:id", verifyCookie, read);

router.post("/", add);

router.put("/:id", verifyCookie, edit);

router.delete("/:id", verifyCookie, drop);
/* ************************************************************************* */

module.exports = router;
