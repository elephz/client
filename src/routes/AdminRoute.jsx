import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }) {
  const role = useSelector((state) => state.user.role);
  if (role != "admin") return <Navigate to="/user" replace />;
  return children;
}
