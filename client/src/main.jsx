import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import "./index.css";
import appRoutes from "./routes/appRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" />
      <RouterProvider router={appRoutes} />
    </Provider>
  </StrictMode>
);
