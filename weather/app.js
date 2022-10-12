require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(logger("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
const OWM_API_KEY = process.env.OWM_API_KEY || "invalid_key";
const UNITS = process.env.UNITS || "metric";
app.get("/", (req, res) => {
  res.send(`<h1>It Works</h1>`);
});
app.get("/weather", async (req, res) => {
  try {
    const cityName = req.query.city || "";
    if (cityName) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${UNITS}&appid=${OWM_API_KEY}`;
      const { data } = await axios.get(url);
      res.render("weather/index", {
        city: cityName,
        data,
        symbol: UNITS === "metric" ? "°C" : UNITS === "imperial" ? "°F" : "",
      });
    } else {
      res.render("weather/index", {
        city: "",
        data: null,
        symbol: "",
      });
    }
  } catch (error) {
    res.send(`<h1>Internal server Error</h1>`);
  }
});
app.get("/api/users", (req, res) => {
  try {
    db.query(`SELECT * FROM users`, (err, result) => {
      if (err) {
        throw Error;
      }
      res.json(result.rows);
    });
  } catch (error) {
    res.json(error);
  }
});

APP_PORT = process.env.PORT || 8080;
app.listen(APP_PORT, () => {
  console.log(`Service running at port ${APP_PORT}`);
});
