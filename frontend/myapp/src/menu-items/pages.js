import { IconKey, IconUsers,IconUser } from "@tabler/icons";

const icons = {
  IconKey,
  IconUsers,
  IconUser
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
    }
  ],
};

export default pages;
