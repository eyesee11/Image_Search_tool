const express = require("express");
const Search = require("../models/Search");
const router = express.Router();

router.get("/top-searches", async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: "$term",
          count: { $sum: 1 },
          lastSearched: { $max: "$timestamp" },
        },
      },
      {
        $sort: { count: -1, lastSearched: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          term: "$_id",
          count: 1,
        },
      },
    ]);

    res.json({
      topSearches: topSearches,
    });
  } catch (error) {
    console.error("Top searches error:", error);
    res.status(500).json({ error: "Failed to fetch top searches" });
  }
});

module.exports = router;
