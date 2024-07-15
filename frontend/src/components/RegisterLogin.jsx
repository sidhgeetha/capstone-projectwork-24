import React from "react";
import {useNavigate} from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";


const RegisterLogin = () => {
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
  
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
          }}
        >
          <div
            style={{
              color: "black",
              fontSize: "40px",
              fontWeight: "bold",
              textAlign: "center",
              padding: "24px",
              width: "700px",
              height: "200px",

              backgroundColor: "#04EBCF",
            }}
          >
            <p>Online shopping store!</p>
            <p>Register and login ! </p>
          </div>

          <div
            style={{
              padding: "80px",
              backgroundColor: "white",
              width: "700px",
              height: "200px",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              onClick={() => navigate("/register")}
              colorScheme="white"
              variant="solid"
              color="white"
              backgroundColor="teal"
            >
              Register
            </Button>
            &nbsp;
            <Button
              onClick={() => navigate("/login")}
              colorScheme="black"
              variant="solid"
              color="white"
              backgroundColor="teal"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default RegisterLogin;
