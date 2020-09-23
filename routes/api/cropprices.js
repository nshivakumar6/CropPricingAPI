const express = require("express");
const router = express.Router();

/*
@route      GET api/cropprices
@desc       Get all crop prices
@access     Public
*/
router.get("/", (req, res) => res.send("Crop Prices route"));

module.exports = router;
