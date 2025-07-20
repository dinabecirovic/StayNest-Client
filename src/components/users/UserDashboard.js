import { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Home, Users, Euro, Calendar } from "lucide-react";
import "../styles/AdvertisementsList.css";
import AddRating from "./AddRating";
import RatingList from "../users/RatingList";
import ReserveBungalow from "./ReserveBungalow";

function UserDashboard({ advertisementId, userId }) {
  const [advertisements, setAdvertisements] = useState([]);
  const [error, setError] = useState("");
  const [selectedAd, setSelectedAd] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [ratings, setRatings] = useState("");

  /*const [reservations, setReservations] = useState({
    advertisementId,
    userId: userId || "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    startDate: "",
    endDate: "",
  });*/

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7168/api/Advertisement/advertisements`
      );
      if (Array.isArray(response.data)) {
        setAdvertisements(response.data);
        setError("");
      } else {
        throw new Error("Error");
      }
    } catch (e) {
      setError("Došlo je do greške prilikom učitavanja oglasa.");
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchRatings = async (bungalowId) => {
    try {
      const response = await axios.get(
        `https://localhost:7168/api/Bungalow/ratings/${bungalowId}`
      );

      setRatings(response.data);
    } catch (error) {
      console.error("Greška pri učitavanju ocena:", error);
    }
  };

  const handleCardClick = (ad) => {
    setSelectedAd(ad);
    setCurrentImageIndex(0);
    setActiveTab("details");
  };

  const handleCloseDetails = () => {
    setSelectedAd(null);
    setCurrentImageIndex(0);
  };

  const handleShowReviews = () => {
    fetchRatings(selectedAd.id);
  };

  return (
    <div className="advertisements-container">
      {error && <div className="error-message">{error}</div>}

      <div className="advertisements-grid">
        {advertisements
          .slice()
          .reverse()
          .map((ad) => (
            <div
              key={ad.id}
              className="ad-card"
              onClick={() => handleCardClick(ad)}
            >
              <div className="ad-image">
                <img src={ad.urlPhotos[0]} alt={ad.location} />
                <div className="ad-price">
                  <Euro size={16} />
                  {ad.price}/noć
                </div>
              </div>
              <div className="ad-content">
                <h3>{ad.location}</h3>
                <div className="ad-details">
                  <span>
                    <Users size={16} />
                    {ad.numbersOfRooms} osobe
                  </span>
                  <span>
                    <Home size={16} />
                    {ad.buildingArea} m²
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {selectedAd && (
        <div className="details-modal">
          <div className="modal-content">
            <button className="close-m-button" onClick={handleCloseDetails}>
              ×
            </button>

            <div className="image-gallery">
              <img
                src={selectedAd.urlPhotos[currentImageIndex]}
                alt={selectedAd.location}
              />
              <button
                className="gallery-nav prev"
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) =>
                      (prev - 1 + selectedAd.urlPhotos.length) %
                      selectedAd.urlPhotos.length
                  )
                }
              >
                ‹
              </button>
              <button
                className="gallery-nav next"
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) => (prev + 1) % selectedAd.urlPhotos.length
                  )
                }
              >
                ›
              </button>
              <div className="image-counter">
                {currentImageIndex + 1} / {selectedAd.urlPhotos.length}
              </div>
            </div>

            <div className="tabs">
              <button
                className={`tab ${activeTab === "details" ? "active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                DETALJI O BUNGALOVU
              </button>
              <button
                className={`tab ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("reviews");
                  handleShowReviews();
                }}
              >
                OCENE I RECENZIJE
              </button>
              <button
                className={`tab ${activeTab === "reservation" ? "active" : ""}`}
                onClick={() => setActiveTab("reservation")}
              >
                REZERVIŠI TERMIN
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "details" && (
                <div className="details-content">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <MapPin size={20} />
                      <span>{selectedAd.location}</span>
                    </div>
                    <div className="detail-item">
                      <Users size={20} />
                      <span>{selectedAd.numbersOfRooms} Osobe </span>
                    </div>
                    <div className="detail-item">
                      <Home size={20} />
                      <span>{selectedAd.buildingArea} m²</span>
                    </div>
                    <div className="detail-item">
                      <Calendar size={20} />
                      <span>
                        {selectedAd.isAvailable
                          ? "Oglas je dostupan."
                          : "Oglas nije dostupan."}
                      </span>
                    </div>
                  </div>

                  <div className="description">
                    <h3>Opis</h3>
                    <p>{selectedAd.description}</p>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="reviews-content">
                  <AddRating
                    bungalowId={selectedAd.id}
                    onRatingSubmitted={() => fetchRatings(selectedAd.id)}
                  />

                  <RatingList ratings={ratings} />
                </div>
              )}

              {activeTab === "reservation" && (
                <div className="reservation-content">
                  <ReserveBungalow
                    advertisementId={selectedAd.id}
                    userId={userId}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
