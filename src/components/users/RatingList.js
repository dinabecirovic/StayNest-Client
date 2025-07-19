import React from "react";
import "../styles/RatingList.css";

const RatingList = ({ ratings }) => {
  const renderStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= score;
      stars.push(
        <span
          key={i}
          className={`star-display ${isFilled ? "filled" : "empty"}`}
        >
          <svg
            width="16"
            height="16"
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
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("sr-RS", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="rating-list-container">
      {ratings.length === 0 ? (
        <div className="no-ratings">
          <div className="no-ratings-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke="#D1D5DB"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <p className="no-ratings-text">
            Još uvek nema recenzija za ovaj bungalov.
          </p>
          <p className="no-ratings-subtext">
            Budite prvi koji će ostaviti recenziju!
          </p>
        </div>
      ) : (
        <div className="ratings-grid">
          {ratings
            .slice()
            .reverse()
            .map((r) => (
              <div key={r.id} className="rating-card">
                <div className="rating-header">
                  <div className="rating-score-section">
                    <div className="stars-display">{renderStars(r.score)}</div>
                    <span className="score-text">{r.score}/5</span>
                  </div>
                  {r.createdAt && (
                    <span className="rating-date">
                      {formatDate(r.createdAt)}
                    </span>
                  )}
                </div>

                {r.username && (
                  <div className="rating-user">
                    <div className="user-avatar">
                      {r.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="user-name">{r.username}</span>
                  </div>
                )}

                {r.comment && (
                  <div className="rating-comment">
                    <p className="comment-text">{r.comment}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RatingList;
