const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express(); //Making an application

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./router/auth");
const requestRouter = require("./router/request");
const profileRouter = require("./router/profile");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter)

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("Server is successfully on 7777....");
    });
  })
  .catch((err) => {
    console.log("Not connected..");
  });
