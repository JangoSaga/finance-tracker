/* eslint-disable react/prop-types */
import { Navigate } from "react-router";
import { useUser } from "./Features/Authentication/useUser";
import Loading from "./components/Loading";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser(false);
  if (isLoading) {
    return <Loading />;
  }
  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="/login" />;
}
export default ProtectedRoute;
