import axios from "axios";
import { menuAPI } from "../constants/const";

const token = JSON.parse(localStorage.getItem("user"))?.token;
const config = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const customerService = {
  listAll: function () {
    return axios.get(menuAPI.customer, config);
  },
  listInPage: function (page, size) {
    return axios.get(
      `${menuAPI.customer}/paging?page=${page}&size=${size}`,
      config
    );
  },
  removeCustomer: function (id) {
    return axios.delete(`${menuAPI.customer}/${id}`, config);
  },
};
