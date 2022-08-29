import { useRoutes } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { ProtectedRouter } from "./ProtectedRouter";

const AppRouter = () => {
  return useRoutes([AuthRouter, ProtectedRouter]);
};

export default AppRouter;
