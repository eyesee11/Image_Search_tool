import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      return;
    }

    setIsSearching(true);
    try {
      await onSearch(searchTerm.trim());
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for images (e.g., nature, technology, food)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isSearching}
        />
        <button
          type="submit"
          className="search-btn"
          disabled={isSearching || searchTerm.trim() === ""}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
