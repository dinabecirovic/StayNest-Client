import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AdministratorDashboard from './components/administrator/AdministratorDashboard';
import CreateAdvertisement from './components/bungalow_owner/CreateAdvertisement';
import AdvertisementsList from './components/bungalow_owner/AdvertisementsList';
import AddRating from './components/users/AddRating';
import ReserveBungalow from './components/users/ReserveBungalow';
import SearchAdvertisements from './components/users/SearchAdvertisements';



function App() {
  return (
    <div className="routes">
      <Routes>
        <Route path="/" element={<h1>Welcome!</h1>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/administrator_dashboard" element={<AdministratorDashboard/>} />
        <Route path="/create_advertisement" element={<CreateAdvertisement/>} />
        <Route path="/advertisements_list" element={<AdvertisementsList/>} />
        <Route path="/user" element={<AddRating/>} />
        <Route path="/user" element={<ReserveBungalow/>} />
        <Route path="/search" element={<SearchAdvertisements/>} />
      </Routes>
    </div>
  );
}

export default App;
