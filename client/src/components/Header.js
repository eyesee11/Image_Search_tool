import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ user, onLogout }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <h1>🔍 Image Search</h1>

        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            SEARCH
          </Link>
          <Link
            to="/history"
            className={`nav-link ${
              location.pathname === "/history" ? "active" : ""
            }`}
          >
            HISTORY
          </Link>
        </nav>

        <div className="user-info">
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.displayName}
              className="user-avatar"
            />
          )}
          <span className="user-name">{user.displayName}</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
