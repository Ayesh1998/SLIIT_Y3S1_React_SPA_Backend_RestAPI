const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const HttpError = require("./models/http-errors");

const userRoutes = require("./routes/user-routes");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", userRoutes);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

app.listen(5000);
