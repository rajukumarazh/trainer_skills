import React, {useEffect, useRef, useState} from "react";
import {
  useLocation,
  useParams,
  useRouteMatch,
  matchPath,
  useHistory,
} from "react-router-dom";
import {useBasePath} from "../useBaseUrl/useBaseUrl";
import SidebarItem from "./components/SidebarItem";

const Sidebar = ({setSidebarItems, sidebarItems = {items: [], active: 0}}) => {
  const changeCurrentItem = (index) =>
    setSidebarItems({...sidebarItems, active: index});
  const {sidebarActive} = useParams();
  const baseurl = useBasePath();
  const history = useHistory();
  useEffect(() => {
    var changed = false;
    for (var i = 0; i < sidebarItems.items.length; i++) {
      if (sidebarItems.items[i].url === sidebarActive) {
        changeCurrentItem(i);
        changed = true;
        break;
      }
    }
    if (!changed) changeCurrentItem(0);
  }, [sidebarActive, sidebarItems.items, history]);

  return (
    <div className="w-80">
      <div className="mt-4">
        {sidebarItems.items.map((item, index) =>
          !item.hidden ? (
            <SidebarItem
              name={item.name}
              Icon={item.icon}
              key={index}
              selected={index === sidebarItems.active}
              className={"m-4"}
              linkTo={`${baseurl}/${item.url}`}
              onClick={() => {
                changeCurrentItem(index);
              }}
            />
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
