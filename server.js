const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const app = express();

connectDB(); // from config/db
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Works!"));

app.use("/api/cropprices", require("./routes/api/cropprices"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
