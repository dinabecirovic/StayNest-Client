import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://localhost:7168"; 
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;


const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/Administrator/users"); 
      setUsers(response.data);
      console.log(response.data)
    } catch (err) {
      setError("Greška pri dohvatanju korisnika.");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Učitavanje korisnika...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista korisnika</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{new Date(user.birthDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;