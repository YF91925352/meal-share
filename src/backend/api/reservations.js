const { LogError } = require("concurrently");
const express = require("express");
const router = express.Router();
const knex = require("../database");
/* Returns all reservations */
router.get("/", async (req, res) => {
  try {
    const allReservations = await knex("reservation").select("*");
    allReservations
      ? res.json(allReservations)
      : res.status(404).send(`id:${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});
/* Adds a new reservation to the database */
router.post("/", async (req, res) => {
  try {
    const addReservation = await knex("reservation").insert(req.body);
    addReservation
      ? res.json("add reservation successfully")
      : res.status(404).send("can add this data");
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});
/* Returns a reservation by id*/
router.get("/:id", async (req, res) => {
  try {
    const queryReservationById = await knex("reservation")
      .select("*")
      .where({ id: req.params.id });
    queryReservationById.length !== 0
      ? res.json(queryReservationById)
      : res.status(404).send(`id:${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});

/* Updates the reservation by id */
router.put("/:id", async (req, res) => {
  try {
    const updateReservationById = await knex("reservation")
      .where({ id: req.params.id })
      .update(req.body);
    updateReservationById
      ? res.json(`update reservation id=${req.params.id}`)
      : res.status(404).send(`id:${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});

/* Deletes the reservation by id*/
router.delete("/:id", async (req, res) => {
  try {
    const deleteReservationById = await knex("reservation")
      .where({ id: req.params.id })
      .del();

    deleteReservationById
      ? res.json(`delete reservation id=${req.params.id}`)
      : res.status(404).send(`id:${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});
module.exports = router;
