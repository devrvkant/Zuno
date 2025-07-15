import { User, CheckCircle, XCircle } from "lucide-react";
import { useSelector } from "react-redux";

import { useLogOutMutation } from "../../features/auth/authApi";

export default function UserInfo() {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [logOut, { isLoading }] = useLogOutMutation();

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
    } catch (err) {
      console.error("Logout error : ", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border p-8">
          {/* User Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* User Information */}
          <div className="text-center space-y-4">
            {/* User Name */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {user.name}
              </h2>
            </div>

            {/* User Email */}
            <div>
              <p className="text-muted-foreground">{user.email}</p>
            </div>

            {/* Authentication Status */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {isAuthenticated ? (
                <>
                  <CheckCircle className="w-5 h-5 text-chart-2" />
                  <span className="text-chart-2 font-medium">
                    Authenticated
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-destructive" />
                  <span className="text-destructive font-medium">
                    Not Authenticated
                  </span>
                </>
              )}
            </div>

            {/* Logout Button */}
            <div className="pt-6">
              <button
                disabled={isLoading}
                onClick={handleLogout}
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
