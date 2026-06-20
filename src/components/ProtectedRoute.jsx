import { Navigate } from "react-router-dom";
import { useStateValue } from "./StateProvider.jsx";
import { ROUTES } from "../constants/routes.js";

const ProtectedRoute = ({ children }) => {
  const [{ user }] = useStateValue();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
