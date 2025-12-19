import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"; 

// ProtectedRoute: Ensures only authenticated users can access protected pages
export const ProtectedRoute = ({ children }) => { 
  const { user, isAuthenticated } = useSelector(store => store.auth);

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// AuthenticatedUser: Prevents authenticated users from accessing login/register pages
export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useSelector(store => store.auth);
 
  // Redirect to home if the user is already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// AdminRoute: Ensures only users with the "instructor" role can access admin pages
export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector(store => store.auth);

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user's role is "instructor" (admin)
  if (user?.role !== "instructor") {
    return <Navigate to="/" replace />;
  }

  return children;
};
