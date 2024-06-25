const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRouter = require("./users/router");

router.use("/users", usersRouter);

const carsRouter = require("./cars/router");

router.use("/cars", carsRouter);

const stationsRouter = require("./stations/router");

router.use("/stations", stationsRouter);

const socketRouter = require("./socket/router");

router.use("/socket", socketRouter);

const ContactRouter = require("./Contact/router");

router.use("/contact", ContactRouter);

/* ************************************************************************* */

module.exports = router;
