import { combineReducers } from "redux";
import reducerAuth from "./reducer/reducerAuth";
import reducerEmployee from "./reducer/reducerEmployee";
import reducerSidebar from "./reducer/reducerSidebar";
import reducerCustomer from "./reducer/reducerCustomer";

const rootReducer = combineReducers({
  sidebar: reducerSidebar,
  auth: reducerAuth,
  employee: reducerEmployee,
  customer:reducerCustomer
});

export default rootReducer;
