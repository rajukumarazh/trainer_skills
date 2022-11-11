import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import Container from "../../components/Container/Container";
import EditPartner from "../../Pages/Dashboard/Partner/EditPartner";
import ManagePartner from "../../Pages/Dashboard/Partner/ManagePartner";
import ManageProject from "../../Pages/Dashboard/Partner/ManageProject";
import PartnerDashboard from "../../Pages/Dashboard/Partner/PartnerDashboard";


const items = [
  {
    name: "Dashboard",
    url: "partner_dashboard",
    Component: <PartnerDashboard />,
    icon: MdDashboard,
  },
  { name: "Manage", url: "manage_partner", Component: <ManagePartner /> },
  {
    url: "update_partner",
    Component: <EditPartner />,
    hidden: true,
  },
  {
    name: "Projects",
    url: "manage_projects",
    Component: <ManageProject />,
    icon: FiEdit,
  },
];

function PartnerRoutes({ setSidebar, sidebar }) {
  const setSidebarItems = () => setSidebar({ items, active: 0 });
  useEffect(() => {
    setSidebarItems();
  }, []);
  const { url } = useRouteMatch();
  console.log(url);
  return (
    <Container title={"Manage Partners"}>
      {items[sidebar.active] && items[sidebar.active].Component}
    </Container>
  );
}

export default PartnerRoutes;
