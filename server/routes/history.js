const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const Search = require("../models/Search");
const router = express.Router();

router.get("/history", isAuthenticated, async (req, res) => {
  try {
    const searches = await Search.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(20)
      .select("term timestamp");

    res.json({
      history: searches.map((search) => ({
        term: search.term,
        timestamp: search.timestamp,
      })),
    });
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ error: "Failed to fetch search history" });
  }
});

module.exports = router;
