import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <div
        style={{
          flex: 1,
          fontStyle: "initial",
          textAlign: "center",
          fontWeight: "bolder",
          color: "white",
          height: "250px",
          marginTop: "0px",
          backgroundColor: "#998671",
        }}
      >
        <h1 style={{ padding: "40px" }}>
          Explore
          <em
            style={{
              color: "#1A0700",
              fontWeight: "bold",
              fontSize: "70px",
              marginRight: "10px",
              marginLeft: "18px",
            }}
          >
            BEAUTY
          </em>{" "}
          Products
        </h1>
        <nav style={{ textAlign: "center", marginBottom: "0px" }}>
          <ul
            style={{
              display: "flex",
              gap: "20px",
              listStyleType: "none",
              margin: "20px 0 0 0",
              padding: 0,
            }}
          >
            <li>
              <a
                className="nav-link"
                style={{
                  color: "black",
                  backgroundColor: "#DED4CA",
                  padding: "6px",
                  borderRadius: "18px",
                  width: "140px",
                  fontWeight: "normal",
                }}
                href="/addProduct"
              >
                Add Product
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                style={{
                  color: "black",
                  backgroundColor: "#DED4CA",
                  padding: "6px",
                  borderRadius: "18px",
                  width: "140px",
                  fontWeight: "normal",
                }}
                href="/allProducts"
              >
                All Products
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <div style={{ marginLeft: "50px", flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
