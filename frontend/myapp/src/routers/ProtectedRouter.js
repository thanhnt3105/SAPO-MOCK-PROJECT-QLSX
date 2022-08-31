import MainLayout from "../layout/MainLayout";
import ProtectedLayout from "../layout/ProtectedLayout";

import EmployeeCreate from "../pages/Employees/EmployeeCreate";
import EmployeeDetail from "../pages/Employees/EmployeeDetail";
import EmployeeList from "../pages/Employees/EmployeeList";

import CustomerList from "../pages/Customers/CustomerList";
import CustomerCreate from "../pages/Customers/CustomerCreate";
import CustomerDetail from "../pages/Customers/CustomerDetail";

import ProductList from "../pages/Products/ProductList";
import ProductDetail from "../pages/Products/ProductDetail";
import ProductCreate from "../pages/Products/ProductCreate";

import ServiceList from "../pages/RepairServices/ServiceList"
import ServiceDetail from "../pages/RepairServices/ServiceDetail"
// import ServiceCreate from "../pages/RepairServices/ServiceCreate"
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
          path: "/manage/customers/create",
          element: <CustomerCreate />,
        },
        {
          path: "/manage/customers/:id",
          element: <CustomerDetail />,
        },
        {
          path: "/manage/products",
          element: <ProductList />,
        },
        {
          path: "/manage/products/:id",
          element: <ProductDetail />,
        },
        {
          path: "/manage/products/create",
          element: <ProductCreate />,
        },
        {
          path:"/manage/services",
          element: <ServiceList/>
        },
        {
          path: "/manage/services/:id",
          element: <ServiceDetail/>,
        },
        // {
        //   path:"/manage/services/create",
        //   element: <ServiceCreate/>,
        // },
        
      ],
    },
  ],
};
