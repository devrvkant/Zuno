import { User, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useLogOutMutation } from "../../features/auth/authApi";

const Header = () => {
  const [logOut, { isLoading }] = useLogOutMutation();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
    } catch (err) {
      console.error("Logout error : ", err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
        {/* App Logo Only */}
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary">
            <span className="text-primary-foreground font-bold text-lg sm:text-xl">
              Z
            </span>
          </div>
        </div>

        {/* Right side - Logout and User Avatar */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          {/* Logout Button */}
          <button
          disabled={isLoading}
          onClick={handleLogout}
            className="flex items-center gap-0 cursor-pointer md:gap-1 p-1.5 sm:p-2 rounded-md transition-all duration-200 text-muted-foreground hover:text-foreground group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center">
              <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-all duration-200 group-hover:scale-110 group-hover:text-destructive" />
            </div>
            <span className="text-xs sm:text-sm md:text-base font-medium transition-all duration-200 group-hover:text-destructive">
              Logout
            </span>
          </button>

          {/* User Avatar */}
          <Link to="/dashboard/profile" className="flex items-center">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-muted hover:bg-accent transition-colors cursor-pointer ring-2 ring-transparent hover:ring-ring overflow-hidden flex items-center justify-center">
              {user?.profilePic?.url ? (
                <img
                  src={user.profilePic.url}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
