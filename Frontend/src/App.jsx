import React from "react";
import ReactRouters from "./utils/ReactRouters";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh.js";
import Loader from "./components/Home/Loader.jsx";
const App = () => {
  const loading = useLoadingWithRefresh();
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50 w-full min-h-screen">
        <Loader variant="dots" size="large" />
        {/* <Loader /> */}
        {/* <Loader variant="pulse" text="Processing data..." /> */}
        {/* <Loader variant="progress" text="Uploading files" /> */}
        {/* <Loader variant="skeleton" text="Loading content" /> */}
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
