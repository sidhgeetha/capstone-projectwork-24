import React from "react";
import { Link, useNavigate } from "react-router-dom";

import userServices from "../services/userServices";

const Register = () => {
    const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();

    //get details from form name, email, password
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    //send details to api

    userServices
      .signup(name, email, password)
      .then((response) => {
        //if req is successfull log the response
        console.log(response);
        
        //redirect to login page 
         navigate("/login");

      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h2>Register</h2>
      <p>Register here to apply for jobs</p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleRegister}
      >
        <div>
          <input type="text" placeholder="name..." />
        </div>{" "}
        <br />
        <div>
          <input type="email" placeholder="email..." />
        </div>
        <br />
        <div>
          <input type="password" placeholder="password..." />
        </div>
        <br />
        <button type="submit">Submit</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
