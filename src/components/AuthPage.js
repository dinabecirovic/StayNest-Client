// src/pages/AuthPage.js
import React, { useState } from "react";
import Login from "../components/Login";
import Registration from "../components/Registration";
import "./styles/Login.css"; // Možeš zadržati Login.css ako koristiš iste stilove

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-page-container">
      <div className="auth-toggle">
        <h2
          className={activeTab === "login" ? "active" : ""}
          onClick={() => setActiveTab("login")}
        >
          PRIJAVITE SE
        </h2>
        <h2
          className={activeTab === "register" ? "active" : ""}
          onClick={() => setActiveTab("register")}
        >
          REGISTRUJTE SE
        </h2>
      </div>

      <div className="auth-form-wrapper">
        {activeTab === "login" ? <Login /> : <Registration />}
      </div>
    </div>
  );
};

export default AuthPage;
