const { LogError } = require("concurrently");
const express = require("express");
const router = express.Router();
const knex = require("../database");
/* Returns all reviews */
router.get("/", async (req, res) => {
  try {
    const allReviews = await knex("review").select("*");
    allReviews
      ? res.json(allReviews)
      : res.status(404).send(`id:${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});
/* Returns all reviews for a specific meal. */
router.get("/meals/:meal_id", async (req, res) => {
  try {
    const mealByReview = await knex("review")
      .select("*")
      .join("meal", "review.meal_id", "=", "meal.id")
      .where({ meal_id: req.params.meal_id });
    mealByReview.length !== 0
      ? res.json(mealByReview)
      : res.status(404).send(`meal id:${req.params.meal_id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});
/* Adds a new review to the database */
router.post("/", async (req, res) => {
  try {
    const addReview = await knex("review").insert(req.body);
    addReview
      ? res.json("add review successfully")
      : res.status(404).send("can add this data");
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});
/* Returns a review by id*/
router.get("/:id", async (req, res) => {
  try {
    const queryReviewById = await knex("review")
      .select("*")
      .where({ id: req.params.id });
    queryReviewById.length !== 0
      ? res.json(queryReviewById)
      : res.status(404).send(`id:${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});

/* Updates the review by id */
router.put("/:id", async (req, res) => {
  try {
    const updateReviewById = await knex("review")
      .where({ id: req.params.id })
      .update(req.body);
    updateReviewById
      ? res.json(`update review id=${req.params.id}`)
      : res.status(404).send(`id:${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});

/* Deletes the review by id*/
router.delete("/:id", async (req, res) => {
  try {
    const deleteReviewById = await knex("review")
      .where({ id: req.params.id })
      .del();

    deleteReviewById
      ? res.json(`delete review id=${req.params.id}`)
      : res.status(404).send(`id:${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});
module.exports = router;
