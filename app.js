const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const HttpError = require("./models/http-errors");
const userRoutes = require("./routes/user-routes");
const adminRoutes = require("./routes/admin-routes");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

mongoose
  .connect(
    "mongodb+srv://ayesh:ayesh@ayesh-mongo-cluster-jqsxb.mongodb.net/sliit-y3s1-reactapp?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(error => {
    console.log(error);
  });
