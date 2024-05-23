import { instance, protectedInstance } from "./instance";
// defining authentication services
const userServices = {
  // define signin method
  signin: async (username, password) => {
    // define the data to be sent to the API
    const data = {
      username,
      password,
    };
    // send a POST request to the API
    return instance.post("/users/signin", data, { withCredentials: true });
  },

  // define the register method
  signup: async (name, username, password) => {
    // define data sent to API
    const data = {
      username,
      password,
      name,
    };

    // send a post request to API
    return instance.post("/users/signup", data);
  },
  // get the currently logged in user
  getUser: async () => {
    return protectedInstance.get("/users/getUser");
  },

  // signout the user
  signout: async () => {
    return protectedInstance.get("/users/logout");
  },
};

export default userServices;
