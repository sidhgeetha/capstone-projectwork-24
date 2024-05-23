import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center", 
        height: "100vh",
      }}
    >
      <h1>Error</h1>
      {/* <p>{error.message}</p> */}

      <a href="">Go to home </a>
    </div>
  );
};

export default Error;
