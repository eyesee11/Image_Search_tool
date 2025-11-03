import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import TopSearchesBanner from "../components/TopSearchesBanner";
import SearchBar from "../components/SearchBar";
import ImageGrid from "../components/ImageGrid";

function HomePage({ user, onLogout }) {
  const [searchResults, setSearchResults] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [topSearches, setTopSearches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopSearches();
  }, []);

  const fetchTopSearches = async () => {
    try {
      const response = await axios.get("/api/top-searches");
      setTopSearches(response.data.topSearches);
    } catch (err) {
      console.error("Failed to fetch top searches:", err);
    }
  };

  const handleSearch = async (term) => {
    try {
      setError(null);
      const response = await axios.post("/api/search", { term });
      setSearchResults(response.data);
      setSelectedImages([]);
      fetchTopSearches();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to search images");
      console.error("Search error:", err);
    }
  };

  const toggleImageSelection = (imageId) => {
    setSelectedImages((prev) => {
      if (prev.includes(imageId)) {
        return prev.filter((id) => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  return (
    <div className="app">
      <Header user={user} onLogout={onLogout} />

      <div className="container">
        <TopSearchesBanner topSearches={topSearches} />

        <SearchBar onSearch={handleSearch} />

        {error && <div className="error-message">{error}</div>}

        {searchResults && (
          <ImageGrid
            searchResults={searchResults}
            selectedImages={selectedImages}
            onToggleSelection={toggleImageSelection}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
