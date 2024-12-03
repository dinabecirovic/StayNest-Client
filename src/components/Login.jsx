import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const Login = () => {
    const[visible, setVisible] = useState(true)

    return (
        <div className="login-container">
            <div className="login-container-inner">
                <h2>Prijava</h2>
            </div>
            <div className="input">
                <input type="text" placeholder="Korisničko ime" />
            </div>
            <div className="input">
                <input type="password" placeholder="Lozinka" />
            </div>
            
            {visible 
                ? <FaRegEye onClick={() => setVisible(!visible)} className='icon' id='eye'/> 
                : <FaRegEyeSlash onClick={() => setVisible(!visible)} className='icon' id='eye'/>
            }

            <div className="button">
                <button>Prijavi se</button>
            </div>
        </div>
    )
}

export default Login