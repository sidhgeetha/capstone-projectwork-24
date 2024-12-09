


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userServices from "../services/userServices";
import { ChakraProvider, Input, Button } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();

    let validationErrors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    if (!email) {
      validationErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!password) {
      validationErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(validationErrors);

    if (isValid) {
      userServices
        .signin(email, password)
        .then((response) => {
          // if the request is successful, log the response
          console.log(response);
          toast.success("Login successful! Redirecting to main page...");

          // send the user to the dashboard
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Login failed! Please check your credentials.");
        });
    }
  };

  return (
    <ChakraProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "50%",
            fontFamily: "sans-serif",
            fontSize: "36px",
            fontWeight: "bolder",
            backgroundImage: `url("https://www.nicepng.com/png/detail/394-3948210_skincare-product-skin-care-product-png.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0",
              padding: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          >
            Beauty Product catalog
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            borderRadius: "5px",
            width: "50%",
            height: "100vh",
            backgroundColor: "white",
          }}
        >
          <h1 style={{ color: "teal", margin: "30px" }}>Login here!</h1>
          <div
            style={{
              border: "solid",
              color: "teal",
              borderWidth: "0.1px",
              borderRadius: "4px",
              padding: "2px",
              width: "300px",
            }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "40px",
              }}
              onSubmit={handleLogin}
            >
              <div>
                <Input
                  variant="filled"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                  autoComplete="email"
                  required
                />
                {errors.email && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.email}
                  </p>
                )}
              </div>
              <br />
              <div>
                <Input
                  variant="filled"
                  placeholder="Password"
                  type="password"
                  value={password}
                  // autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                  autoComplete="current-password"
                  required
                />
                {errors.password && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.password}
                  </p>
                )}
              </div>
              <br />

              <Button colorScheme="teal" variant="solid" type="submit">
                Login
              </Button>

              <br />
              <p style={{ fontSize: "12px", color: "teal" }}>
                Don't have an account?{" "}
                <Link style={{ fontWeight: "bold" }} to="/register">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </ChakraProvider>
  );
};

export default Login;
