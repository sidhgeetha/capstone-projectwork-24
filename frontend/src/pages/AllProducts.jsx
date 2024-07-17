import React from "react";
import productServices from "../services/productServices";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const products = await productServices.getAllProducts();

  return { products };
};

const AllProducts = () => {
  const { products } = useLoaderData();

  console.log(products);

  // console.log(products);

  return (
    // <div style={{ marginTop: "240px" }} className="container">
    <div
      className="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center align-items-center"
      style={{ marginTop: "40px", marginRight: "20px" }}
    >
      {products.data.product.map((product) => (
        <div key={product._id}>
          <div className="card">
            <div className="card-body">
              <img
                src={product.product_image}
                className="card-img-top"
                alt={product.product_image}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <h5 className="card-title">{product.product_name}</h5>
              <p className="card-text">{product.product_description}</p>
              <p className="card-text">{product.product_price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    // </div>
  );
};

export default AllProducts;        

