import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/auth/user");
      setUser(response.data.user);
    } catch (err) {
      console.log("Not authenticated");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading</h2>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage user={user} onLogout={handleLogout} />}
        />
        <Route
          path="/history"
          element={<HistoryPage user={user} onLogout={handleLogout} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
