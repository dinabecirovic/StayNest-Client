import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import AdministratorDashboard from './components/administrator/AdministratorDashboard';



function App() {
  return (
    <div className="routes">
      <Routes>
        <Route path="/" element={<h1>Welcome!</h1>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar/>} />
        <Route path="/administrator_dashboard" element={<AdministratorDashboard/>} />
      </Routes>
    </div>
  );
}

export default App;
