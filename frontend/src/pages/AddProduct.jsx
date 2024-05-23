import React from "react";
import productServices from "../services/productServices";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const createProduct = async (e) => {
    e.preventDefault();
    const product_name = e.target[0].value;
    const product_description = e.target[1].value;
    const product_price = e.target[2].value;
    // const image = e.target[3].files[0];


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

      // clear the form data
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
      e.target[3].value = "";
    } catch (error) {
      console.error(error);
    }
  };

  // return (
  //   <div>
  //     <h1>Add product</h1>
  //     <form onSubmit={createProduct}>
  //       <div>
  //         {/* <input type="file" accept="image/*" /> */}
  //         <input type="text" placeholder="name..." /> &nbsp;&nbsp;
  //         <input type="text" placeholder="description..." />
  //       </div>

  //       <br />

  //       <div>
  //         <input type="text" placeholder="price..." /> &nbsp;&nbsp;
  //       </div>
  //       <br />
  //       <div>
  //         <button type="submit">Submit</button>
  //       </div>
  //     </form>
  //   </div>
  // );

  return (
    <div  style={{marginTop:"24px"}}className="container d-flex justify-content-center">
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
                  />
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
                    type="text"
                    placeholder="price..."
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
    </div>
  );
};

export default AddProduct;
