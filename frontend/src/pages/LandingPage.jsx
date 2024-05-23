import React from "react";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      
      <p>Welcome!</p>
      <p>Register and login ! </p>

      <Outlet />
    </div>
  );
};

export default LandingPage;
