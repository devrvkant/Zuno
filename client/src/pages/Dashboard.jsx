import { useSelector } from "react-redux";

import Header from "../components/dashboard/Header";
import SideBar from "../components/dashboard/SideBar";
import ChatContainer from "../components/chat/ChatContainer";
import NoSelectedChat from "../components/chat/NoSelectedChat";

const Dashboard = () => {
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  return (
    <div className="h-[100dvh] flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 pt-14 sm:pt-16 min-h-0">
        <div className="flex-shrink-0 h-full">
          <SideBar />
        </div>
        <div className="flex-1 min-w-0">
          {selectedUser ? <ChatContainer /> : <NoSelectedChat />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
