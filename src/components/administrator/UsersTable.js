import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/TableStyles.css";

axios.defaults.baseURL = "https://localhost:7168";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Pretraga

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/Administrator/users");
      setUsers(response.data);
    } catch (err) {
      setError("Greška pri dohvatanju korisnika.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    if (window.confirm("Da li ste sigurni da želite obrisati korisnika?")) {
      try {
        await axios.delete(`/api/Administrator/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
        alert("Korisnik je uspešno obrisan.");
      } catch (err) {
        alert("Greška pri brisanju korisnika.");
      }
    }
  };

  // Filtriranje korisnika
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email} ${user.username}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="table-container">
      <h1 className="table-title">Lista korisnika</h1>

      {/* Input za pretragu */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Pretraži korisnike..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <i className="fas fa-search search-icon"></i>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Datum rođenja</th>
            <th>Korisničko ime</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{new Date(user.birthDate).toLocaleDateString()}</td>
              <td>{user.username}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => deleteUser(user.id)}
                >
                  Obriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
