import React from "react";
import ReactRouters from "./utils/ReactRouters";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh.js";
const App = () => {
  const loading = useLoadingWithRefresh();
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Preparing your shopping experience...
        </p>
      </div>
    );
  }
  return (
    <div
      style={{ fontFamily: "font3" }}
      className="w-full min-h-screen bg-black text-white"
    >
      <ReactRouters />
    </div>
  );
};

export default App;
