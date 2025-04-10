const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const users = require("./routes/user");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const product = require("./routes/product");
const favorite = require("./routes/favorite");
const cart = require("./routes/cart");
const order = require("./routes/order");
require("dotenv").config();

const app = express();
const port = process.env.port || 3000;
const api = "/api";

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(api, users);
app.use(api, product);
app.use(api, favorite);
app.use(api, cart);
app.use(api, order);

(async () => {
  try {
    await connect(process.env.db);
    console.log("DB Connection is Done");
  } catch (err) {
    console.log("DB Connection is Failed");
  }
})();

app.get("/get-users", async (req, res) => {
  try {
    res.status(200).send("Hello, World!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.get("/", async (req, res) => {
  try {
    res.status(200).send("Hello, World!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`http://localhost:${port}`));
