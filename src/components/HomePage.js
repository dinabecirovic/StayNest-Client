import React, { useEffect, useState, useContext, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { MyContext } from "../context/my-context";
import "../index.css";
import {
  Euro,
  Users,
  Home,
  MapPin,
  Calendar,
  Search,
  Heart,
} from "lucide-react";
import ReserveBungalow from "./users/ReserveBungalow";
import { useNavigate } from "react-router-dom";
import "./styles/HomePage.css";

const HomePage = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [error, setError] = useState("");
  const [selectedAd, setSelectedAd] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const { userId, currentUser } = useContext(MyContext);
  const advertisementsRef = useRef(null);
  const navigate = useNavigate();

  const scrollToAdvertisements = () => {
    advertisementsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.get(
        "https://staynest-api-production.up.railway.app/api/Advertisement/advertisements"
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
  };

  const handleCloseDetails = () => {
    setSelectedAd(null);
    setCurrentImageIndex(0);
  };

  const handleShowReviews = () => {};

  const howItWorks = [
    {
      title: "Pretražite",
      description: "Pronađite idealan bungalov za vašu destinaciju",
      icon: <Search className="step-icon" />,
      onClick: scrollToAdvertisements,
    },
    {
      title: "Rezervišite",
      description: "Jednostavno rezervišite željeni termin",
      icon: <Calendar className="step-icon" />,
      onClick: () => {
        if (!currentUser) {
          navigate("/auth");
        } else {
          scrollToAdvertisements();
        }
      },
    },
    {
      title: "Uživajte",
      description: "Opustite se u vašem mediteranskom raju",
      icon: <Heart className="step-icon" />,
      onClick: scrollToAdvertisements,
    },
  ];

  const stats = [
    { number: "500+", label: "Bungalova" },
    { number: "50+", label: "Destinacija" },
    { number: "10k+", label: "Zadovoljnih gostiju" },
    { number: "4.8", label: "Prosečna ocena" },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <video autoPlay muted loop className="background-video">
          <source src="/videos/bg-video.mp4" type="video/mp4" />
          Vaš pregledač ne podržava video tag.
        </video>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Mediteranski Bungalovi</h1>
          <p>
            Otkrijte idealne bungalove uz more i uživajte u nezaboravnom odmoru
          </p>
        </motion.div>
      </div>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Kako funkcioniše</h2>
            <p>Jednostavan proces do vašeg idealnog odmora</p>
          </motion.div>

          <div className="steps-grid">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                className="step-card"
                onClick={step.onClick}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="step-number">{step.step}</div>
                {step.icon}
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="advertisements-section" ref={advertisementsRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Popularne destinacije</h2>
            <p>Otkrijte najtraženije bungalove uz more</p>
          </motion.div>

          {error && <div className="error-message">{error}</div>}

          <div className="advertisements-grid">
            {advertisements.map((ad, index) => (
              <motion.div
                key={ad.id}
                className="ad-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                      <Users size={16} /> {ad.numbersOfRooms} osoba
                    </span>
                    <span>
                      <Home size={16} /> {ad.buildingArea} m²
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                      <MapPin size={20} /> <span>{selectedAd.location}</span>
                    </div>
                    <div className="detail-item">
                      <Users size={20} />{" "}
                      <span>{selectedAd.numbersOfRooms} Osoba</span>
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
                  <p className="no-reviews">
                    Morate prvo rezervisati da biste ocenili.
                  </p>
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
};

export default HomePage;
