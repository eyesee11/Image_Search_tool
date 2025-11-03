import React from "react";

function ImageGrid({ searchResults, selectedImages, onToggleSelection }) {
  if (!searchResults) {
    return null;
  }

  if (searchResults.images.length === 0) {
    return (
      <div className="search-results">
        <div className="empty-state">
          <h3>No results found</h3>
          <p>Try searching with different keywords</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="results-header">
        <div className="results-info">
          You searched for "<strong>{searchResults.term}</strong>" -{" "}
          {searchResults.count} results
        </div>
        <div className="selected-counter">
          Selected: {selectedImages.length}{" "}
          {selectedImages.length === 1 ? "image" : "images"}
        </div>
      </div>

      <div className="image-grid">
        {searchResults.images.map((image) => (
          <div
            key={image.id}
            className={`image-card ${
              selectedImages.includes(image.id) ? "selected" : ""
            }`}
            onClick={() => onToggleSelection(image.id)}
          >
            <img
              src={image.thumb}
              alt={image.description || "Image"}
              loading="lazy"
            />
            <div className="image-overlay">
              <input
                type="checkbox"
                className="image-checkbox"
                checked={selectedImages.includes(image.id)}
                readOnly
              />
            </div>
            <div className="image-credit">
              <span>Photo by </span>
              <a
                href={`${image.photographerUrl}?utm_source=image-search-app&utm_medium=referral`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {image.photographer}
              </a>
              <span> on </span>
              <a
                href="https://unsplash.com?utm_source=image-search-app&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Unsplash
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;
