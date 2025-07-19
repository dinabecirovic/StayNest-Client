import React, { useContext, useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { MyContext } from "../context/my-context";
import { useNavigate } from "react-router-dom";
import "../components/Navbar.js";

const Registration = () => {
  const [roles, setRoles] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameMessage, setFirstNameMessage] = useState(null);
  const [lastName, setLastName] = useState("");
  const [lastNameMessage, setLastNameMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [birthDateMessage, setBirthDateMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(null);
  const { setUserFunction } = useContext(MyContext);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7168/api/User/valid-roles"
        );
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  const sendVerificationEmail = async (email) => {
    // Generisanje verifikacionog koda
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Čuvanje koda u localStorage da bi se kasnije koristio u verifikaciji
    localStorage.setItem("verificationCode", verificationCode);

    try {
      await emailjs.send(
        "service_wnhlntl", // PROVERI Service ID
        "template_mebrk6i", // PROVERI Template ID
        {
          email,
          message: `Poštovani,
  
          Drago nam je što ste se registrovali na našu aplikaciju! 
          Vaš verifikacioni kod je: ${verificationCode}
          Molimo vas da unesete ovaj kod kako biste završili proces registracije.
          Ukoliko niste zahtevali registraciju, slobodno zanemarite ovaj email.
          
          Srdačan pozdrav,
          StayNest tim.`,
        },
        "O-jZAcUmxmcGs6ghV" // PROVERI Public Key
      );

      console.log("Verifikacioni email uspešno poslat!");
    } catch (error) {
      console.error("Greška prilikom slanja emaila:", error);
    }
  };

  // VALIDACIJA: IME I PREZIME (MORA POČETI VELIKIM SLOVOM)
  useEffect(() => {
    if (firstName && !/^[A-ZČĆŠĐŽ][a-zčćšđž]+$/.test(firstName)) {
      setFirstNameMessage("Ime mora početi velikim slovom.");
    } else {
      setFirstNameMessage(null);
    }
  }, [firstName]);

  useEffect(() => {
    if (lastName && !/^[A-ZČĆŠĐŽ][a-zčćšđž]+$/.test(lastName)) {
      setLastNameMessage("Prezime mora početi velikim slovom.");
    } else {
      setLastNameMessage(null);
    }
  }, [lastName]);

  // VALIDACIJA: DATUM ROĐENJA (18+ GODINA)
  useEffect(() => {
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      const age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      const dayDiff = today.getDate() - birth.getDate();

      if (
        age < 18 ||
        (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
      ) {
        setBirthDateMessage("Morate imati najmanje 18 godina.");
      } else {
        setBirthDateMessage(null);
      }
    }
  }, [birthDate]);

  // VALIDACIJA: KORISNIČKO IME (SAMO MALA SLOVA)
  useEffect(() => {
    if (username && !/^[a-z0-9]+$/.test(username)) {
      setUsernameMessage(
        "Korisničko ime može sadržati samo mala slova i brojeve."
      );
    } else {
      setUsernameMessage(null);
    }
  }, [username]);

  // VALIDACIJA: LOZINKA (VELIKO SLOVO, BROJ I ZNAK)
  useEffect(() => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let message = [];
    if (!hasUpperCase)
      message.push("Lozinka mora sadržati barem jedno veliko slovo.");
    if (!hasNumber) message.push("Lozinka mora sadržati barem jedan broj.");
    if (!hasSpecialChar)
      message.push("Lozinka mora sadržati barem jedan specijalni znak.");

    setPasswordMessage(message.length ? message.join(" ") : null);
  }, [password]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const verificationCode = generateVerificationCode();
    localStorage.setItem("verificationCode", verificationCode);
    localStorage.setItem("userEmail", email);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        Roles: userRole,
        firstName,
        lastName,
        email,
        birthDate,
        username,
        password,
      })
    );
    await sendVerificationEmail(email, verificationCode);

    navigate("/verify_your_account");
  };

  return (
    <div className="auth-page">
      <div className="auth-page-div">
        <form onSubmit={onSubmitHandler}>
          <div className="auth-page-input">
            {/*<select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="" disabled>
                Prijavite se kao
              </option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role === "User" ? "Korisnik" : "Vlasnik bungalova"}
                </option>
              ))}
            </select>
            */}

            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="" disabled>
                Prijavite se kao
              </option>
              {roles
                .filter((role) => role !== "Administrator")
                .map((role, index) => (
                  <option key={index} value={role}>
                    {role === "User"
                      ? "Korisnik"
                      : role === "BungalowOwner"
                      ? "Vlasnik bungalova"
                      : role}
                  </option>
                ))}
            </select>
          </div>
          <div className="auth-page-input">
            <input
              type="text"
              placeholder="Ime"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            {firstNameMessage && (
              <p className="input-alert">{firstNameMessage}</p>
            )}
          </div>
          <div className="auth-page-input">
            <input
              type="text"
              placeholder="Prezime"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            {lastNameMessage && (
              <p className="input-alert">{lastNameMessage}</p>
            )}
          </div>
          <div className="auth-page-input">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {emailMessage && <p className="input-alert">{emailMessage}</p>}
          </div>
          <div className="auth-page-input">
            <input
              type="date"
              onChange={(e) => setBirthDate(e.target.value)}
              value={birthDate}
            />
            {birthDateMessage && (
              <p className="input-alert">{birthDateMessage}</p>
            )}
          </div>
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
              type="password"
              placeholder="Lozinka"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {passwordMessage && (
              <p className="input-alert">{passwordMessage}</p>
            )}
          </div>
          <input type="submit" value="Registruj se" />
        </form>
      </div>
    </div>
  );
};

export default Registration;
