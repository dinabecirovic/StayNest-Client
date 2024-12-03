import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="routes">
      <Routes>
        <Route path="/" element={<h1>Welcome!</h1>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar/>} />
      </Routes>
    </div>
  );
}

export default App;
