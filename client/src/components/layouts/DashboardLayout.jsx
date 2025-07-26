import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { connectSocket, disconnectSocket } from "../../socket/socket";

const DashboardLayout = () => {
  // socket connection logic can be handled here
  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  return <Outlet />;
};

export default DashboardLayout;
