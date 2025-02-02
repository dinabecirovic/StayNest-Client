import React, { useState, useContext } from "react"; // Import useContext
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MyContext } from "../context/my-context"; // Ensure MyContext is correctly imported
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import AdvertisementList from "./bungalow_owner/AdvertisementsList";
import {
  faSlidersH,
  faSignOutAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"; // Corrected faPlus import
import Login from "./Login"; // Import Login component
import Registration from "./Registration"; // Import Registration component
import CreateAdvertisement from "./bungalow_owner/CreateAdvertisement";
import SearchAdvertisements from "./users/SearchAdvertisements"; // Import SearchAdvertisements component
import "./styles/Navbar.css";
import axios from "axios";

const Navbar = ({ fetchAdvertisements }) => {
  const { userRole, currentUser, setUserFunction, setRoleFunction } =
    useContext(MyContext); // Use context for user and role
  const [advertisements, setAdvertisements] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = currentUser !== null;

  const handleLogout = () => {
    if (currentUser) {
      // Proveri da li je currentUser različit od null
      setUserFunction(null); // Očisti korisničke podatke
      setRoleFunction(""); // Očisti ulogu

      localStorage.removeItem("user"); // Ukloni korisničke podatke iz localStorage
      axios.defaults.headers.common["Authorization"] = ""; // Očisti Authorization header
    }
    setIsLoginOpen(false);
    setIsRegisterOpen(false);

    navigate("/");
  };

  const handleAdCreated = () => {
    setRefresh((prev) => !prev);
  };

  // Funkcija za otvaranje login panela
  const toggleLoginPanel = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsRegisterOpen(false);
  };

  // Funkcija za otvaranje filter panela
  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleCreatePanel = () => {
    setIsCreateOpen(!isCreateOpen);
  };

  // Funkcija za otvaranje registracije
  const toggleRegisterPanel = () => {
    setIsRegisterOpen(!isRegisterOpen);
    setIsLoginOpen(false); // Ako se registracija otvori, zatvori login
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Stay Nest</div>
        <div className="icons">
          {isLoggedIn ? (
            <>
              {/* Ako je korisnik vlasnik, prikaži ikonu za dodavanje */}
              {userRole === "BungalowOwner" && (
                <FontAwesomeIcon
                  icon={faPlus}
                  className="icon"
                  onClick={toggleCreatePanel}
                  title="Dodaj"
                />
              )}

              {/* Ako je korisnik prijavljen (nije vlasnik), prikaži ikonu za filtriranje */}
              {userRole === "User" && (
                <FontAwesomeIcon
                  icon={faSlidersH}
                  className="icon"
                  onClick={toggleFilterPanel}
                  title="Filtriraj"
                />
              )}

              {/* Ikonica za odjavu */}
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="icon"
                onClick={handleLogout}
                title="Odjavi se"
              />
            </>
          ) : (
            <>
              {/* Ikonica za prijavu (samo za neregistrovane korisnike) */}
              <FontAwesomeIcon
                icon={faUser}
                className="icon"
                onClick={toggleLoginPanel}
              />
              {/* Ikonica za filtriranje (samo za neregistrovane korisnike) */}
              <FontAwesomeIcon
                icon={faSlidersH}
                className="icon"
                onClick={toggleFilterPanel}
              />
            </>
          )}
        </div>
      </nav>

      {isLoginOpen && (
        <div className="panel">
          <div className="panel-header">
            <h2>
              PRIJAVITE SE{" "}
              <span
                className={`register-link ${isRegisterOpen ? "gray-link" : ""}`}
                onClick={() => {
                  toggleRegisterPanel();
                }}
              >
                Registrujte se
              </span>
            </h2>
          </div>
          <Login closeLoginPanel={() => setIsLoginOpen(false)} />
        </div>
      )}

      {isRegisterOpen && (
        <div className="panel">
          <div className="panel-header">
            <h2>
              REGISTRUJTE SE{" "}
              <span
                className={`register-link ${isLoginOpen ? "gray-link" : ""}`}
                onClick={toggleLoginPanel}
              >
                Prijavite se
              </span>
            </h2>
          </div>
          <Registration closeRegisterPanel={() => setIsRegisterOpen(false)} />
        </div>
      )}

      {isFilterOpen && (
        <div className="filter-panel">
          <SearchAdvertisements />
        </div>
      )}

      {isCreateOpen && (
        <CreateAdvertisement
          onClose={() => setIsCreateOpen(false)}
          onAdCreated={handleAdCreated} // ✅ Dodali smo funkciju za osvežavanje
        />
      )}

      {/* ✅ Refresh prop natera AdvertisementList da se ponovo učita */}
      <AdvertisementList key={refresh} />
    </div>
  );
};

export default Navbar;
