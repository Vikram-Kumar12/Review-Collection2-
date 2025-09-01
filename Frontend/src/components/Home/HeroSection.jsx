import React from "react";
import { motion } from "framer-motion";
const HeroSection = () => {
  const stats = [
    { value: "1000+", label: "Review" },
    { value: "500+", label: "Comment" },
    { value: "15+", label: "Share" },
  ];

  const StatItem = ({ value, label, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center px-4 py-6"
    >
      <h3 className="text-3xl md:text-4xl font-bold text-gray-400">{value}</h3>
      <p className="text-gray-600 text-sm md:text-base">{label}</p>
    </motion.div>
  );

  return (
    <div className="">
      <div className="w-full min:h-screen  flex flex-col items-center justify-center text-white px-4 bg-black relative overflow-hidden pt-35 lg:pt-20 mt-0 lg:mt-20">
        {/* Trusted Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-4 py-3 bg-[#1b1b1b] text-sm text-white rounded-lg border border-gray-700 mb-4 flex items-center justify-center gap-3"
        >
          🔒 Trusted by 1.5M Code Learners{" "}
          <motion.span
            className="w-2 h-2 bg-red-600 rounded-full"
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center leading-tight"
        >
          <span className="underline decoration-[#ff9900] underline-offset-4">
            Real Reviews
          </span>{" "}
          <span className="text-[#ff9900]">,</span>{" "}
          <span className="underline decoration-[#ff9900] underline-offset-4">
            Real Developers
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-4 text-xl sm:text-2xl text-center text-[#ff9900] font-semibold"
        >
          Share Your Voice, Discover Insights.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="mt-6 max-w-3xl text-center text-gray-300"
        >
          <span className="text-[#ff9900]">ReviewCollection</span> is your
          platform to share authentic experiences, from deep dives to quick
          thoughts. Connect, discover, and make an impact with every review.
        </motion.p>

        {/* Feature Tags */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 1.6,
                staggerChildren: 0.2,
              },
            },
          }}
          className="mt-8 flex flex-wrap justify-center gap-4 mb-20"
        >
          {[
            { label: "Share Reviews Instantly", icon: "🚀" },
            { label: "Discover Honest Feedback", icon: "🔍" },
            { label: "Engage with Comments", icon: "💬" },
            { label: "Like What You Love", icon: "❤️" },
            { label: "Built for Devs, by Devs", icon: "👨‍💻" },
          ].map((item, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1b1b1b] border border-gray-700 text-sm hover:scale-105 transition-all"
            >
              {item.icon} {item.label}
            </motion.span>
          ))}
        </motion.div>

        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-orange-500/30 to-transparent blur-2xl opacity-60" />
      </div>

      <div className=" mt-5 text-gray-400 flex  items-center justify-center">
        {stats.map((item, index) => (
          <StatItem
            key={index}
            value={item.value}
            label={item.label}
            delay={index * 0.2}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
