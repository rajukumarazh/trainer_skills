import React, {useEffect} from "react";
import Timeline from "../../Pages/Dashboard/Timeline/Timeline";

const TimelineRoutes = ({setSidebar, sidebar}) => {
  const setSidebarItems = () => setSidebar({items: [], active: 0});
  useEffect(() => {
    setSidebarItems();
  }, []);
  return <Timeline />;
};

export default TimelineRoutes;
