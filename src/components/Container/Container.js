import React from "react";

const Container = ({title, children}) => {
  return (
    <div className="min-h-screen bg-gray w-full">
      <div className="mx-2 mt-2 text-indigo">
        {/* <h1 className="text-3xl font-medium">{title}</h1> */}
        <div className="my-10"> {children}</div>
      </div>
    </div>
  );
};

export default Container;
