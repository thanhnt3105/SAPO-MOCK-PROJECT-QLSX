import { combineReducers } from "redux";
import reducerAuth from "./reducer/reducerAuth";
import reducerEmployee from "./reducer/reducerEmployee";
import reducerSidebar from "./reducer/reducerSidebar";
import reducerCustomer from "./reducer/reducerCustomer";
import reducerProduct from "./reducer/reducerProduct"
import reducerService from "./reducer/reducerService"

const rootReducer = combineReducers({
  sidebar: reducerSidebar,
  auth: reducerAuth,
  employee: reducerEmployee,
  customer: reducerCustomer,
  product: reducerProduct,
  service: reducerService,
});

export default rootReducer;
