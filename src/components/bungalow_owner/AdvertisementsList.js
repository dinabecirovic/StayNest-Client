import { useState, useEffect } from "react";
import axios from "axios";
import CreateAdvertisement from "./CreateAdvertisement";

function AdvertisementList({ BungalowOwnerId }) {
  const [advertisements, setAdvertisements] = useState([]);
  const [newPrice, setNewPrice] = useState("");
  const [editPriceId, setEditPriceId] = useState(null);
  const [error, setError] = useState("");

  const fetchAdvertisements = async () => {
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await axios.get(
        `https://localhost:7168/api/Advertisement/owner/${BungalowOwnerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  const deleteAdvertisement = async (advertisementId) => {
    const token = localStorage.getItem("jwtToken");

    try {
      await axios.delete(
        `https://localhost:7168/api/Advertisement/${advertisementId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdvertisements((prevAdvertisements) =>
        prevAdvertisements.filter(
          (advertisement) => advertisement.id !== advertisementId
        )
      );

      setError("");
    } catch (e) {
      setError("Došlo je do greške prilikom brisanja oglasa.");
    }
  };

  const updatePrice = async (advertisementId) => {
    const token = localStorage.getItem("jwtToken");

    try {
      await axios.put(
        `https://localhost:7168/api/Advertisement/update-price/${advertisementId}`,
        { price: newPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAdvertisements((prevAdvertisements) =>
        prevAdvertisements.map((ad) =>
          ad.id === advertisementId ? { ...ad, price: newPrice } : ad
        )
      );
      alert("Price updated successfully!");
      setEditPriceId(null);
      setNewPrice("");
    } catch (error) {
      console.error("Error updating price:", error);
      alert("Failed to update the price.");
    }
  };
  useEffect(() => {
    fetchAdvertisements();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {advertisements.map((ad) => (
        <div key={ad.id} className="advertisement">
          <div className="photos-container">
            {ad.urlPhotos?.map((photoUrl, i) => (
              <img
                key={i}
                src={photoUrl}
                alt={`${ad.location} - ${i + 1}`}
                className="advertisement-photo"
              />
            ))}
          </div>
          <p>
            <strong>Number of Rooms:</strong> {ad.numbersOfRooms}
          </p>
          <p>
            <strong>Building Area:</strong> {ad.buildingArea} sqm
          </p>
          <p>
            <strong>Location:</strong> {ad.location}
          </p>
          <p>
            <strong>Price:</strong> ${ad.price}
          </p>
          <p>
            <strong>Description:</strong> {ad.description}
          </p>
          <p>
            <strong>Available:</strong> {ad.isAvailable ? "Yes" : "No"}
          </p>

          <button onClick={() => deleteAdvertisement(ad.id)}>Delete</button>

          <div>
            <input
              type="number"
              placeholder="Enter new price"
              value={newPrice} // Controlled input
              onChange={(e) => setNewPrice(e.target.value)}
            />
            <button onClick={() => updatePrice(ad.id)}>Update Price</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdvertisementList;
