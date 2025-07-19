import React, { useState } from "react";
import UsersTable from "./UsersTable";
import AdvertisementsTable from "./AdvertisementsTable";
import "../styles/AdministratorDashboard.css";

const AdministratorDashboard = () => {
  const [selectedTable, setSelectedTable] = useState("users");

  return (
    <div className="dashboard-container">
      <div className="button-container">
        <button
          className={selectedTable === "users" ? "active" : ""}
          onClick={() => setSelectedTable("users")}
        >
          Korisnici
        </button>
        <button
          className={selectedTable === "ads" ? "active" : ""}
          onClick={() => setSelectedTable("ads")}
        >
          Oglasi
        </button>
      </div>

      <div className="table-wrapper">
        {selectedTable === "users" ? <UsersTable /> : <AdvertisementsTable />}
      </div>
    </div>
  );
};

export default AdministratorDashboard;
