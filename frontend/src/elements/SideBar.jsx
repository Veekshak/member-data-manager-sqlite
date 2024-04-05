import { useEffect, useState } from "react";
import { GoHome } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { IoPersonAddOutline } from "react-icons/io5";

export default function SideBar() {
  const [open, setOpen] = useState(false);

  function handleSideNavBar() {
    setOpen((preValue) => {
      return !preValue;
    });
  }
  return (
    <>
      <div
        className={`${
          open ? "w-56" : "w-20"
        } duration-300 h-screen bg-white p-2 relative flex flex-col justify-center items-center`}
        onClick={handleSideNavBar}
      >
        <NavLink to="/">
          {({ isActive }) => (
            <button
              className={`m-2 border-2 rounded-full h-14 ${
                open ? "w-36" : "w-14"
              } duration-300  border-purple-100 hover:border-purple-400 hover:border-5 flex items-center justify-center ${
                isActive ? "bg-blue-200" : "bg-purple-100"
              }`}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              {open ? (
                <div className="font-semibold text-xl">Home</div>
              ) : (
                <GoHome className="text-3xl" />
              )}
            </button>
          )}
        </NavLink>
        <NavLink to="/add-member">
          {({ isActive }) => (
            <button
              className={`m-2 border-2 rounded-full h-14 ${
                open ? "w-36" : "w-14"
              } duration-300  border-purple-100 hover:border-purple-400 hover:border-5 flex items-center justify-center ${
                isActive ? "bg-blue-200" : "bg-purple-100"
              }`}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              {open ? (
                <div className="font-semibold text-xl">Add</div>
              ) : (
                <IoPersonAddOutline className="text-2xl" />
              )}
            </button>
          )}
        </NavLink>
      </div>
    </>
  );
}
