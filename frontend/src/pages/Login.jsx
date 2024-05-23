import React from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import userServices from "../services/userServices";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // get the details from the form
    const email = e.target[0].value;
    const password = e.target[1].value;

    // send the details to the API
    userServices
      .signin(email, password)
      .then((response) => {
        // if the request is successful, log the response
        console.log(response);

        // send the user to the dashboard
        navigate("/dashboard");
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
      <h1>Login</h1>
      <p>Login to apply for jobs</p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleLogin}
      >
        <div>
          <input type="email" name="email" placeholder="email..." />
        </div>
        <br />
        <div>
          <input type="password" name="password" placeholder="password..." />
        </div>
        <br />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
