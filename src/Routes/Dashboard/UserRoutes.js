import React, {Component, useEffect, useState} from "react";
import UsersPage from "../../Pages/Dashboard/UsersPage";
import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import ManageUsers from "../../Pages/Dashboard/Users/ManageUsers";
import CreateUsers from "../../Pages/Dashboard/Users/CreateUsers";
import Container from "../../components/Container/Container";
import {useBasePath} from "../../components/useBaseUrl/useBaseUrl";
import {AiOutlineSearch, AiOutlineUserAdd} from "react-icons/ai";
import {MdManageAccounts} from "react-icons/md";
import EditUsers from "../../Pages/Dashboard/Users/EditUsers";
import OnboardingUsers from "../../Pages/Dashboard/Users/OnboardingUsers/OnboardingUsers";
import UserBatchEnrol from "../../Pages/Dashboard/Users/UserBatchEnrol"
const items = [
  {
    icon: AiOutlineUserAdd,
    name: "Create Trainee",
    url: "create_user",
    Component: <CreateUsers />,
  },
  {
    icon: MdManageAccounts,
    name: "Manage Trainee",
    url: "manage_users",
    Component: <ManageUsers />,
  },
  {
    icon: MdManageAccounts,
    name: "Onboard Bulk Trainee",
    url: "onboard_users",
    Component: <OnboardingUsers />,
  },
  {
    icon: MdManageAccounts,
    name: "Batch Enrol",
    url: "batch_enrol",
    Component: <UserBatchEnrol />,
  },
  {
    url: "update_users",
    Component: <EditUsers />,
    hidden: true,
  },
];
function UserRoutes({setSidebar, sidebar}) {
  const {sidebarActive} = useParams();
  const {pathname} = useLocation();
  const baseurl = useBasePath();
  const setSidebarItems = () => setSidebar({items, active: 0});
  useEffect(() => {
    setSidebarItems();
  }, []);
  return (
    <Container title={"Manage Users"}>
      {items[sidebar.active] && items[sidebar.active].Component}
    </Container>
  );
}

export default UserRoutes;
