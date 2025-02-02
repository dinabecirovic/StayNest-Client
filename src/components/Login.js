import React, { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { MyContext } from "../context/my-context";
import { useNavigate } from "react-router-dom";
import "../components/Navbar.js";
import "./styles/Login.css";

const Login = ({ closeLoginPanel }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameMessage, setUsernameMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [visible, setVisible] = useState(true);
  const { setUserFunction } = useContext(MyContext);
  const navigate = useNavigate();

  const loginUserHandler = async (e) => {
    e.preventDefault();

    setUsernameMessage(null);
    setPasswordMessage(null);

    if (username.trim().length === 0) {
      setUsernameMessage("Molim vas unesite korisničko ime!");
      return;
    }
    if (password.trim().length === 0) {
      setPasswordMessage("Molim vas unesite lozinku!");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7168/api/User/login",
        {
          username,
          password,
        }
      );

      const responseData = response.data;

      // Spremi token u localStorage
      localStorage.setItem("jwtToken", responseData.token);
      localStorage.setItem("user", JSON.stringify(responseData));

      // Postavi Authorization header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${responseData.token}`;

      setUserFunction(responseData);

      // Reset inputs
      setUsername("");
      setPassword("");

      if (responseData.role === "Administrator") {
        navigate("/administrator_dashboard");
      } else if (responseData.role === "BungalowOwner") {
        navigate("/advertisements_list");
      } else if (responseData.role === "User") {
        navigate("/user");
      } else {
        alert("Nepoznata uloga korisnika.");
      }

      // Zatvori login panel
      closeLoginPanel();
    } catch (error) {
      console.error("Login error:", error);
      alert(
        "Došlo je do greške prilikom prijave. Proverite korisničko ime i lozinku."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page-div">
        <form>
          <div className="auth-page-input">
            <input
              type="text"
              placeholder="Korisničko ime"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            {usernameMessage && (
              <p className="input-alert">{usernameMessage}</p>
            )}
          </div>
          <div className="auth-page-input">
            <input
              type={visible ? "password" : "text"}
              placeholder="Lozinka"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span
              className="password-toggle"
              onClick={() => setVisible((prev) => !prev)}
            >
              {visible ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
            {passwordMessage && (
              <p className="input-alert">{passwordMessage}</p>
            )}
          </div>
          <div className="auth-page-button">
            <button onClick={loginUserHandler}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
