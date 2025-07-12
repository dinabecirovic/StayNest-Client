import React, { useEffect, useState } from "react";
import axios from "axios";

const AddRating = ({ bungalowId, onRatingSubmitted }) => {
  const [rating, setRating] = useState({
    bungalowId,
    userId: "",
    score: 1,
    comment: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.users?.id || storedUser?.id;
    if (userId) {
      setRating((prev) => ({ ...prev, userId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRating({ ...rating, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.post("https://localhost:7168/api/Bungalow/rate", rating, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Hvala što ste ostavili ocenu!");

      if (onRatingSubmitted) {
        onRatingSubmitted(); // automatski osveži listu ocena
      }

      // reset forme
      setRating((prev) => ({ ...prev, score: 1, comment: "" }));
    } catch (error) {
      console.error("Greška pri ocenjivanju:", error);
      alert("Nismo uspeli da sačuvamo vašu ocenu.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Ocena (1–5):</label>
        <select name="score" value={rating.score} onChange={handleChange}>
          {[1, 2, 3, 4, 5].map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>

        <label>Komentar:</label>
        <textarea
          name="comment"
          value={rating.comment}
          onChange={handleChange}
          placeholder="Ostavite komentar"
          required
        />

        <button type="submit">Pošalji ocenu</button>
      </form>
    </div>
  );
};

export default AddRating;
