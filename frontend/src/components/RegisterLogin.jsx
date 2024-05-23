import React from "react";
import {useNavigate} from "react-router-dom";

const RegisterLogin = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/register")}> Register </button>
      &nbsp;
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default RegisterLogin;
