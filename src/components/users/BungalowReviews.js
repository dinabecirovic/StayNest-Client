import React, { useState, useEffect } from "react";
import axios from "axios";

function BungalowReviews({ bungalowId }) {
  const [reviews, setReviews] = useState([]);
  const [newScore, setNewScore] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  // Učitavanje svih recenzija za dati bungalov
  const fetchReviews = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get(
        `https://staynest-api-production.up.railway.app/api/Bungalow/${bungalowId}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Greška pri učitavanju recenzija:", error);
    }
  };

  // Dodavanje nove recenzije
  const addReview = async () => {
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("userId");

    try {
      await axios.post(
        "https://staynest-api-production.up.railway.app/api/Bungalow/rate",
        {
          UserId: userId,
          BungalowId: bungalowId,
          Score: newScore,
          Comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewScore(5);
      setNewComment("");
      fetchReviews();
    } catch (error) {
      console.error("Greška pri dodavanju recenzije:", error);
      setError("Greška pri dodavanju recenzije.");
    }
  };

  // Učitavanje recenzija prilikom prikaza komponente
  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bungalowId]);

  return (
    <div className="bungalow-reviews">
      <h3>Ocene i recenzije</h3>
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <h4>
                {review.user.firstName} {review.user.lastName}
              </h4>
              <p>Ocena: {review.score} / 5</p>
              <p>Komentar: {review.comment}</p>
            </div>
          ))
        ) : (
          <p>Nema recenzija za ovaj bungalov.</p>
        )}
      </div>

      <div className="add-review">
        <h4>Dodaj recenziju</h4>
        <label>Ocena (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={newScore}
          onChange={(e) => setNewScore(e.target.value)}
        />

        <label>Komentar:</label>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Napiši komentar..."
        />

        <button onClick={addReview}>Dodaj recenziju</button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default BungalowReviews;
