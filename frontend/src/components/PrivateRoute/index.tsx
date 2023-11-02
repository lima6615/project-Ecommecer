import { Navigate } from "react-router-dom";
import * as authService from "../../services/auth-service";

type Props = {
  children: JSX.Element;
};

function PrivateRoute({ children }: Props) {
  if (!authService.isAuthenticated()) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

export default PrivateRoute;
