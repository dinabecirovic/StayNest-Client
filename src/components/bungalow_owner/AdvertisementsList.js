import React, { useState, useEffect } from "react";
import axios from "axios";

const AdvertisementsList = () => {
    const [advertisements, setAdvertisements] = useState([]); 
    const [newPrice, setNewPrice] = useState(""); // Missing state
    const [editPriceId, setEditPriceId] = useState(null); // Missing state

    useEffect(() => {
        const fetchAdvertisements = async () => {
            try {
                const response = await axios.get("https://localhost:7168/api/Advertisement/owner/{BungalowOwnerId}");
                setAdvertisements(response.data);
            } catch (error) {
                console.error("Error fetching advertisements:", error);
            }
        };

        fetchAdvertisements();
    }, []);

    const deleteAdvertisement = async (advertisementId) => {
        try {
            await axios.delete(`https://localhost:7168/api/Advertisement/${advertisementId}`);
            setAdvertisements(advertisements.filter((ad) => ad.id !== advertisementId));
            alert("Advertisement successfully deleted!");
        } catch (error) {
            console.error("Error deleting advertisement:", error);
            alert("Failed to delete the advertisement.");
        }
    };

    const updatePrice = async (advertisementId) => {
        try {
            await axios.put(`https://localhost:7168/api/Advertisement/update-price/${advertisementId}`, { price: newPrice });
            setAdvertisements(advertisements.map((ad) =>
                ad.id === advertisementId ? { ...ad, price: newPrice } : ad
            ));
            alert("Price updated successfully!");
            setEditPriceId(null);
            setNewPrice("");
        } catch (error) {
            console.error("Error updating price:", error);
            alert("Failed to update the price.");
        }
    };

    const reservations = async (advertisementId) => {
        try {
            await axios.delete(`https://localhost:7168/api/Advertisement/${advertisementId}`);
            setAdvertisements(advertisements.filter((ad) => ad.id !== advertisementId));
            alert("Advertisement successfully deleted!");
        } catch (error) {
            console.error("Error deleting advertisement:", error);
            alert("Failed to delete the advertisement.");
        }
    };
    
    return (
        <div>
            <h2>Advertisements</h2>
            {advertisements.length === 0 ? (
                <p>No advertisements found.</p>
            ) : (
                <div>
                    {advertisements.map((ad) => (
                        <div key={ad.id} className="advertisement">
                            <p><strong>Photo URL:</strong> {ad.urlPhoto}</p>
                            <p><strong>Number of Rooms:</strong> {ad.numbersOfRooms}</p>
                            <p><strong>Building Area:</strong> {ad.buildingArea} sqm</p>
                            <p><strong>Location:</strong> {ad.location}</p>
                            <p><strong>Price:</strong> ${ad.price}</p>
                            <p><strong>Description:</strong> {ad.description}</p>
                            <p><strong>Available:</strong> {ad.isAvailable ? "Yes" : "No"}</p>
    
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
            )}
        </div>
    );
};

export default AdvertisementsList;
