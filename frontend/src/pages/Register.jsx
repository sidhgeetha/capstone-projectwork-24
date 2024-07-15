// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// import userServices from "../services/userServices";
// import { ChakraProvider } from "@chakra-ui/react";
// import { Button, ButtonGroup } from "@chakra-ui/react";
// import { Input } from "@chakra-ui/react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Register = () => {
//     const navigate = useNavigate();
    
//   const handleRegister = (e) => {
//     e.preventDefault();


    
//     //get details from form name, email, password
//     const name = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;

//     //send details to api

//     userServices
//       .signup(name, email, password)
//       .then((response) => {
//         //if req is successfull log the response
//         console.log(response);
//                 toast.success(
//                   "Registration successful! Redirecting to login page..."
//                 );

//         //redirect to login page 
//          navigate("/login");

//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   return (
//     <ChakraProvider>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           width: "100%",
//           height: "100vh",
//         }}
//       >
//         <div
//           style={{
//             width: "50%",

//             fontFamily: "sans-serif",
//             fontSize: "36px",
//             fontWeight: "bolder",

//             backgroundImage: `url("https://www.nicepng.com/png/detail/394-3948210_skincare-product-skin-care-product-png.png")`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             color: "white",
//             textAlign: "center",
//           }}
//         >
//           <p
//             style={{
//               margin: "0",
//               padding: "20px",
//               backgroundColor: "rgba(0, 0, 0, 0.3)",
//             }}
//           >
//             Beauty Product catalog
//           </p>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: "20px",

//             borderRadius: "5px",
//             width: "50%",
//             height: "100vh",
//             backgroundColor: "white",
//           }}
//         >
//           <h2 style={{ color: "teal", margin: "30px" }}>Register Here!</h2>

//           <div
//             style={{
//               border: "solid",
//               color: "teal",
//               borderWidth: "0.1px",
//               borderRadius: "4px",
//               padding: "2px",
//               width: "300px",
//             }}
//           >
//             <form
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 marginTop: "40px",
//               }}
//               onSubmit={handleRegister}
//             >
//               <div>
//                 <div>
//                   <Input variant="filled" placeholder="name.." />
//                 </div>
//               </div>{" "}
//               <br />
//               <div>
//                 <div>
//                   <Input variant="filled" placeholder="email.." />
//                 </div>
//               </div>
//               <br />
//               <div>
//                 <div>
//                   <Input variant="filled" placeholder="password..." />
//                 </div>
//               </div>
//               <br />
//               <Button colorScheme="teal" variant="solid" type="submit">
//                 Register
//               </Button>
//               <br />
//               <p style={{ fontSize: "12px", color: "teal" }}>
//                 Already have an account?{" "}
//                 <Link style={{ fontWeight: "bold" }} to="/login">
//                   Login
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </ChakraProvider>
//   );
// };

// export default Register;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userServices from "../services/userServices";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const handleRegister = (e) => {
    e.preventDefault();

    let validationErrors = { name: "", email: "", password: "" };
    let isValid = true;

    // Name validation
    if (!name) {
      validationErrors.name = "Name is required";
      isValid = false;
    }

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
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
      isValid = false;
    } else if (!specialCharacterRegex.test(password)) {
      validationErrors.password =
        "Password must contain at least one special character";
      isValid = false;
    }

    setErrors(validationErrors);

    if (isValid) {
      userServices
        .signup(name, email, password)
        .then((response) => {
          // If the request is successful, log the response
          console.log(response);
          toast.success(
            "Registration successful! Redirecting to login page..."
          );

          // Redirect to login page
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
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
          <h2 style={{ color: "teal", margin: "30px" }}>Register Here!</h2>

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
              onSubmit={handleRegister}
            >
              <div>
                <Input
                  variant="filled"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={!!errors.name}
                />
                {errors.name && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.name}
                  </p>
                )}
              </div>
              <br />
              <div>
                <Input
                  variant="filled"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
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
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                {errors.password && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.password}
                  </p>
                )}
              </div>
              <br />
              <Button colorScheme="teal" variant="solid" type="submit">
                Register
              </Button>
              <br />
              <p style={{ fontSize: "12px", color: "teal" }}>
                Already have an account?{" "}
                <Link style={{ fontWeight: "bold" }} to="/login">
                  Login
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

export default Register;
