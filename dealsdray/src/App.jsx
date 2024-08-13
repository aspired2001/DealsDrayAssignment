// App.jsx

import React, { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard";
import LoginForm from "./Components/LoginForm";
import "tailwindcss/tailwind.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in from local storage
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(isLoggedIn);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <div className="h-screen flex flex-col">
      {loggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
