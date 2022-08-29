import { IconDashboard } from "@tabler/icons";

const icons = { IconDashboard };

const dashboard = {
  id: "dashboard",
  title: "Trang Chủ",
  type: "group",
  children: [
    {
      id: "default",
      title: "Trang Chủ",
      type: "item",
      url: "",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
