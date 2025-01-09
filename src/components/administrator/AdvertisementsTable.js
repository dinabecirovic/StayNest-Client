import React, { useState, useEffect } from "react";
import axios from "axios";

const AdvertisementsTable = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async (advertisementId) => {
    try {
      const response = await axios.get(`http://localhost:7168/api/Advertisement/{advertisementId}`);
      setAdvertisements(response.data);
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };

  const deleteAdvertisement = async (advertisementId) => {
    try {
      await axios.delete(`http://localhost:7168/api/Administrator/advertisements/${advertisementId}`);
      alert("Oglas je izbrisan uspešno!");
      fetchAdvertisements(); 
    } catch (error) {
      console.error("Error deleting advertisement:", error);
      alert("Oglas ne može biti izbrisan.");
    }
  };

  return (
    <div>
      <h2>Advertisements</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo URL</th>
            <th>Rooms</th>
            <th>Area</th>
            <th>Location</th>
            <th>Price</th>
            <th>Description</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {advertisements.map((ad) => (
            <tr key={ad.id}>
              <td>{ad.id}</td>
              <td>{ad.urlPhoto}</td>
              <td>{ad.numbersOfRooms}</td>
              <td>{ad.buildingArea}</td>
              <td>{ad.location}</td>
              <td>{ad.price}</td>
              <td>{ad.description}</td>
              <td>{ad.isAvailable ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => deleteAdvertisement(ad.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertisementsTable;
