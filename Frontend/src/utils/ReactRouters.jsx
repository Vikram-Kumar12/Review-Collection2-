import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/authentication/Login";
import Navbar from "../components/Home/Navbar";
import Profile from "../pages/Profile";
import PostReview from "../pages/PostReview";
import Dashboard from "../pages/Dashboard";

const ReactRouters = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/post-review" element={<PostReview/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  );
};

export default ReactRouters;
