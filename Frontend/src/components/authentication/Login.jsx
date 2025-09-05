import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/authService.js";

const Login = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };


  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4 pt-15">
      <motion.div
        className="w-full max-w-md bg-[#000000] border border-gray-800  rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-8 pt-5">
          <motion.div
            className="flex items-center justify-center mb-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex-shrink-0 flex items-center">
              <span className="text-4xl font-bold text-white">
                ReviewCollect<span className="text-[#FD9333]">ion</span>
              </span>
            </div>
          </motion.div>

          <motion.div className="text-center mb-5" variants={itemVariants}>
            <h2 className="text-sm font-semibold text-gray-500">
              Welcome back
            </h2>
          </motion.div>

          <motion.div className="text-center mb-8" variants={itemVariants}>
            <p className="text-gray-400">
              Please login in using the same email address you used to purchase
              the course, if you are cohort students!
            </p>
          </motion.div>

          <motion.div className="space-y-4 mb-8" variants={containerVariants}>
            <motion.button
              onClick={()=>loginUser()}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3  hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors border border-gray-800 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </motion.button>
          </motion.div>

          <motion.div className="text-center mb-8" variants={itemVariants}>
            <p className="text-gray-500 text-lg">
              By signing in, you agree to the{" "}
              <span className="text-[#FF8904]">Terms of</span>
              <br />
              <span className="text-[#FF8904]">Service</span> and{" "}
              <span className="text-[#FF8904]">Privacy Policy</span>.
            </p>
          </motion.div>

          <motion.div className="text-center mb-2" variants={itemVariants}>
            <button
              onClick={backToHome}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors cursor-pointer"
            >
              Back to home
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
