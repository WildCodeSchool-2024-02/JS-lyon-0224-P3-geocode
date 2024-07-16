const express = require("express");

const router = express.Router();

const {browseAsAdmin} = require("../../../controllers/AdminAction");


router.get("/",browseAsAdmin)


module.exports = router;
