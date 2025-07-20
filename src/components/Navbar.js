import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MyContext } from "../context/my-context";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import AdvertisementList from "./bungalow_owner/AdvertisementsList";
import { faSignOutAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateAdvertisement from "./bungalow_owner/CreateAdvertisement";
import "./styles/Navbar.css";
import axios from "axios";

const Navbar = ({ fetchAdvertisements }) => {
  const { userRole, currentUser, setUserFunction, setRoleFunction } =
    useContext(MyContext);
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

    navigate("/");
  };

  const handleAdCreated = () => {
    setRefresh((prev) => !prev);
  };

  const toggleCreatePanel = () => {
    setIsCreateOpen(!isCreateOpen);
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
