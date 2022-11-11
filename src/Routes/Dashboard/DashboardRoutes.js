import React, {useState} from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import DashboardPage from "../../Pages/Dashboard/DashboardPage";
import CourseRoutes from "./CoursesRoutes";
import InstructorRoutes from "./InstructorRoutes";
import PartnerRoutes from "./PartnerRoutes";
import UserRoutes from "./UserRoutes";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import TimelineRoutes from "../../Routes/Dashboard/TimelineRoutes";
import LogoutPage from "../../Pages/Dashboard/LogoutPage";

const DashboardRoutes = () => {
  const {url} = useRouteMatch();

  const routes = [
    {
      path: `users`,
      component: UserRoutes,
    },
    {
      path: `courses`,
      component: CourseRoutes,
    },
    {
      path: `instructor`,
      component: InstructorRoutes,
    },
    {
      path: `partner`,
      component: PartnerRoutes,
    },
    {
      path: "logout",
      component: LogoutPage
    },
    {
      component: DashboardPage,
    }
  ];

  return (
    <Switch>
      {routes.map(({path, component}) => {
        return (
          <Route path={path ? `${url}${path}/:sidebarActive?` : undefined}>
            <DashboardLayout Component={component} />
          </Route>
        );
      })}
    </Switch>
  );
};

export default DashboardRoutes;
