import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Phone, User } from "lucide-react";
import "../styles/ReserveBungalow.css";

const ReserveBungalow = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    startDate: "",
    endDate: "",
  });

  const [userId, setUserId] = useState(null);
  const [advertisementId, setAdvertisementId] = useState(null);
  const [bungalow, setBungalow] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedBungalow = JSON.parse(localStorage.getItem("bungalow"));

    const exstractedUserId = storedUser?.users?.id || storedUser?.id;
    const exstractedBungalowId = storedBungalow?.id;

    if (!exstractedUserId) {
      alert("Greška: prijavite se ponovo.");
      navigate("/login");
      return;
    }

    if (!exstractedBungalowId) {
      alert("Greška: Vratite se nazad i pokušajte ponovo.");
      navigate("/reserve_bungalow");
      return;
    }

    setUserId(exstractedUserId);
    setAdvertisementId(exstractedBungalowId);
    setBungalow(storedBungalow);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    if (!token) {
      alert("Morate biti prijavljeni da biste zakazali termin.");
      navigate("/login");
      return;
    }

    console.log(advertisementId);

    const reservationData = {
      userId: parseInt(userId), // obavezno ovo!
      advertisementId: parseInt(advertisementId),
      firstName: formData.firstname,
      lastName: formData.lastname,
      phoneNumber: formData.phoneNumber,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    try {
      console.log("Rezervacija koja se šalje:", reservationData);

      const response = await fetch(
        "https://localhost:7168/api/Bungalow/reserve",
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
                <User className="input-icon" />
                <input
                  type="text"
                  name="firstname"
                  placeholder="Ime"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <User className="input-icon" />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Prezime"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <Phone className="input-icon" />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Telefon"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <Calendar className="input-icon" />
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="form-input"
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
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Zakaži termin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReserveBungalow;
