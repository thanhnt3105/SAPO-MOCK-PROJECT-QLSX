import axios from "axios";
import { menuAPI } from "../constants/const";

const token = JSON.parse(localStorage.getItem("user"))?.token;
const config = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const employeeService = {
  listAll: function () {
    return axios.get(menuAPI.employee, config);
  },
  listInPage: function (page, size) {
    return axios.get(
      `${menuAPI.employee}/paging?page=${page}&size=${size}`,
      config
    );
  },
};
