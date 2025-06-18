const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const corsConfig = require("./middleware/corsConfig");
const { connectDB } = require("./config/dbConfig");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");

require("./models/AssociationsRelationship");

const PORT = process.env.PORT || 3030;
const app = express();
dotenv.config();

// MIDDLEWARE
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));

// CONNECT DB
connectDB();

// ROUTE
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/order", orderRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);

app.listen(PORT, () => {
  console.log("backend server is running");
});
