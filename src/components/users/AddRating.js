import React, { useState } from "react";
import axios from "axios";

const AddRating = ({ bungalowId }) => {
    const [rating, setRating] = useState({
        bungalowId,
        userId: "",
        score: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRating({ ...rating, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://localhost:7168/api/Bungalow/rate", rating);
            alert("Rating submitted successfully!");
        } catch (error) {
            console.error("Error adding rating:", error);
            alert("Failed to submit rating.");
        }
    };

    return (
        <div>
            <h3>Add Rating</h3>
            <form onSubmit={handleSubmit}>
                <input name="userId" placeholder="User ID" value={rating.userId} onChange={handleChange} />
                <select name="score" value={rating.score} onChange={handleChange}>
                    {[1, 2, 3, 4, 5].map((score) => (
                        <option key={score} value={score}>
                            {score}
                        </option>
                    ))}
                </select>
                <button type="submit">Submit Rating</button>
            </form>
        </div>
    );
};

export default AddRating;
