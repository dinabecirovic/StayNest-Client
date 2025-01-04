import React, { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import axios from "axios";
import { MyContext } from "../context/my-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const[username, setUsername] =  useState("");
    const[password, setPassword] =  useState("");
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const { setUserFunction } = useContext(MyContext);
    const[visible, setVisible] = useState(true)
    const navigate = useNavigate()

    const loginUserHandler = async (e) => {
        setError(null);

        try {
            setLoading(true);

            const response = await axios.post(
                "https://localhost:7168/api/User/login", 
                {
                    username: username,
                    password: password,
                }
            );

            const responseData = response.data;

            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${responseData.token}`;

            setUserFunction(responseData);

            setUsername('');
            setPassword('');

            navigate('/home')
        }
        catch (e) {
            console.log("Error", e);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
          {loading && <p>Učitavanje...</p>}
          {! loading && (
          <div className="auth-page-div">
              <div className="auth-page-input">
                <input
                  type="text"
                  placeholder="Korisničko ime"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="auth-page-input">
                <input
                  type="password"
                  placeholder="Lozinka"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
                {error && (
                  <p className="input-alert">{error}</p>
                )}
            <div className="auth-page-button">
                <button onClick={loginUserHandler}>Prijavi se</button>
            </div>
          </div>
          )}
        </div>
      );
    };

export default Login