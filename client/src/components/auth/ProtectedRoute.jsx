import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { useCheckAuthQuery } from "../../features/auth/authApi";

// protect routes that requires Authenticated(loggedIn) user
const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Only check auth if we don't have user data (app refresh/initial load)
  const shouldCheckAuth = !isAuthenticated || !user;

  const { isLoading: isCheckingAuth } = useCheckAuthQuery(undefined, {
    skip: !shouldCheckAuth, // Skip the query if we already have auth data
  });

  // Show loading while checking auth - this is the key!
  if (shouldCheckAuth && isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // if not authenticated redirect to loginPage
  if (!isAuthenticated) return <Navigate to={"/login"} replace />;

  // if not verified redirect to verifyEmail page
  if (!user.isVerified) return <Navigate to={"/verify-email"} replace />;

  return children;
};

export default ProtectedRoute;
