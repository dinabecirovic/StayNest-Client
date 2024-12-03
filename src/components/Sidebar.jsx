import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="navigation">
            <div className="navigation-link">
                <Link to="/home">StayNest</Link>
            </div>
            <div className="navigation-link">
                <Link to="/registration">Registruj se</Link>
            </div>
            <div className="navigation-link">
                <Link to="/login">Prijavi se</Link>
            </div>
        </div>
    )

}
 