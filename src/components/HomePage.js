import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { MyContext } from "../context/my-context";
import { Euro, Users, Home, MapPin, Calendar } from "lucide-react"; // ili druge ikone koje koristiš
import AddRating from "./users/AddRating"; // proveri putanju
import ReserveBungalow from "./users/ReserveBungalow"; // proveri putanju
import "./styles/HomePage.css";

const HomePage = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [error, setError] = useState("");
  const [selectedAd, setSelectedAd] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const { userId } = useContext(MyContext); // Dodaj korisnički kontekst ako postoji

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7168/api/Advertisement/advertisements"
      );
      if (Array.isArray(response.data)) {
        setAdvertisements(response.data);
        setError("");
      } else {
        throw new Error("Unexpected response");
      }
    } catch (e) {
      setError("Došlo je do greške prilikom učitavanja oglasa.");
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const handleCardClick = (ad) => {
    setSelectedAd(ad);
    setCurrentImageIndex(0);
    setActiveTab("details");
    setShowReservationForm(false);
  };

  const handleCloseDetails = () => {
    setSelectedAd(null);
    setCurrentImageIndex(0);
    setShowReservationForm(false);
    setShowReviews(false);
  };

  const handleShowReviews = () => {
    setShowReviews(true);
  };

  return (
    <div className="home-container">
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Dobrodošli u Stay Nest</h1>
        <p>Pronađite savršen bungalov za vaše putovanje.</p>
        <motion.button
          className="hero-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Rezerviši sada
        </motion.button>
      </motion.div>

      <div className="advertisements-container">
        {error && <div className="error-message">{error}</div>}

        <div className="advertisements-grid">
          {advertisements.map((ad) => (
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
                    <Users size={16} /> {ad.numbersOfRooms} osobe
                  </span>
                  <span>
                    <Home size={16} /> {ad.buildingArea} m²
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedAd && (
          <div className="details-modal">
            <div className="modal-content">
              <button className="close-button" onClick={handleCloseDetails}>
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
                  Detalji
                </button>
                <button
                  className={`tab ${activeTab === "reviews" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("reviews");
                    handleShowReviews();
                  }}
                >
                  Ocene
                </button>
                <button
                  className={`tab ${
                    activeTab === "reservation" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("reservation")}
                >
                  Rezerviši termin
                </button>
              </div>

              <div className="tab-content">
                {activeTab === "details" && (
                  <div className="details-content">
                    <h2>{selectedAd.location}</h2>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <MapPin size={20} /> <span>{selectedAd.location}</span>
                      </div>
                      <div className="detail-item">
                        <Users size={20} />{" "}
                        <span>{selectedAd.numbersOfRooms} Osobe</span>
                      </div>
                      <div className="detail-item">
                        <Home size={20} />{" "}
                        <span>{selectedAd.buildingArea} m²</span>
                      </div>
                      <div className="detail-item">
                        <Calendar size={20} />{" "}
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
                    <h3>Ocene</h3>
                    {reservations.some(
                      (r) =>
                        r.bungalowId === selectedAd.id && r.userId === userId
                    ) ? (
                      <AddRating bungalowId={selectedAd.id} />
                    ) : (
                      <p className="no-reviews">
                        Morate prvo rezervisati da biste ocenili.
                      </p>
                    )}
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

      <div className="footer">
        <p>© 2025 Stay Nest. Sva prava zadržana.</p>
      </div>
    </div>
  );
};

export default HomePage;
