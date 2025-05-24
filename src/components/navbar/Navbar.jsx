import React from 'react'
import { Link } from "react-router";
import { logout } from "@/store/userSlice";
import { useSelector, useDispatch } from "react-redux"; 
import { Home } from "lucide-react";

const Navbar = () => {
  const user = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  return (
    <nav>
      <div className="flex  justify-between items-center bg-gray-800 text-white p-4">
        <div className="flex items-center">
          <Link to="/user">
            <Home size={48} />
          </Link>
        </div>
        <div className="relative">
          {user ? (
            // display user name and logout button
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">{user}</h1>
              <h1 className="text-2xl font-bold mx-4">|</h1>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            // display login and register button
            <div className="flex items-center">
              <Link to="/login">
                <button className="bg-blue-500 text-white px-4 py-2 rounded ml-4">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar