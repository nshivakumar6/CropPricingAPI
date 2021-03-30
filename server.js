const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
const dbPool = require('./config/db');
const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("You've reached the Crop Pricing API!"));
app.use("/api/cropprices", require("./routes/api/cropprices"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));