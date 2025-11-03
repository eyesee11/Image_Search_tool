import React from "react";

function SearchHistory({ history }) {
  if (!history || history.length === 0) {
    return null;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="history-section">
      <h3>📜 Your Search History</h3>
      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <span className="history-term">{item.term}</span>
            <span className="history-time">{formatDate(item.timestamp)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;
