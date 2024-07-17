import React, { useState } from "react";
import productServices from "../services/productServices";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddProduct = () => {
  const [errors, setErrors] = useState({ product_name: "" });
  const [value, setValue] = useState("");

  let validationErrors = { product_name: "" };
  let isValid = true;

  const createProduct = async (e) => {
    e.preventDefault();
    const product_name = e.target[0].value;
    const product_description = e.target[1].value;
    const product_price = e.target[2].value;
    // const image = e.target[3].files[0];

    if (!product_name) {
      validationErrors.product_name = "Product name is required";
      isValid = false;
    }

    setErrors(validationErrors);

    if (isValid) {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_price", product_price);

      await axios
        .post(`https://664284773d66a67b3437895d.mockapi.io/api/products`)
        .then((res) => formData.append("product_image", res.data.product_image))
        // .then((res) => console.log(res.data.product_image))
        .catch((err) => console.log(err));

      try {
        const response = await productServices.createProduct(formData);
        console.log(response.data);
        toast.success("Added the product successfully");

        // clear the form data
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";
        e.target[3].value = "";
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    // Allow only decimal values (optional: allow empty input)
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setValue(value);
    }
  };

  return (
    <div
      style={{ marginTop: "24px" }}
      className="container d-flex justify-content-center"
    >
      <div
        className="col-md-8"
        style={{
          padding: "20px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
        }}
      >
        <h1>Add Product</h1>
        <form onSubmit={createProduct}>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="product_name">Product Name:</label>
                </td>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    id="product_name"
                    placeholder="name..."
                    isinvalid={!errors.product_name}
                  />
                  {errors.product_name && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {errors.product_name}
                    </p>
                  )}
                </td>
              </tr>
              <tr>
                <td>Product Description:</td>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="description..."
                  />
                </td>
              </tr>
              <tr>
                <td>Product Price:</td>
                <td>
                  <input
                    className="form-control"
                    value={value}
                    onChange={handleInputChange}
                    type="text"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;

