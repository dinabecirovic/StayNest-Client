import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import Login from "./Login"; // Login komponenta
import Registration from "./Registration"; // Registration komponenta
import "./styles/Navbar.css";

const Navbar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const toggleLoginPanel = () => {
        setIsLoginOpen(true);
        setIsRegisterOpen(false); // Zatvara registraciju ako je otvorena
    };

    const toggleRegisterPanel = () => {
        setIsRegisterOpen(true);
        setIsLoginOpen(false); // Zatvara login ako je otvoren
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo">Stay Nest</div>
                <div className="icons">
                    <FaUser className="icon" onClick={toggleLoginPanel} />
                </div>
            </nav>

            {isLoginOpen && (
                <div className="panel">
                    <div className="panel-header">
                        <h2>
                            PRIJAVITE SE{" "}
                            <span
                                className={`register-link ${
                                    isRegisterOpen ? "gray-link" : ""
                                }`}
                                onClick={toggleRegisterPanel}
                            >
                                Registrujte se
                            </span>
                        </h2>
                    </div>
                    <Login />
                </div>
            )}

            {isRegisterOpen && (
                <div className="panel">
                    <div className="panel-header">
                        <h2>
                            REGISTRUJTE SE{" "}
                            <span
                                className={`register-link ${
                                    isLoginOpen ? "gray-link" : ""
                                }`}
                                onClick={toggleLoginPanel}
                            >
                                Prijavite se
                            </span>
                        </h2>
                    </div>
                    <Registration />
                </div>
            )}
        </div>
    );
};

export default Navbar;
