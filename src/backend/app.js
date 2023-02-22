const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");
const buildPath = path.join(__dirname, "../../dist");

const cors = require("cors");
const knex = require("./database");
// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
router.use("/reservations", reservationsRouter);
// test
app.get("/", (req, res) => {
  res.send("hello");
});
// Respond with all meals in the future (relative to the when datetime)
app.get("/future-meals", async (req, res) => {
  const [rows] = await knex.raw("SELECT * FROM meal WHERE `when`>DATE(NOW());");
  rows.length !== 0
    ? res.json(rows)
    : res.status(200).send("there are no meals in the future");
});
//Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async (req, res) => {
  const [rows] = await knex.raw(
    "SELECT * FROM meal WHERE `when`< DATE(NOW());"
  );
  rows.length !== 0
    ? res.json(rows)
    : res.status(200).send("there are no meals in the past");
});
// Respond with all meals sorted by ID
app.get("/all-meals", async (req, res) => {
  const [rows] = await knex.raw("SELECT * FROM meal ORDER BY id;");
  rows.length !== 0
    ? res.json(rows)
    : res.status(200).send("there are no meals");
});
// Respond with the first meal (meaning with the minimum id)
app.get("/first-meal", async (req, res) => {
  const [rows] = await knex.raw("SELECT * FROM meal LIMIT 1;");
  rows.length !== 0
    ? res.json(rows)
    : res.status(404).send("there doesn't exist first meal");
});
// Respond with the last meal (meaning with the maximum id)
app.get("/last-meal", async (req, res) => {
  const [rows] = await knex.raw("SELECT * FROM meal ORDER BY id DESC LIMIT 1;");
  rows.length !== 0
    ? res.json(rows)
    : res.status(404).send("there doesn't exist last meal");
});
if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
