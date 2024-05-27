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
          height: "350px",
          marginTop: "0px",
          backgroundColor: "#998671",
          backgroundImage:
            'url("https://img.freepik.com/free-photo/assortment-cosmetics-with-copy-space_23-2148574349.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        
        }}
      >
        <h1 style={{ padding: "40px", color: "#1A0700" }}>
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
              color: "#1A0700",
              display: "flex",
              gap: "20px",
              listStyleType: "none",
              margin: "100px 0 0 0",
              padding: 0,
            }}
          >
            <li>
              <a
                className="nav-link"
                style={{
                  color: "white",

                  backgroundColor: "#1D0B01",
                  padding: "6px",
                  borderRadius: "18px",
                  width: "140px",
                  fontWeight: "normal",
                  marginLeft:"16px",
                }}
                href="/dashboard/addProduct"
              >
                Add Product
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                style={{
                  color: "white",

                  backgroundColor: "#1D0B01",
                  padding: "6px",
                  borderRadius: "18px",
                  width: "140px",
                  fontWeight: "normal",
                }}
                href="/dashboard/allProducts"
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
