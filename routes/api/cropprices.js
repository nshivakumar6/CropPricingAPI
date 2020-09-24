const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Pricing = require("../../models/Pricing");
const { post } = require("./users");

// @route      POST api/cropprices
// @desc       Post / Update a Crop Price
// @access     Public
router.post(
  "/",
  [
    check("code", "code required").exists(),
    check("unit", "Unit required").exists(),
    check("weight", "Weight required").exists(),
    check("price", "Price required").exists(),
    check("variety", "Variety required").exists(),
    check("market", "Market required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      code,
      unit,
      weight,
      price,
      variety,
      market,
      average,
      max,
      min,
      stdev,
    } = req.body;

    try {
      let pricingListing = await Pricing.findOne({ code });
      if (pricingListing) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Listing already exists " }] });
      }

      pricing = new Pricing({
        code,
        unit,
        weight,
        price,
        variety,
        market,
      });

      if (average) pricing.average = average;
      if (max) pricing.max = max;
      if (min) pricing.min = min;
      if (stdev) pricing.stdev = stdev;

      await pricing.save();

      const payload = {
        pricing: {
          id: pricing.id,
        },
      };

      res.json(pricing);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route       GET /api/cropprices/listing/:code
// @desc        Get Crop Pricing Listing by Code
// @access      Public
router.get("/listing/:code", async (req, res) => {
  try {
    const listing = await Pricing.findOne({ code: req.params.code });

    if (!listing) {
      return res.status(400).json({ msg: "Listing not found" });
    }

    res.json(listing);
  } catch (err) {
    console.error(err.message);
    if (err.name == "CastError") {
      return res.status(400).json({ msg: "Listing not foundd" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       DELETE /api/cropprices/listing/:code
// @desc        Delete Crop Pricing Listing by Code
// @access      Public -- CHANGE TO PRIVATE AFTER CREATING ADMIN AUTH
router.delete("/listing/:code", async (req, res) => {
  try {
    const listing = await Pricing.findOne({ code: req.params.code });
    if (!listing) {
      return res.status(404).json({ msg: "Price Listing Not Found" });
    }
    await listing.remove();
    res.json({ msg: "Listing Removed" });
  } catch (err) {
    console.error(err.message);
    if (err.name === "CastError") {
      return res.status(400).json({ msg: "Listing Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
