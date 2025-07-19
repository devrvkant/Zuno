import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import EmailVerification from "../pages/EmailVerification";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";
import Landing from "../pages/Landing";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Not check auth here
    children: [
      // Public Routes :- load immediately(other routes like pricing and about also goes here)
      {
        index: true,
        element: <Landing />,
      },

      // Public Auth Routes :- only check if user is authenticated
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        ),
      },
      {
        path: "reset-password/:token",
        element: (
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        ),
      },
      // Not a PublicRoute :- might be needed by both authenticated and unauthenticated users
      {
        path: "verify-email",
        element: <EmailVerification />,
      },

      // Protected Routes(Dashboard & nested routes to /dashboard) :- auth check only happens here
      // Still nested under App but with different layout and auth checking
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />, // Dashboard home page
          },
          // Add more protected routes here as needed
          {
            path: "profile",
            element: <Profile />,
          },
          // {
          //   path: "settings",
          //   element: <Settings />,
          // },
          // {
          //   path: "chat",
          //   element: <Chat />,
          // },
          // {
          //   path: "chat/:chatId",
          //   element: <Chat />,
          // },
        ],
      },
      // Catch-all route for 404 Not Found
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default appRoutes;
