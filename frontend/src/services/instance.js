import axios from "axios";

// define the base url for the API
const baseURL = "https://capstone-projectwork-24-4.onrender.com/api";

// create an axios instance
const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const protectedInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { instance, protectedInstance };
