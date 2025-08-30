import React from "react";
import { motion } from "framer-motion";
import { CiYoutube } from "react-icons/ci";
import { BiLogoInstagram } from "react-icons/bi";
import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaRegMessage } from "react-icons/fa6";
const Footer = () => {
  return (
    <motion.footer
      className="select-none  pt-8  overflow-hidden border-t border-orange-900 bg-[#000000]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-10 mb-10">
        <div className="flex flex-col md:flex-row  items-start  lg:gap-80 gap-10">
          <div className="flex flex-col lg:items-center">
            <motion.div
              className="flex items-center "
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Using a placeholder for the Chai Code logo - replace with your actual logo */}
              <img
                src="/chaicode-logo.svg"
                alt=""
                className="w-[2rem] h-[3rem]"
              />
              <span className="text-lg font-bold text-white">
                ReviewCollect<span className="text-[#FD9333]">ion</span>
              </span>
            </motion.div>
            <motion.p
              className="text-gray-500 max-w-sm text-sm mt-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Home for programmers
            </motion.p>
            <motion.div
              className="flex items-center space-x-4 text-white/80 mt-5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="https://www.youtube.com/@chaiaurcode"
                target="blank"
                aria-label="YouTube"
                className="inline-block transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:text-[#f7a049]"
              >
                <CiYoutube />
              </a>

              <a
                href="https://www.instagram.com/hiteshchoudharyofficial/?hl=en"
                target="blank"
                aria-label="Instagram"
                className="inline-block transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:text-[#f7a049]"
              >
                <BiLogoInstagram />
              </a>
              <a
                href="https://github.com/hiteshchoudhary"
                target="blank"
                aria-label="Github"
                className="inline-block transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:text-[#f7a049]"
              >
                <FiGithub />
              </a>
              <a
                href="https://x.com/hiteshdotcom"
                target="blank"
                aria-label="Twitter"
                className="inline-block transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:text-[#f7a049]"
              >
                <FaXTwitter />
              </a>
              <a
                href="linkedin.com/in/hiteshchoudhary?originalSubdomain=in"
                target="blank"
                aria-label="Linkedin"
                className="inline-block transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:text-[#f7a049]"
              >
                <SlSocialLinkedin />
              </a>
              <a
                href="https://discord.com/invite/WDrH3zuWFb"
                target="blank"
                aria-label="Discord"
                className="inline-block transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:text-[#f7a049] mt-1"
              >
                <FaRegMessage />
              </a>
            </motion.div>
            <motion.p
              className="mt-4 text-xs text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              © 2025 ChaiCode. All rights reserved.
            </motion.p>
          </div>

          <div className="flex flex-row space-x-12 md:space-x-24">
            <motion.div
              className="flex flex-col space-y-2 text-[#f7a049]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h4
                style={{ fontFamily: "font1" }}
                className="text-white text-2xl font-semibold mb-2 mt-2"
              >
                Cha<span className="text-[#f7a049]">i</span>code{" "}
              </h4>

              <a
                href="https://courses.chaicode.com/learn/view-all?show=batch&type=17"
                className="hover:text-white transition-colors duration-200"
              >
                Cohort
              </a>
              <a
                href="https://courses.chaicode.com/learn/batch/about?bundleId=226894"
                className="hover:text-white transition-colors duration-200"
              >
                Coding Hero
              </a>
              <a
                href="https://freeapi.app/"
                className="hover:text-white transition-colors duration-200"
              >
                FreeAPI
              </a>
              <a
                href="https://www.masterji.co/login"
                className="hover:text-white transition-colors duration-200"
              >
                Masterji
              </a>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="w-full mt-12 flex justify-center items-center  relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="relative w-fit">
            <div className="absolute inset-0 w-full h-full blur-2xl opacity-10 bg-gradient-to-r from-[#FF7D0C] via-[#EA580C] to-[#FE9332] z-0 "></div>
            <h1
              className="relative text-5xl md:text-[5rem] lg:text-[8rem] font-black text-[#EA580C] tracking-tight z-10"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 90%)",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
              }}
            >
              ReviewCollection
            </h1>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
