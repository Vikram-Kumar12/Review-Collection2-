import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgMenu } from "react-icons/cg";
import { RiCloseLargeLine } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { logoutUser } from "../../service/authService.js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuth } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const menuItems = [
    {
      id: 1,
      name: "Post Review",
      icon: <CiSquarePlus />,
      link: "/post-review",
    },
    {
      id: 2,
      name: "Dashboard",
      icon: <MdOutlineDashboardCustomize />,
      link: "/dashboard",
    },
    { id: 3, name: "Profile", icon: <FiUser />, link: "/profile" },
  ];

  const navi = () => {
    navigate("/");
  };

  const logoutHandler = async () => {
    setIsLoggedIn(true);
    try {
      const response = await logoutUser();
      toast.success(response?.data?.message || "Logout successfully!");
      dispatch(logout());
      setIsMenuOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Logout request failed!");
    } finally {
      setIsLoggedIn(false);
    }
  };
  return (
    <nav className="text-white shadow-lg fixed top-0 px-1 md:px-5 lg:px-0 left-0 right-0 z-50 bg-black ">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25 }}
        className="w-full max-w-7xl mx-auto px-1  sm:px-6 lg:px-2 shadow-2xl mt-4 rounded-md  border border-gray-800"
      >
        <div className="flex justify-between h-16 ">
          {/* Logo */}
          <div onClick={navi} className="flex-shrink-0 flex items-center">
            <img
              src="/chaicode-logo.svg"
              alt=""
              className="w-[3rem] h-[4rem]"
            />
            <span className="text-2xl font-bold text-white">
              ReviewCollect<span className="text-[#FD9333]">ion</span>
            </span>
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuth ? (
              <Link
                to="/profile"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FAE8D0] text-black font-semibold"
              >
                {user?.user?.avatar && (
                  <img
                    src={user.user.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={toggleLogin}
                className="bg-[#FD9333] hover:bg-[#EA580C] cursor-pointer px-4 py-2 rounded-md transition-colors"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-gray-400 hover:text-white text-2xl px-4 py-2 rounded-md transition-colors flex items-center cursor-pointer "
            >
              <CgMenu />
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="bg-gray-800 hover:bg-gray-700 px-4  py-2 rounded-md transition-colors text-2xl"
            >
              <CgMenu />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-opacity-50 z-50"
              onClick={() => setIsMenuOpen(false)}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 w-full h-screen md:hidden bg-[rgba(37,26,18,0.6)] backdrop-blur-lg shadow-xl z-50 overflow-hidden pt-4 flex flex-col gap-5"
            >
              <div className="flex justify-between items-center h-14 px-4  border-gray-800 ">
                {/* Logo */}
                <div
                  onClick={navi}
                  className="flex-shrink-0 flex items-center "
                >
                  <img
                    src="/chaicode-logo.svg"
                    alt=""
                    className="w-[3rem] h-[4rem]"
                  />
                  <span className="text-2xl font-bold text-white">
                    ReviewCollect<span className="text-[#FD9333]">ion</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl cursor-pointer"
                >
                  <RiCloseLargeLine />
                </button>
              </div>

              <div className="p-2 flex flex-col justify-between h-[650px]">
                {user?.user?.role === "Cohort" ||
                user?.user?.role === "Admin" ? (
                  <nav className="flex flex-col space-y-2 mt-5">
                    {menuItems.map((item) => (
                      <Link
                        to={item.link}
                        key={item.id}
                        onClick={() => {
                          if (item.action) item.action();
                          setIsMenuOpen(false);
                        }}
                        className="text-left text-xl hover:bg-[#2B211B] py-3 px-4 rounded-md shadow-xl flex items-center gap-2 text-[#F97316] hover:text-[#EA580C] cursor-pointer"
                      >
                        <span className="bg-[#59361C] px-2 py-2 rounded-md text-2xl">
                          {item.icon}
                        </span>
                        <span className="text-white">{item.name}s</span>
                      </Link>
                    ))}
                  </nav>
                ) : (
                  <nav className="flex flex-col space-y-2 mt-5">
                    <Link
                      to="/profile"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-xl hover:bg-[#2B211B] py-3 px-4 rounded-md shadow-xl flex items-center gap-2 text-[#F97316] hover:text-[#EA580C] cursor-pointer"
                    >
                      <span className="bg-[#59361C] px-2 py-2 rounded-md text-2xl">
                        <FiUser />
                      </span>
                      <span className="text-white">Profile</span>
                    </Link>
                  </nav>
                )}

                {isAuth ? (
                  <button
                    onClick={logoutHandler}
                    className="w-full text-xl bg-[#F97316] py-3 px-4 rounded-md text-white hover:bg-[#EA580C] text-center cursor-pointer inline-block"
                  >
                    {isLoggedIn ? "Logout...." : "Logout"}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="w-full text-xl bg-[#F97316] py-3 px-4 rounded-md text-white hover:bg-[#EA580C] text-center cursor-pointer inline-block"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && !isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inset-0 bg-opacity-50 z-50"
              onClick={() => setIsMenuOpen(false)}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0   md:w-1/2 lg:w-1/4   bg-[rgba(37,26,18,0.6)] backdrop-blur-lg shadow-xl z-50 overflow-hidden py-4 h-screen flex flex-col gap-5 "
            >
              <div className="flex justify-between items-center h-14 px-4  border-gray-800 ">
                {/* Logo */}
                <div
                  onClick={navi}
                  className="flex-shrink-0 flex items-center "
                >
                  <img
                    src="/chaicode-logo.svg"
                    alt=""
                    className="w-[3rem] h-[4rem]"
                  />
                  <span className="text-2xl font-bold text-white">
                    ReviewCollect<span className="text-[#FD9333]">ion</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl cursor-pointer"
                >
                  <RiCloseLargeLine />
                </button>
              </div>

              <div className="p-2 flex flex-col justify-between h-full">
                {user?.user?.role === "Cohort" ||
                user?.user?.role === "Admin" ? (
                  <nav className="flex flex-col space-y-2 mt-5">
                    {menuItems.map((item) => (
                      <Link
                        to={item.link}
                        key={item.id}
                        onClick={() => {
                          if (item.action) item.action();
                          setIsMenuOpen(false);
                        }}
                        className="text-left text-xl hover:bg-[#2B211B] py-3 px-4 rounded-md shadow-xl flex items-center gap-2 text-[#F97316] hover:text-[#EA580C] cursor-pointer"
                      >
                        <span className="bg-[#59361C] px-2 py-2 rounded-md text-2xl">
                          {item.icon}
                        </span>
                        <span className="text-white">{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                ) : (
                  <nav className="flex flex-col space-y-2 mt-5">
                    <Link
                      to="/profile"
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-xl hover:bg-[#2B211B] py-3 px-4 rounded-md shadow-xl flex items-center gap-2 text-[#F97316] hover:text-[#EA580C] cursor-pointer"
                    >
                      <span className="bg-[#59361C] px-2 py-2 rounded-md text-2xl">
                        <FiUser />
                      </span>
                      <span className="text-white">Profile</span>
                    </Link>
                  </nav>
                )}

                {isAuth ? (
                  <button
                    onClick={logoutHandler}
                    className="w-full text-xl bg-[#F97316] py-3 px-4 rounded-md text-white hover:bg-[#EA580C] text-center cursor-pointer inline-block"
                  >
                    {isLoggedIn ? "Logout...." : "Logout"}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="w-full text-xl bg-[#F97316] py-3 px-4 rounded-md text-white hover:bg-[#EA580C] text-center cursor-pointer inline-block"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
