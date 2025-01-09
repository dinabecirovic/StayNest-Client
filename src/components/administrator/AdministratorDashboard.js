import React from "react";
import UsersTable from "./UsersTable";
import AdvertisementsTable from "./AdvertisementsTable";

const AdministratorDashboard = () => {
  return (
    <div>
      <h1>Administrator Dashboard</h1>
      <UsersTable />
      <AdvertisementsTable />
    </div>
  );
};

export default AdministratorDashboard;
