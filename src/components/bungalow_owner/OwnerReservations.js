import { useState, useEffect } from "react";
import { X, Mail, User, Clock, Loader2 } from "lucide-react";
import "../styles/OwnerReservation.css";

const OwnerReservations = ({ advertisementId, onClose }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!advertisementId) return;

    const fetchReservations = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
        const response = await fetch(
          `https://localhost:7168/api/Advertisement/reservations/${advertisementId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setReservations(data);
        setLoading(false);
      } catch (err) {
        setError("Došlo je do greške prilikom učitavanja rezervacija.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, [advertisementId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("sr-RS", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="reservations-modal-overlay">
      <div className="reservations-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="header-content">
            <h2 className="modal-title">Pregled Rezervacija</h2>
          </div>

          <button className="close-m-button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Content */}
        <div className="modal-body">
          {loading ? (
            <div className="loading-container">
              <Loader2 className="loading-spinner" />
              <p className="loading-text">Učitavanje rezervacija...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <div className="error-icon-wrapper">
                <X className="error-icon" />
              </div>
              <p className="error-message">{error}</p>
            </div>
          ) : reservations.length === 0 ? (
            <div className="empty-container">
              <div className="empty-icon-wrapper"></div>
              <h3 className="empty-title">Nema rezervacija</h3>
              <p className="empty-description">
                Trenutno nema rezervacija za ovaj smeštaj.
              </p>
            </div>
          ) : (
            <div className="reservations-content">
              {/* Desktop Table View */}
              <div className="desktop-table">
                <table className="reservations-table">
                  <thead>
                    <tr>
                      <th>Gost</th>
                      <th>Kontakt</th>
                      <th>Datum početka</th>
                      <th>Datum završetka</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation, index) => (
                      <tr
                        key={reservation.id}
                        className={index % 2 === 0 ? "row-even" : "row-odd"}
                      >
                        <td>
                          <div className="guest-info">
                            <div className="guest-avatar">
                              <User className="avatar-icon" />
                            </div>
                            <div className="guest-name">
                              {reservation.firstName} {reservation.lastName}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="contact-info">
                            <Mail className="contact-icon" />
                            <span>{reservation.email}</span>
                          </div>
                        </td>
                        <td>
                          <div className="date-info">
                            <Clock className="date-icon start-date" />
                            <span>{formatDate(reservation.startDate)}</span>
                          </div>
                        </td>
                        <td>
                          <div className="date-info">
                            <Clock className="date-icon end-date" />
                            <span>{formatDate(reservation.endDate)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="mobile-cards">
                {reservations.map((reservation, index) => (
                  <div key={reservation.id} className="reservation-card">
                    <div className="card-header">
                      <div className="guest-avatar">
                        <User className="avatar-icon" />
                      </div>
                      <div className="guest-details">
                        <h4 className="guest-name">
                          {reservation.firstName} {reservation.lastName}
                        </h4>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="card-info-item">
                        <Mail className="info-icon" />
                        <span>{reservation.email}</span>
                      </div>

                      <div className="card-info-item">
                        <Clock className="info-icon start-date" />
                        <span>
                          Početak: {formatDate(reservation.startDate)}
                        </span>
                      </div>

                      <div className="card-info-item">
                        <Clock className="info-icon end-date" />
                        <span>
                          Završetak: {formatDate(reservation.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerReservations;
