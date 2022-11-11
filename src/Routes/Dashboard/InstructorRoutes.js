import React, {useEffect, useState} from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";

import CreateInstructor from "../../Pages/Dashboard/Instructor/CreateInstructor";

import InstrctorLeftNav from "../../Pages/Dashboard/Instructor/InstructorLeftNav";
import Container from "../../components/Container/Container";
import UpdateInstructor from "../../Pages/Dashboard/Instructor/UpdateInstructor";
import ManageInstructor from "../../Pages/Dashboard/Instructor/ManageInstructor";

const items = [
  {
    name: "Create",
    url: "create_instructor",
    Component: <CreateInstructor />,
  },
  {name: "Manage", url: "manage_instructor", Component: <ManageInstructor />},
];

function InstructorRoutes({setSidebar, sidebar}) {
  const setSidebarItems = () => setSidebar({items, active: 0});
  // const [Component, setComponent] = useState(() => {});
  useEffect(() => {
    setSidebarItems();
  }, []);
  return (
    <Container title={" Manage Instructors"}>
      {items[sidebar.active] && items[sidebar.active].Component}
    </Container>
  );
}

export default InstructorRoutes;
