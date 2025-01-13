import React, { useState } from "react";
import axios from "axios";

const SearchAdvertisements = () => {
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

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("https://localhost:7168/api/Bungalow/search", {
                params: criteria,
            });
            setResults(response.data);
        } catch (error) {
            console.error("Error searching advertisements:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCriteria({ ...criteria, [name]: value });
    };

    return (
        <div>
            <h2>Search Advertisements</h2>
            <form onSubmit={handleSearch}>
                <input name="minPrice" placeholder="Min Price" value={criteria.minPrice} onChange={handleChange} />
                <input name="maxPrice" placeholder="Max Price" value={criteria.maxPrice} onChange={handleChange} />
                <input name="location" placeholder="Location" value={criteria.location} onChange={handleChange} />
                <input name="minRooms" placeholder="Min Rooms" value={criteria.minRooms} onChange={handleChange} />
                <input name="maxRooms" placeholder="Max Rooms" value={criteria.maxRooms} onChange={handleChange} />
                <input name="minArea" placeholder="Min Area" value={criteria.minArea} onChange={handleChange} />
                <input name="maxArea" placeholder="Max Area" value={criteria.maxArea} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
            <ul>
                {results.map((ad) => (
                    <li key={ad.id}>
                        {ad.title} - ${ad.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchAdvertisements;
