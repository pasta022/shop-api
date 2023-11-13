const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paystackRoute = require("./routes/paystack");

dotenv.config();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongo db running");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(express.json());

// api routes
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
app.use("/payments", paystackRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("app running");
});
