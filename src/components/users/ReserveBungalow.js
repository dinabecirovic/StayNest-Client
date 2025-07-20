import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import "../styles/ReserveBungalow.css";

const ReserveBungalow = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  const [advertisementId, setAdvertisementId] = useState(null);
  const [, setBungalow] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedBungalow = JSON.parse(localStorage.getItem("bungalow"));

    const extractedBungalowId = storedBungalow?.id;

    if (!storedUser) {
      alert("Morate se prijaviti da biste rezervisali bungalov.");
      navigate("/auth");
      return;
    }

    if (!extractedBungalowId) {
      alert("Greška: Vratite se nazad i pokušajte ponovo.");
      navigate("/reserve_bungalow");
      return;
    }

    setAdvertisementId(extractedBungalowId);
    setBungalow(storedBungalow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start <= now) {
      alert("Ne možete zakazati termin u prošlosti.");
      return;
    }

    if (end <= start) {
      alert("Datum završetka mora biti posle datuma početka.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    if (!token) {
      alert("Morate biti prijavljeni da biste zakazali termin.");
      navigate("/login");
      return;
    }

    const reservationData = {
      advertisementId: parseInt(advertisementId),
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    try {
      const response = await fetch(
        "https://staynest-api-production.up.railway.app/api/Bungalow/reserve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reservationData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Greška:", errorData);
        throw new Error(errorData.message || "Rezervacija nije uspela.");
      }

      alert("Termin uspešno zakazan!");
      navigate("/");
    } catch (error) {
      console.error("Greška prilikom zakazivanja:", error);
      alert(`Greška: ${error.message}`);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="bungalow-page">
      <div className="bungalow-container">
        <div className="bungalow-header">
          <h2 className="bungalow-title">Rezervacija Bungalova</h2>
        </div>

        <div className="bungalow-form-container">
          <form onSubmit={handleSubmit} className="bungalow-form">
            <div className="form-fields">
              <div className="input-group">
                <Calendar className="input-icon" />
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="form-input"
                  min={getMinDateTime()}
                />
              </div>

              <div className="input-group">
                <Calendar className="input-icon" />
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="form-input"
                  min={formData.startDate || getMinDateTime()}
                />
              </div>
            </div>

            <button type="submit" className="reserve-submit-button">
              Zakaži termin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReserveBungalow;
