const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRouter = require("./users/router");

router.use("/users", usersRouter);

const carsRouter = require("./cars/router");

router.use("/cars", carsRouter);

/* ************************************************************************* */

module.exports = router;
