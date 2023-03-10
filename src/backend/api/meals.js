const { LogError } = require("concurrently");
const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (req, res) => {
  const {
    maxPrice,
    availableReservations,
    title,
    dateAfter,
    dateBefore,
    limit,
    sortKey,
    sortDir,
  } = req.query;
  let filteredMeals = knex("meal");
  try {
    if (maxPrice) filteredMeals = filteredMeals.where("price", "<=", maxPrice);

    if (title)
      filteredMeals = filteredMeals.where("title", "like", `%${title}`);

    if (dateAfter) filteredMeals = filteredMeals.where("when", ">", dateAfter);

    if (dateBefore)
      filteredMeals = filteredMeals.where("when", "<", dateBefore);

    if (limit) filteredMeals = filteredMeals.limit(limit);

    if (
      sortKey === "when" ||
      sortKey === "max_reservations" ||
      sortKey === "price"
    ) {
      if (sortDir === "asc" || sortDir === "desc") {
        filteredMeals = filteredMeals.orderBy(sortKey, sortDir);
      } else {
        filteredMeals = filteredMeals.orderBy(sortKey);
      }
    }
    filteredMeals = await filteredMeals;
    res.json(filteredMeals);
  } catch (error) {
    res.status(500);
    throw error.message;
  }
});

module.exports = router;
