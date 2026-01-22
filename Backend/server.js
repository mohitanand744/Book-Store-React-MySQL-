const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const bookRoutes = require("./Routes/bookRoutes");
const authRoutes = require("./Routes/authRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const cookieParser = require("cookie-parser");
const wishlistRouters = require("./Routes/wishlistRoutes");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use(`/api/${process.env.API_VERSION}/books`, bookRoutes);
app.use(`/api/${process.env.API_VERSION}/auth`, authRoutes);
app.use(`/api/${process.env.API_VERSION}/orders`, orderRoutes);
app.use(`/api/${process.env.API_VERSION}/wishlist`, wishlistRouters);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    "🚀 Server is running on PORT " +
      process.env.PORT +
      " | API Version: " +
      process.env.API_VERSION,
  );
});
