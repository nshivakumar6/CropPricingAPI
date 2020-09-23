const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");

// Importing User Model Schema
const User = require("../../models/User");

// @route       POST /api/users
// @desc        User Route
// @access      Public
router.post(
  "/",
  [
    check("name").not().isEmpty().withMessage("Name is required."),
    check("email").isEmail().withMessage("Please include a valid email."),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Please enter a password with 6 or more characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Retrieve Data from Req
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password, //unencrypted at this point, but fear not
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Experienced Error!");
    }
  }
);

module.exports = router;
