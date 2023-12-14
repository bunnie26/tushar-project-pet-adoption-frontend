import { Route, Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isLoggedIn } from "../atoms";

const PrivateRoute = ({ path, element }) => {
  const [loggedIn] = useAtom(isLoggedIn);

  return loggedIn ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/auth/login" replace state={{ from: path }} />
  );
};

export default PrivateRoute;
