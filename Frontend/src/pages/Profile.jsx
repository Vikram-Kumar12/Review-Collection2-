import React, { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth.js";
import { Link } from "react-router-dom";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    fullName: user?.name,
    username: user?.email?.split("@")[0],
    email: user?.email,
    role: user?.role,
  });
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setEditMode(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="lg:min-h-screen p-6 flex flex-col items-center pt-35 lg:pt-20 mt-0 lg:mt-20"
    >
      <div className="max-w-4xl w-full border-2 border-gray-700 rounded-lg shadow-lg p-6 space-y-6">
        {/* Desktop-view */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-md lg:text-2xl font-bold">
            {user?.avatar && (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-orange-500 via-orange-600 to-orange-700">
              {user?.name}
            </h2>
            <p className="text-gray-400">@{user?.email?.split("@")[0]}</p>
            <p className="text-gray-400">{user?.email}</p>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className="border border-gray-500 hover:bg-gray-700 transition px-4 py-2 rounded cursor-pointer"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>
        {/* Mobile-view */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-end">
            <button
              onClick={() => setEditMode(!editMode)}
              className="border border-gray-500 hover:bg-gray-700 cursor-pointer transition px-4 py-2 rounded"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="flex space-x-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-xl font-bold text-black">
              {user?.avatar && (
                <img
                  src={user?.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-orange-500 via-orange-600 to-orange-700">
                {user?.name}
              </h2>
              <p className="text-gray-400">
                @{user?.email?.split("@")[0]}
              </p>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-700 p-4 rounded-md space-y-4">
          <h3 className="text-lg font-semibold border-b border-gray-600 pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#1e1e1e] text-white border border-gray-600 rounded"
                />
              ) : (
                <p className="font-semibold">{user?.name}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-400">Username</label>
              {editMode ? (
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#1e1e1e] text-white border border-gray-600 rounded"
                />
              ) : (
                <p className="text-white">
                  @{user?.email?.split("@")[0]}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <p className="w-full mt-1 p-2 bg-[#1e1e1e] text-white border border-gray-600 rounded">
                {user?.email}
                <span className="ml-2 text-sm">🔒</span>
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Role</label>
              <p className="w-full mt-1 p-2 bg-[#1e1e1e] text-white border border-gray-600 rounded">
                {user?.role}
                <span className="ml-2 text-sm">🔒</span>
              </p>
            </div>
          </div>
          {editMode && (
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-orange-600 hover:bg-orange-700 transition px-6 py-2 rounded text-white font-semibold"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
