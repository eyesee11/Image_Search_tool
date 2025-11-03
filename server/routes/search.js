const express = require("express");
const axios = require("axios");
const { isAuthenticated } = require("../middleware/auth");
const Search = require("../models/Search");
const router = express.Router();

router.post("/search", isAuthenticated, async (req, res) => {
  try {
    const { term } = req.body;

    if (!term || term.trim() === "") {
      return res.status(400).json({ error: "Search term is required" });
    }

    const search = await Search.create({
      userId: req.user._id,
      term: term.trim(),
      timestamp: new Date(),
    });

    const unsplashResponse = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: term,
          per_page: 30,
          orientation: "landscape",
        },
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const images = unsplashResponse.data.results.map((photo) => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      description: photo.description || photo.alt_description,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
    }));

    res.json({
      term: term.trim(),
      count: images.length,
      images: images,
    });
  } catch (error) {
    console.error("Search error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      return res.status(401).json({ error: "Invalid Unsplash API key" });
    }

    res.status(500).json({ error: "Failed to search images" });
  }
});

module.exports = router;
