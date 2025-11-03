import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

function HistoryPage({ user, onLogout }) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  const fetchSearchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/history");
      setSearchHistory(response.data.history);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch search history");
      console.error("Failed to fetch search history:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="app">
      <Header user={user} onLogout={onLogout} />

      <div className="container">
        <div className="history-page">
          <div className="history-page-header">
            <h1>SEARCH HISTORY</h1>
            <p className="history-page-subtitle">
              Your complete search history timeline
            </p>
          </div>

          {loading && (
            <div className="loading">
              <h2>Loading</h2>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          {!loading && !error && searchHistory.length === 0 && (
            <div className="empty-state">
              <h3>No Search History Yet</h3>
              <p>Start searching for images to build your history!</p>
              <a href="/" className="back-home-btn">
                GO TO SEARCH
              </a>
            </div>
          )}

          {!loading && !error && searchHistory.length > 0 && (
            <div className="history-page-content">
              <div className="history-stats">
                <div className="stat-card">
                  <span className="stat-number">{searchHistory.length}</span>
                  <span className="stat-label">Total Searches</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">
                    {new Set(searchHistory.map((h) => h.term)).size}
                  </span>
                  <span className="stat-label">Unique Terms</span>
                </div>
              </div>

              <div className="history-timeline">
                {searchHistory.map((item, index) => (
                  <div key={index} className="history-timeline-item">
                    <div className="timeline-marker">{index + 1}</div>
                    <div className="timeline-content">
                      <div className="timeline-term">{item.term}</div>
                      <div className="timeline-time">
                        {formatDate(item.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
