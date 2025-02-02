import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Navbar from "./components/Navbar"; // Navbar je uvek dostupan
import AdministratorDashboard from "./components/administrator/AdministratorDashboard";
import CreateAdvertisement from "./components/bungalow_owner/CreateAdvertisement";
import AdvertisementsList from "./components/bungalow_owner/AdvertisementsList";
import AddRating from "./components/users/AddRating";
import ReserveBungalow from "./components/users/ReserveBungalow";
import SearchAdvertisements from "./components/users/SearchAdvertisements";
import VerifyAccount from "./components/VerifyAccount";

function App() {
  return (
    <div className="app">
      {/* Navbar se prikazuje uvek */}
      <Navbar />

      {/* Sve rute */}
      <div className="routes">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/administrator_dashboard"
            element={<AdministratorDashboard />}
          />
          <Route
            path="/create_advertisement"
            element={<CreateAdvertisement />}
          />
          <Route path="/advertisements_list" element={<AdvertisementsList />} />
          <Route path="/user/add-rating" element={<AddRating />} />
          <Route path="/user/reserve-bungalow" element={<ReserveBungalow />} />
          <Route path="/search" element={<SearchAdvertisements />} />
          <Route path="/verify_your_account" element={<VerifyAccount />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
