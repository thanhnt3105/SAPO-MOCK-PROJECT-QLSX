import MainLayout from "../layout/MainLayout";
import ProtectedLayout from "../layout/ProtectedLayout";
import EmployeeCreate from "../pages/Employees/EmployeeCreate";
import EmployeeDetail from "../pages/Employees/EmployeeDetail";
import EmployeeList from "../pages/Employees/EmployeeList";
import CustomerList from "../pages/Customers/CustomerList"
import CustomerCreate from "../pages/Customers/CustomerCreate";
import CustomerDetail from "../pages/Customers/CustomerDetail";
export const ProtectedRouter = {
  element: <ProtectedLayout />,
  children: [
    {
      element: <MainLayout />,
      children: [
        {
          path: "/manage/employees",
          element: <EmployeeList />,
        },
        {
          path: "/manage/employees/:id",
          element: <EmployeeDetail />,
        },
        {
          path: "/manage/employees/create",
          element: <EmployeeCreate />,
        },
        {
          path: "/manage/customers",
          element: <CustomerList />,
        },
        {
          path:"/manage/customers/create",
          element:<CustomerCreate/>
        },
        {
          path: "/manage/customers/:id",
          element: <CustomerDetail />,
        }
      ],
    },
  ],
};
