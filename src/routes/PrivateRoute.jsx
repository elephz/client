import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const token = useSelector((state) => state.user.access_token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
