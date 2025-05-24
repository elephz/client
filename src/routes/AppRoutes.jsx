import Navbar from '@/components/navbar/Navbar';
import Home from '@/pages/Home';
import Movie from '@/pages/Movie';
import Cart from "@/pages/Cart";
import TodoList from '@/pages/TodoList';
import React from 'react'

import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import GuestRoute from './GuestRoute';
import User from '@/pages/User';
import PrivateRoute from "./PrivateRoute";
import UserForm from '@/pages/UserForm';
import AdminRoute from './AdminRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <>
              <Navbar />
              <div className="flex flex-col md:flex-row">
                {/* Left Section (Image) */}
                <div className="md:w-6/10 w-full md:flex hidden">
                  <img
                    src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Auth Visual"
                    className="w-full h-screen object-cover"
                  />
                </div>

                {/* Right Section (Content) */}
                <div className="md:w-4/10 w-full flex justify-center p-6 bg-white">
                  <div className="w-full max-w-xl">
                    <Outlet />
                  </div>
                </div>
              </div>
            </>
          }
        >
          <Route path="/" element={<PrivateRoute><User /></PrivateRoute>} />
          <Route path="/login" element={ <GuestRoute> <Login /> </GuestRoute> } />
          <Route path="/register" element={<GuestRoute> <Register /> </GuestRoute>} />

          <Route path="/user" element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route index element={<User />} /> {/* /user */}
            <Route path="new" element={<AdminRoute><UserForm /></AdminRoute>} /> {/* /user/new */}
            <Route path=":id/edit" element={<AdminRoute><UserForm /></AdminRoute>} /> {/* /user/:id/edit */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes