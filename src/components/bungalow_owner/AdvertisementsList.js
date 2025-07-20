import { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Home, Users, Euro, Calendar } from "lucide-react";
import "../styles/AdvertisementsList.css";
import RatingList from "../users/RatingList";
import OwnerReservations from "./OwnerReservations";

function AdvertisementList({ BungalowOwnerId }) {
  const [advertisements, setAdvertisements] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [newPrice, setNewPrice] = useState("");
  const [error, setError] = useState("");
  const [selectedAd, setSelectedAd] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [showReservations, setShowReservations] = useState(false);
  const [selectedAdvertisementId, setSelectedAdvertisementId] = useState(null);
  const [reservations, setReservations] = useState([]);

  const fetchAdvertisements = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get(
        `https://staynest-api-production.up.railway.app/api/Advertisement/owner/${BungalowOwnerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(response.data)) {
        setAdvertisements([...response.data].reverse());
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRatings = async (bungalowId) => {
    try {
      const response = await axios.get(
        `https://staynest-api-production.up.railway.app/api/Bungalow/ratings/${bungalowId}`
      );
      setRatings(response.data);
    } catch (error) {
      console.error("Greška prilikom učitavanja ocena:", error);
      setRatings([]);
    }
  };

  const fetchReservations = async (advertisementId) => {
    const token = localStorage.getItem("jwtToken");
    console.log("Fetching reservations for advertisementId:", advertisementId);

    try {
      const response = await axios.get(
        `https://staynest-api-production.up.railway.app/api/Advertisement/reservations/${advertisementId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API response for reservations:", response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
        setReservations(response.data);
        setShowReservations(true);
      } else {
        console.warn("No reservations found for this advertisement.");
        setReservations([]);
        alert("Nema rezervacija za ovaj oglas.");
      }
    } catch (error) {
      console.error("Greška pri učitavanju rezervacija:", error);
      alert("Nema dostupnih rezervacija.");
    }
  };

  const deleteAdvertisement = async (advertisementId) => {
    const potvrda = window.confirm(
      "Da li ste sigurni da želite da izbrišete ovaj oglas?"
    );
    if (!potvrda) return;

    const token = localStorage.getItem("jwtToken");
    try {
      await axios.delete(
        `https://staynest-api-production.up.railway.app/api/Advertisement/${advertisementId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdvertisements((prev) =>
        prev.filter((ad) => ad.id !== advertisementId)
      );
      setSelectedAd(null);
      setError("");
      alert("Oglas je uspešno obrisan.");
    } catch (e) {
      setError("Došlo je do greške prilikom brisanja oglasa.");
    }
  };

  const updatePrice = async (advertisementId) => {
    const token = localStorage.getItem("jwtToken");

    const ad = advertisements.find((ad) => ad.id === advertisementId);

    // Proveri da li je unesena cena validna i drugačija od trenutne
    if (!newPrice || Number(newPrice) === Number(ad.price)) {
      alert("Unesite novu cenu koja je različita od trenutne.");
      return;
    }

    try {
      await axios.put(
        `https://staynest-api-production.up.railway.app/api/Advertisement/update-price/${advertisementId}`,
        Number(newPrice),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Ažuriranje cene u celokupnoj listi oglasa
      const updatedAds = advertisements.map((ad) =>
        ad.id === advertisementId ? { ...ad, price: newPrice } : ad
      );
      setAdvertisements(updatedAds);

      // Ažuriranje trenutno selektovanog oglasa u detaljima
      if (selectedAd && selectedAd.id === advertisementId) {
        setSelectedAd((prev) => ({ ...prev, price: newPrice }));
      }

      setNewPrice("");
      alert("Ažuriranje cene je uspelo.");
    } catch (error) {
      console.error("Greška prilikom ažuriranja cene:", error);
      alert("Ažuriranje cene nije uspelo.");
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

  const handleShowReservations = (advertisementId) => {
    console.log("Clicked on Pregledaj rezervacije for ID:", advertisementId);
    setSelectedAdvertisementId(advertisementId);
    fetchReservations(advertisementId);
  };

  return (
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
                DETALjI O BUNGALOVU
              </button>
              <button
                className={`tab ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("reviews");
                  fetchRatings(selectedAd.id);
                }}
              >
                OCENE I RECENZIJE
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "details" && (
                <div className="details-content">
                  <h2>{selectedAd.location}</h2>

                  <div className="detail-grid">
                    <div className="detail-item">
                      <MapPin size={20} />
                      <span>{selectedAd.location}</span>
                    </div>
                    <div className="detail-item">
                      <Users size={20} />
                      <span>{selectedAd.numbersOfRooms} osoba </span>
                    </div>
                    <div className="detail-item">
                      <Home size={20} />
                      <span>{selectedAd.buildingArea} m²</span>
                    </div>
                    <div className="detail-item">
                      <Euro size={20} />
                      <span>{selectedAd.price} </span>
                    </div>
                    <div className="detail-item">
                      <Calendar size={20} />
                      <span>
                        {selectedAd.isAvailable ? "Dostupno" : "Nije dostupno"}
                      </span>
                    </div>
                  </div>

                  <div className="description">
                    <h3>Opis</h3>
                    <p>{selectedAd.description}</p>
                  </div>

                  <div className="price-update-section">
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="Nova cena"
                      className="price-input"
                    />
                    <button
                      className="update-button"
                      onClick={() => updatePrice(selectedAd.id)}
                    >
                      Ažuriraj cenu
                    </button>
                    <button
                      className="delete-ad-button"
                      onClick={() => deleteAdvertisement(selectedAd.id)}
                    >
                      Izbriši oglas
                    </button>
                    <button
                      className="reserve-button"
                      onClick={() => handleShowReservations(selectedAd.id)}
                    >
                      Pregledaj rezervacije
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "reviews" && selectedAd && (
                <div className="reviews-content">
                  <RatingList ratings={ratings} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showReservations && selectedAdvertisementId && (
        <OwnerReservations
          advertisementId={selectedAdvertisementId}
          reservations={reservations}
          onClose={() => setShowReservations(false)}
        />
      )}
    </div>
  );
}

export default AdvertisementList;
