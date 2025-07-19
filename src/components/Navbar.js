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
      setUserFunction(null);
      setRoleFunction("");

      localStorage.removeItem("user");
      axios.defaults.headers.common["Authorization"] = "";
    }
    setIsLoginOpen(false);
    setIsRegisterOpen(false);

    navigate("/");
  };

  const handleAdCreated = () => {
    setRefresh((prev) => !prev);
  };

  const toggleLoginPanel = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsRegisterOpen(false);
  };

  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleCreatePanel = () => {
    setIsCreateOpen(!isCreateOpen);
  };

  const toggleRegisterPanel = () => {
    setIsRegisterOpen(!isRegisterOpen);
    setIsLoginOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Stay Nest
        </div>

        <div className="icons">
          {isLoggedIn ? (
            <>
              {userRole === "BungalowOwner" && (
                <FontAwesomeIcon
                  icon={faPlus}
                  className="icon"
                  onClick={toggleCreatePanel}
                  title="Dodaj"
                />
              )}

              {/* {userRole === "User" && (
                <FontAwesomeIcon
                  icon={faSlidersH}
                  className="icon"
                onClick={toggleFilterPanel} 
                  title="Filtriraj"
                />
              )} */}

              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="icon"
                onClick={handleLogout}
                title="Odjavi se"
              />
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faUser}
                className="icon"
                onClick={() => navigate("/auth")}
              />

              {/*<FontAwesomeIcon
                icon={faSlidersH}
                className="icon"
                onClick={toggleFilterPanel}
              /> */}
            </>
          )}
        </div>
      </nav>

      {isFilterOpen && (
        <div className="filter-panel">
          <SearchAdvertisements />
        </div>
      )}

      {isCreateOpen && (
        <CreateAdvertisement
          onClose={() => setIsCreateOpen(false)}
          onAdCreated={handleAdCreated}
        />
      )}

      {userRole === "BungalowOwner" && <AdvertisementList key={refresh} />}
    </div>
  );
};

export default Navbar;
