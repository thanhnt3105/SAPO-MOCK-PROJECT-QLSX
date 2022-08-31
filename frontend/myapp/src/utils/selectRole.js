export function selectRole(arr) {
  if (arr?.includes("ROLE_ADMIN")) return "Quản Lý";
  else if (arr?.includes("ROLE_MODERATOR")) return "Điều Phối";
  else if (arr?.includes("ROLE_CASHIER")) return "Thu Ngân";
  else if (arr?.includes("ROLE_MECHANIC")) return "Thợ Sửa Chữa";
}
