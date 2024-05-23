import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import userServices from "../services/userServices";

export async function loader() {
  // get the currently logged in user
  const user = await userServices.getUser();

  // return the user
  return { user };
}

const Logout = () => {
  const navigate = useNavigate();

  const { user } = useLoaderData();

  console.log(user.data.user);
  const handleLogout = () => {
    userServices
      .signout()
      .then((response) => {
        // if the request is successful, log the response
        console.log(response);

        // redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#DBD1C7",
          height: "14vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "normal",
            padding: "20px",
          }}
        >
          Welcome {user ? user.data.user.name : "Guest"}!
        </p>
        <button
          style={{
            color: "black",
            backgroundColor: "#DED4CA",
            padding: "6px",
            borderRadius: "18px",
            width: "140px",
            borderWidth:"1px",
            fontWeight: "normal",

            background: "#1D0B01",
          }}
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Logout;
