import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const DashboardLayout = ({ Component }) => {
  const [sidebar, setSidebar] = useState({
    active: 0,
    items: [],
  });

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar sidebarItems={sidebar} setSidebarItems={setSidebar} />
        <Component setSidebar={setSidebar} sidebar={sidebar} />
      </div>
    </>
  );
};

export default DashboardLayout;
