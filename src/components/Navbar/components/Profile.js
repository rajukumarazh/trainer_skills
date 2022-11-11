import React, {useState} from "react";

import {AiOutlineDown} from "react-icons/ai";
import {IoMdNotifications} from "react-icons/io";

const Profile = ({open, setOpen}) => {
  return (
    <div>
      <button className="flex w-96" onClick={() => setOpen(!open)}>
        <IoMdNotifications className="text-3xl" />
        <p className="text-lg mx-2 font-medium text-indigo">Hi, Admin</p>

        <div className="flex mx-3">
          <AiOutlineDown className="text-orange mt-2" />
          <img
            className="w-12 rounded-full mx-2 -mt-2"
            src={
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
        </div>
      </button>
    </div>
  );
};

export default Profile;
