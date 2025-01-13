import React, { useState } from "react";
import axios from "axios";
import AdvertisementsList from "./AdvertisementsList";
import { useNavigate } from "react-router-dom";

const CreateAdvertisement = () => {
    const [urlPhoto, setUrlPhoto] = useState("");
    const [numbersOfRooms, setNumberOfRooms] = useState("");
    const [buildingArea, setBuildingArea] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [available, setAvailable] = useState(true);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate()

    const create = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://localhost:7168/api/Advertisement/create", 
                {
                    urlPhoto,
                    numbersOfRooms,
                    buildingArea,
                    location,
                    price,
                    description,
                    available,
                }
            );
            const responseData = response.data;

            if (responseData.token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${responseData.token}`;
            }

            setUrlPhoto("");
            setNumberOfRooms("");
            setBuildingArea("");
            setLocation("");
            setPrice("");
            setDescription("");
            setAvailable(true); 

            navigate('/advertisements_list');
        } catch (e) {
            console.error("Error", e);
            setError("Failed to create advertisement. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="advertisement-holder">
                <form onSubmit={create}>
                    <div>
                        <label>Photo URL:</label>
                        <input
                            type="text"
                            value={urlPhoto}
                            onChange={(e) => setUrlPhoto(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Number of Rooms:</label>
                        <input
                            type="number"
                            value={numbersOfRooms}
                            onChange={(e) => setNumberOfRooms(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Building Area (sqm):</label>
                        <input
                            type="number"
                            value={buildingArea}
                            onChange={(e) => setBuildingArea(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            Available:
                            <input
                                type="checkbox"
                                checked={available}
                                onChange={(e) => setAvailable(e.target.checked)}
                            />
                        </label>
                    </div>
                    <button type="submit">Create Advertisement</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateAdvertisement;
