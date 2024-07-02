const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  edit,
  add,
  drop,
} = require("../../../controllers/userActions");
const validateEdit = require("../../../services/validateEdit");
const validateAdd = require("../../../services/validateAdd");
const { hashPassword } = require("../../../services/auth");

// Route to get a list of items
router.get("/", browse);

router.get("/:id", read);

router.put("/:id", validateEdit, edit);

router.post("/", hashPassword, validateAdd, add);

router.delete("/:id", drop);

/* ************************************************************************* */

module.exports = router;
