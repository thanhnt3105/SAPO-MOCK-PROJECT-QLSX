import { IconKey, IconUsers, IconUser,IconBrandProducthunt,IconAssembly } from "@tabler/icons";

const icons = {
  IconKey,
  IconUsers,
  IconUser,
  IconBrandProducthunt,
  IconAssembly,
};

const pages = {
  id: "pages",
  title: "Quản Lý",
  type: "group",
  children: [
    {
      id: "authentication",
      title: "Authentication",
      type: "collapse",
      icon: icons.IconKey,

      children: [
        {
          id: "login",
          title: "Login",
          type: "item",
          url: "/login",
          target: true,
        },
        {
          id: "register",
          title: "Register",
          type: "item",
          url: "/register",
          target: true,
        },
      ],
    },
    {
      id: "employees",
      title: "Quản Lý Nhân Viên",
      type: "item",
      icon: icons.IconUsers,
      url: "/manage/employees",
    },
    {
      id: "customers",
      title: "Quản Lý Khách Hàng",
      type: "item",
      icon: icons.IconUser,
      url: "/manage/customers",
    },
    {
      id: "products",
      title: "Quản Lý Linh Kiện",
      type: "item",
      icon: icons.IconBrandProducthunt,
      url: "/manage/products",
    },
    {
      id: "services",
      title: "Quản Lý Dịch Vụ",
      type: "item",
      icon: icons.IconAssembly,
      url: "/manage/services",
    },
  ],
};

export default pages;
