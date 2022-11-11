import React, { useEffect, useState } from "react";
import { LogoBlue } from "../../assets";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation, useRouteMatch } from "react-router";

import { Link } from "react-router-dom";
import Profile from "./components/Profile";
import { useBasePath } from "../../components/useBaseUrl/useBaseUrl";
import { publishChanges } from "utils/hooks/webhooks";

const Navbar = () => {
  const { pathname } = useLocation();
  const basePath = useBasePath();
  const [search, setSearch] = useState("");
  const [nav, setNav] = useState({
    items: [
      { name: "Home", url: "/" },
      { name: "Trainee", url: "/users" },
      { name: "Courses", url: "/courses" },
      { name: "Trainer", url: "/instructor" },
      { name: "Partner", url: "/partner" },
    ],
    current: 0,
  });
  const [profile, setProfile] = useState([
    { name: "Publish changes", onClick: publishChanges },
    { name: "logout", url: "/logout" },
  ]);
  const [profileOpen, setProfileOpen] = useState(false);
  const changeCurrentNav = (index) => {
    setNav({ ...nav, current: index });
  };
  useEffect(() => {
    var changed = false;
    for (var i = 0; i < nav.items.length; i++) {
      if (nav.items[i].url === basePath) {
        changeCurrentNav(i);
        changed = true;
        break;
      }
    }
    if (!changed) changeCurrentNav(0);
  }, [basePath]);

  return (
    <div className="flex flex-col overflow-hidden shadow-md w-full">
      <div className="p-4.5 flex justify-between">
        <img src={LogoBlue} className="w-48" />
        <div className="flex">
          <AiOutlineSearch className="mt-2.5 mr-4 text-2xl" />
          <input
            placeholder={"Search"}
            className="placeholder-light-gray outline-none text-gray-500"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex mt-3 justify-between">
          {nav.items.map((item, index) => (
            <div className="min-w-max  mx-3" key={item.url}>
              <Link
                to={item.url}
                className={`text-base font-semibold text-indigo no-underline h-6 ${
                  nav.current === index && "border-b-2 border-orange"
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <Profile open={profileOpen} setOpen={setProfileOpen} />
        </div>
      </div>
      {profileOpen && (
        <div className="flex-col shadow self-end mr-20 mt-28 rounded-2xl absolute bg-white w-60 text-center">
          {profile.map((item) => (
            <div className="my-3" key={item.url}>
              <Link
                to={item.url}
                onClick={item.onClick || (() => null)}
                className="text-indigo font-medium text-lg no-underline"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Navbar;
