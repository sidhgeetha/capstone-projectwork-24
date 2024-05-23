import { instance, protectedInstance } from "./instance";

const productServices = {
  // define the method to get all jobs
  getAllProducts: async () => {
    // send a GET request to the API
    return protectedInstance.get("/products");
  },
  // define the method to get a job by its ID
  getProduct: async (id) => {
    // send a GET request to the API
    return protectedInstance.get(`/products/${id}`);
  },
  // define the method to create a new job
  createProduct: async (product) => {
    // send a POST request to the API
    return protectedInstance.post("/products", product);
  },
  // define the method to update a job
  updateProduct: async (id, product) => {
    // send a PUT request to the API
    return protectedInstance.put(`//${id}`, product);
  },
  // define the method to delete a job
  deleteProduct: async (id) => {
    // send a DELETE request to the API
    return protectedInstance.delete(`/products/${id}`);
  },
};

export default productServices;
