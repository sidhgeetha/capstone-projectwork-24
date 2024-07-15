import React from "react";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      
      <p>Online shopping store!</p>
      <p>Register and login ! </p>

      <Outlet />
    </div>
  );
};

export default LandingPage;
