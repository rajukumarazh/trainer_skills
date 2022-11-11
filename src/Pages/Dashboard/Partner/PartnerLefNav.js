import React from "react";
import { Link } from "react-router-dom";

function PartnerLefNav() {
  const routes = [
    { label: "Manage Partners", link: "/partner/manage_partner" },
  ];

  return (
    <div className="w-18 md:w-60 bg-gray-700 flex flex-col h-screen ">
      {routes.map((route) => {
        return (
          <div className="text-gray-400 dark:text-white gap-y-5  text-center pt-3 hover:bg-gray-500 cursor-pointer h-12">
            <Link
              className="dark:text-white text-gray-400 hover:bg-gray-500 hover:text-gray-400"
              to={route.link}
            >
              {route.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default PartnerLefNav;
