import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Login.css";

const VerifyAccount = () => {
  const [userCode, setUserCode] = useState("");
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();

    const storedCode = localStorage.getItem("verificationCode");

    if (userCode === storedCode) {
      alert("Uspešno ste verifikovani!");

      const userData = JSON.parse(localStorage.getItem("userData"));

      try {
        await axios.post("https://localhost:7168/api/User/register", userData);

        localStorage.removeItem("verificationCode");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userData");

        navigate("/login");
        const userRole = localStorage.getItem("userRole");

        if (userRole === "BungalowOwner") {
          navigate("/create_advertisement");
        } else if (userRole === "User") {
          navigate("/user_home");
        } else {
          navigate("/");
        }
      } catch (e) {
        console.error(" Greška pri registraciji nakon verifikacije:", e);
      }
    } else {
      alert("Kod nije ispravan, pokušajte ponovo.");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-page">
        <div className="auth-page-div">
          <form onSubmit={handleVerification}>
            <h3>Verifikujte svoj nalog</h3>
            <div className="auth-page-input">
              <input
                type="text"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                placeholder="Unesite verifikacioni kod"
                required
              />
            </div>
            <div className="auth-page-button">
              <button type="submit">Verifikuj</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
