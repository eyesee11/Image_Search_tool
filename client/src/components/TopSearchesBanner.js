import React from "react";

function TopSearchesBanner({ topSearches }) {
  if (!topSearches || topSearches.length === 0) {
    return null;
  }

  return (
    <div className="top-searches-banner">
      <h3>🔥 Top Searches Across All Users</h3>
      <div className="top-searches-list">
        {topSearches.map((search, index) => (
          <div key={index} className="top-search-tag">
            <span>{search.term}</span>
            <span className="search-count">{search.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSearchesBanner;
