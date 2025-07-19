import { User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
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

        {/* User Avatar */}
        <Link to="/dashboard/profile" className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-muted hover:bg-accent transition-colors cursor-pointer ring-2 ring-transparent hover:ring-ring">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
