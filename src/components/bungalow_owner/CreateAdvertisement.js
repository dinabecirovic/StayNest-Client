import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateAdvertisement.css";

function CreateAdvertisement({ onClose, onAdCreated }) {
  const [photos, setPhotos] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [numbersOfRooms, setNumberOfRooms] = useState("");
  const [buildingArea, setBuildingArea] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [createdAd, setCreatedAd] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const locations = ["Srbija", "Hrvatska", "Bosna i Hercegovina", "Crna Gora"];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewPhotos((prevPreview) => [...prevPreview, ...previewUrls]);
  };

  const create = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      photos.forEach((photo) => formData.append("Photos", photo));
      formData.append("numbersOfRooms", numbersOfRooms);
      formData.append("buildingArea", buildingArea);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("IsAvailable", isAvailable.toString());

      const response = await axios.post("/api/Advertisement/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Dobavi ID oglasa iz odgovora
      const createdAdvertisementId = response.data.id;
      localStorage.setItem(
        "bungalow",
        JSON.stringify({ id: createdAdvertisementId })
      );

      setPhotos([]);
      setNumberOfRooms("");
      setBuildingArea("");
      setLocation("");
      setPrice("");
      setDescription("");
      setIsAvailable(true);
      navigate("/advertisements_list");

      setTimeout(() => {
        if (onAdCreated) {
          onAdCreated();
        }
        onClose();
      }, 500);

      onClose();
    } catch (e) {
      console.error(e);
      setError(
        "Došlo je do greške prilikom kreiranja posta. Pokušajte ponovo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    showModal && (
      <div className="modal-overlay">
        <div className="modal-container">
          <button className="modal-close" onClick={() => setShowModal(false)}>
            ✖
          </button>
          <div className="modal-header">KREIRAJ OGLAS</div>
          <hr />
          <form onSubmit={create} className="create-post-form">
            <div className="form-group photo-upload-container">
              <label htmlFor="file-upload" className="photo-upload-button">
                Izaberi fotografiju
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div className="photo-preview-grid">
                {previewPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`pregled ${index + 1}`}
                    className="photo-preview"
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <input
                type="number"
                name="numbersOfRooms"
                placeholder="Broj soba"
                onChange={(e) => setNumberOfRooms(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="buildingArea"
                placeholder="Površina objekta"
                onChange={(e) => setBuildingArea(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Izaberi državu</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                name="price"
                placeholder="Cena"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                placeholder="Opis"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Kreiranje oglasa..." : "Kreiraj"}
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default CreateAdvertisement;
