import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default appRoutes;
