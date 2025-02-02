import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TableStyles.css";

const AdvertisementsTable = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.get("/api/Advertisement/advertisements");
      setAdvertisements(response.data);
    } catch (error) {
      console.error("Greška pri dohvatanju oglasa:", error);
    }
  };

  const deleteAdvertisement = async (advertisementId) => {
    if (window.confirm("Da li ste sigurni da želite obrisati oglas?")) {
      try {
        await axios.delete(
          `/api/Administrator/advertisements/${advertisementId}`
        );
        setAdvertisements(
          advertisements.filter((ad) => ad.id !== advertisementId)
        );
        alert("Oglas je uspešno obrisan.");
      } catch (err) {
        alert("Greška pri brisanju oglasa.");
      }
    }
  };

  const filteredAdvertisements = advertisements.filter((ad) =>
    `${ad.location} ${ad.price} ${ad.description}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="table-container">
      <h1 className="table-title">Lista oglasa</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Pretraži oglase..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <i className="fas fa-search search-icon"></i>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Slika</th>
            <th>Broj soba</th>
            <th>Površina</th>
            <th>Lokacija</th>
            <th>Cena</th>
            <th>Opis</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvertisements.map((ad) => (
            <tr key={ad.id}>
              <td>{ad.id}</td>
              <td>
                <img src={ad.urlPhoto} className="table-image" />
              </td>
              <td>{ad.numbersOfRooms}</td>
              <td>{ad.buildingArea} m²</td>
              <td>{ad.location}</td>
              <td>{ad.price} €</td>
              <td>{ad.description}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => deleteAdvertisement(ad.id)}
                >
                  Obriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertisementsTable;
