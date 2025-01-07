const express = require("express");
require("dotenv").config();
const app = express();
const bookRoutes = require("./Routes/bookRoutes");

app.use(express.json());

app.use("/api/books", bookRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
