const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const bookRoutes = require("./Routes/bookRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/books", bookRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on PORT " + process.env.PORT);
});
