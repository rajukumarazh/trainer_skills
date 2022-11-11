import React from "react";

const UserSearch = ({ onSearchValueChange }) => {
  return (
    <div>
      <h1 htmlFor="price" className="block text-sm text-xl text-gray-700">
        Users
      </h1>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name="search"
          id="name.givenName"
          className="focus:ring-blue-500 outline-none focus:border-indigo-500 block w-full pl-7 pr-12  border-gray-300 rounded-lg py-2 border text-center"
          placeholder="search a user"
          onChange={(e) => {
            onSearchValueChange(e);
          }}
        />

        <div className="absolute inset-y-0 right-0 pl-3 flex items-center text-xl">
          <button className="text-gray-500 sm:text-sm mr-5">
            <box-icon name="search" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
