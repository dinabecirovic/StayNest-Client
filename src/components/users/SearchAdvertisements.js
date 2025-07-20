import React, { useState } from "react";
import axios from "axios";
import "../styles/FilterPanel.css";

function SearchAdvertisements({ onClose, onResults }) {
  const [criteria, setCriteria] = useState({
    minPrice: "",
    maxPrice: "",
    location: "",
    minRooms: "",
    maxRooms: "",
    minArea: "",
    maxArea: "",
  });

  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const locations = [
    "Srbija",
    "Hrvatska",
    "Bosna i Hercegovina",
    "Crna Gora",
    "Slovenija",
    "Severna Makedonija",
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://staynest-api-production.up.railway.app/api/Bungalow/search",
        { params: criteria }
      );

      setResults(response.data);

      if (onResults) {
        onResults(response.data);
      }

      setShowModal(false);
    } catch (error) {
      console.error("Greška prilikom pretrage oglasa:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setCriteria({
      minPrice: "",
      maxPrice: "",
      location: "",
      minRooms: "",
      maxRooms: "",
      minArea: "",
      maxArea: "",
    });
  };

  return (
    showModal && (
      <div className="modal-overlay">
        <div className="modal-container">
          <button
            className="modal-close"
            onClick={() => {
              setShowModal(false);
              if (onClose) {
                onClose();
              }
            }}
          >
            ✖
          </button>

          <div className="modal-header">FILTRIRAJTE OGLASE</div>
          <hr />

          <form onSubmit={handleSearch}>
            <div className="filter-section">
              <select
                name="location"
                value={criteria.location}
                onChange={handleChange}
              >
                <option value="">Država</option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-section">
              <h3>CENA</h3>
              <div className="range-inputs">
                <input
                  name="minPrice"
                  placeholder="Min"
                  value={criteria.minPrice}
                  onChange={handleChange}
                  type="number"
                />
                <input
                  name="maxPrice"
                  placeholder="Max"
                  value={criteria.maxPrice}
                  onChange={handleChange}
                  type="number"
                />
              </div>
            </div>

            <div className="filter-section">
              <h3>BROJ SOBA</h3>
              <div className="range-inputs">
                <input
                  name="minRooms"
                  placeholder="Min"
                  value={criteria.minRooms}
                  onChange={handleChange}
                  type="number"
                />
                <input
                  name="maxRooms"
                  placeholder="Max"
                  value={criteria.maxRooms}
                  onChange={handleChange}
                  type="number"
                />
              </div>
            </div>

            <div className="filter-section">
              <h3>POVRŠINA</h3>
              <div className="range-inputs">
                <input
                  name="minArea"
                  placeholder="Min"
                  value={criteria.minArea}
                  onChange={handleChange}
                  type="number"
                />
                <input
                  name="maxArea"
                  placeholder="Max"
                  value={criteria.maxArea}
                  onChange={handleChange}
                  type="number"
                />
              </div>
            </div>

            <div className="filter-buttons">
              <button type="submit" className="search-button">
                Prikaži bungalove
              </button>
              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
              >
                Poništi
              </button>
            </div>
          </form>

          {results.length > 0 && (
            <div className="results-section">
              <ul>
                {results.map((ad) => (
                  <li key={ad.id}>
                    <img
                      src={ad.urlPhotos?.[0]}
                      alt="Slika bungalova"
                      style={{
                        width: "200px",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                    <p>Lokacija: {ad.location}</p>
                    <p>Broj soba: {ad.numbersOfRooms}</p>
                    <p>Površina: {ad.buildingArea} m²</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default SearchAdvertisements;
