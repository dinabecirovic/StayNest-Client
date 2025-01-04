import React, { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import axios from "axios";
import { MyContext } from "../context/my-context";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const[firstName, setFirstName] =  useState("");
    const[firstNameMessage, setFirstNameMessage] =  useState(null);
    const[lastName, setLastName] =  useState("");
    const[lastNameMessage, setLastNameMessage] =  useState(null);
    const[email, setEmail] =  useState("");
    const[emailMessage, setEmailMessage] =  useState(null);
    const[birthDate, setBirthDate] =  useState("");
    const[birthDateMessage, setBirthDateMessage] =  useState(null);
    const[username, setUsername] =  useState("");
    const[usernameMessage, setUsernameMessage] =  useState(null);
    const[password, setPassword] =  useState("");
    const[passwordMessage, setPasswordMessage] =  useState(null);
    const { setUserFunction } = useContext(MyContext);
    const[visible, setVisible] = useState(true)
    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setFirstNameMessage(null);
        setLastNameMessage(null);
        setEmailMessage(null);
        setBirthDateMessage(null);
        setUsernameMessage(null);
        setPasswordMessage(null);

        if(firstName.trim().length === 0) {
            setFirstNameMessage("Molim vas unesete validno ime!");
            return;
        }
        if(lastName.trim().length === 0) {
            setLastNameMessage("Molim vas unesete validno prezime!");
            return;
        }
        if(email.trim().length === 0) {
            setEmailMessage("Molim vas unesete validan email!");
            return;
        }
        if(username.trim().length === 0) {
            setUsernameMessage("Molim vas unesete validno korisničko ime!");
            return;
        }
        if(password.trim().length === 0) {
            setPasswordMessage("Molim vas unesete validnu lozinku!");
            return;
        }

        try {
            const response = await axios.post(
                "https://localhost:7168/api/User/register", 
                {
                    firstName, 
                    lastName,
                    email,
                    birthDate,
                    username,
                    password
                }
            );

            const responseData = response.data;

            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${responseData.token}`;

            setUserFunction(responseData);

            setFirstName('');
            setLastName('');
            setEmail('');
            setUsername('');
            setPassword('');

            navigate('/home')
        }
        catch (e) {
            console.log("Error", e);
        }
    }

    return (
        <div className="auth-page">
          <div className="auth-page-div">
            <form onSubmit={onSubmitHandler}>
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
                {birthDateMessage && <p className="input-alert">{birthDateMessage}</p>}
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
            <div className="auth-page-input"></div>
          </div>
        </div>
      );
    };

export default Registration