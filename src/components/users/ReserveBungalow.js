import React, { useState } from "react";
import axios from "axios";

const ReserveBungalow = ({ advertisementId }) => {
    const [reservation, setReservation] = useState({
        advertisementId,
        userId: "",
        startDate: "",
        endDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservation({ ...reservation, [name]: value });
    };

    const handleReserve = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://localhost:7168/api/Bungalow/reserve", reservation);
            alert("Reservation successful!");
        } catch (error) {
            console.error("Error reserving bungalow:", error);
            alert("Reservation failed.");
        }
    };

    return (
        <div>
            <h3>Reserve Bungalow</h3>
            <form onSubmit={handleReserve}>
                <input name="userId" placeholder="User ID" value={reservation.userId} onChange={handleChange} />
                <input name="startDate" type="date" value={reservation.startDate} onChange={handleChange} />
                <input name="endDate" type="date" value={reservation.endDate} onChange={handleChange} />
                <button type="submit">Reserve</button>
            </form>
        </div>
    );
};

export default ReserveBungalow;
