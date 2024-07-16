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
  getCarByUserId,
} = require("../../../controllers/CarActions");

const { verifyCookie } = require("../../../services/auth");
const carValidateEdit = require("../../../services/carvalidateEdit");
const verfiyCarAdd = require("../../../services/carValidateAdd");

// Route to get a list of items
router.get("/", verifyCookie, browse);

router.get("/:id", verifyCookie, read);

router.post("/", verfiyCarAdd, add);

router.put("/:id", verifyCookie, carValidateEdit, edit);

router.delete("/:id", verifyCookie, drop);

router.get("/byUser/:user_id", getCarByUserId);

/* ************************************************************************* */

module.exports = router;
