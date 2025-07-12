import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "lucide-react";
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
        const response = await axios.get(
          `https://localhost:7168/api/Advertisement/reservations/${advertisementId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReservations(response.data);
        setLoading(false);
      } catch (err) {
        setError("Došlo je do greške prilikom učitavanja rezervacija.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, [advertisementId]);

  return (
    <div className="reservations-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="text-2xl font-semibold">Pregled Rezervacija</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="reservations-container">
          {loading ? (
            <div className="loading-state">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brown-600"></div>
                <span>Učitavanje...</span>
              </div>
            </div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : reservations.length === 0 ? (
            <div className="empty-state">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-brown-400" />
              <p className="text-lg">
                Trenutno nema rezervacija za ovaj smeštaj.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="reservations-table">
                <thead>
                  <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Telefon</th>
                    <th>Datum početka</th>
                    <th>Datum završetka</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((res) => (
                    <tr key={res.id}>
                      <td className="flex items-center gap-2">
                        {res.firstName}
                      </td>
                      <td>{res.lastName}</td>
                      <td className="flex items-center gap-2">
                        {res.phoneNumber}
                      </td>
                      <td>
                        {new Date(res.startDate).toLocaleDateString("sr-RS")}
                      </td>
                      <td>
                        {new Date(res.endDate).toLocaleDateString("sr-RS")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerReservations;
