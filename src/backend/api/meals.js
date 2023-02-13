const { LogError } = require("concurrently");
const express = require("express");
const router = express.Router();
const knex = require("../database");

/* 	Returns all meals */
router.get("/", async (req, res) => {
  try {
    const allMeals = await knex("meal").select("*");

    allMeals
      ? res.json(allMeals)
      : res.status(404).send(`id:${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});

/* Adds a new meal to the database */
router.post("/", async (req, res) => {
  try {
    const addMeal = await knex("meal").insert(req.body);
    addMeal
      ? res.json("add meal successfully")
      : res.status(404).send("can add this data");
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});
/* Returns the meal by id */
router.get("/:id", async (req, res) => {
  try {
    const queryMealById = await knex("meal")
      .select("*")
      .where({ id: req.params.id });
    queryMealById.length !== 0
      ? res.json(queryMealById)
      : res.status(404).send(`id:${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});

/* Updates the meal by id */
router.put("/:id", async (req, res) => {
  try {
    const updateMealById = await knex("meal")
      .where({ id: req.params.id })
      .update(req.body);
    updateMealById
      ? res.json(`update meal id=${req.params.id}`)
      : res.status(404).send(`id:${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});

/* Deletes the meal by id */
router.delete("/:id", async (req, res) => {
  try {
    const deleteMealById = await knex("meal")
      .where({ id: req.params.id })
      .del();
    console.log(deleteMealById);
    deleteMealById
      ? res.json(`delete meal id=${req.params.id}`)
      : res.status(404).send(`id:${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});
module.exports = router;
