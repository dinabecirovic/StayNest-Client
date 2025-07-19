import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AddRating.css";

const AddRating = ({ bungalowId, onRatingSubmitted }) => {
  const [rating, setRating] = useState({
    bungalowId,
    userId: "",
    username: "",
    score: 0,
    comment: "",
  });
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.users?.id || storedUser?.id;
    const username = storedUser?.users?.username || storedUser?.username;
    if (userId && username) {
      setRating((prev) => ({
        ...prev,
        userId,
        username,
      }));
    }
  }, []);

  const handleStarClick = (score) => {
    setRating({ ...rating, score });
  };

  const handleStarHover = (score) => {
    setHoveredStar(score);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  const handleCommentChange = (e) => {
    setRating({ ...rating, comment: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating.score === 0) {
      alert("Molimo vas da odaberete ocenu!");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      console.log("Šaljem na backend:", rating);
      await axios.post("https://localhost:7168/api/Bungalow/rate", rating, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Hvala što ste ostavili ocenu!");

      if (onRatingSubmitted) {
        onRatingSubmitted();
      }

      setRating((prev) => ({ ...prev, score: 0, comment: "" }));
    } catch (error) {
      console.error("Greška pri ocenjivanju:", error);
      alert("Nismo uspeli da sačuvamo vašu ocenu.");
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredStar || rating.score);
      stars.push(
        <button
          key={i}
          type="button"
          className={`star ${isFilled ? "filled" : ""}`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
          aria-label={`Ocena ${i} od 5`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill={isFilled ? "#FFD700" : "#E5E7EB"}
              stroke="#D1D5DB"
              strokeWidth="1"
            />
          </svg>
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="add-rating-container">
      <div className="rating-card">
        <h3 className="rating-title">Ostavite svoju ocenu</h3>

        <form onSubmit={handleSubmit} className="rating-form">
          <div className="rating-section">
            <label className="rating-label">Vaša ocena:</label>
            <div className="stars-container">{renderStars()}</div>
            <p className="rating-text">
              {rating.score > 0
                ? `Odabrali ste ${rating.score} od 5 zvezda`
                : "Kliknite na zvezdu za ocenu"}
            </p>
          </div>

          <div className="comment-section">
            <label htmlFor="comment" className="comment-label">
              Vaš komentar:
            </label>
            <textarea
              id="comment"
              name="comment"
              value={rating.comment}
              onChange={handleCommentChange}
              placeholder="Podelite vaše iskustvo sa ovim bungalovom..."
              className="comment-textarea"
              rows={4}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Pošaljite ocenu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRating;
