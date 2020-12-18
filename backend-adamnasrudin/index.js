require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./src/models");
const createMovies = require("./src/createDB/createMovies");

const app = express();
const moviesRoute = require("./src/routes/movies");

//body parser req json type
app.use(bodyParser.json());

//drop and create tabel, create movies
database.sequelize.sync({ force: true }).then(async () => {
  await createMovies();
  console.log("Drop and re-sync db successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//Access CROS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Handle Error
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

app.use("/api/v1", moviesRoute);

//Handle error page not found
app.use(function (req, res, next) {
  res.status(404).json({
    status: "Not Found",
    message: "Unable to find the requested resource!",
  });
});
