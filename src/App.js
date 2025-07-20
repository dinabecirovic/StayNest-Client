import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Navbar from "./components/Navbar"; // Navbar je uvek dostupan
import AdministratorDashboard from "./components/administrator/AdministratorDashboard";
import CreateAdvertisement from "./components/bungalow_owner/CreateAdvertisement";
import AdvertisementsList from "./components/bungalow_owner/AdvertisementsList";
import ReserveBungalow from "./components/users/ReserveBungalow";
import SearchAdvertisements from "./components/users/SearchAdvertisements";
import VerifyAccount from "./components/VerifyAccount";
import OwnerReservations from "./components/bungalow_owner/OwnerReservations";
import UserDashboard from "./components/users/UserDashboard";
import BungalowReviews from "./components/users/BungalowReviews";
import AuthPage from "./components/AuthPage";
import Footer from "./components/Footer";

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
          <Route path="/user/add_rating" element={<BungalowReviews />} />
          <Route path="/user/reserve_bungalow" element={<ReserveBungalow />} />
          <Route path="/search" element={<SearchAdvertisements />} />
          <Route path="/verify_your_account" element={<VerifyAccount />} />
          <Route path="/owner_reservations" element={<OwnerReservations />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
