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
} = require("../../../controllers/UserActions");
const validateEdit = require("../../../services/validateEdit");
const validateAdd = require("../../../services/validateAdd");
const { hashPassword } = require("../../../services/auth");

const { verifyCookie } = require("../../../services/auth");

const { signout } = require("../../../controllers/AuthActions");
// Route to get a list of items
router.get("/", verifyCookie, browse);

router.post("/signout", signout);

router.get("/:id", verifyCookie, read);

router.put("/:id", verifyCookie, validateEdit, edit);

router.post("/", hashPassword, validateAdd, add);

router.delete("/:id", verifyCookie, drop);

/* ************************************************************************* */

module.exports = router;
