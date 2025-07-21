import { useSelector } from "react-redux";

import Header from "../components/dashboard/Header";
import SideBar from "../components/dashboard/SideBar";
import ChatContainer from "../components/chat/ChatContainer";
import NoSelectedChat from "../components/chat/NoSelectedChat";

const Dashboard = () => {
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  return (
    <div className="h-[100dvh]">
      <Header />
      <main>
        <SideBar />

        {selectedUser ? <ChatContainer /> : <NoSelectedChat />}
      </main>
    </div>
  );
};

export default Dashboard;
