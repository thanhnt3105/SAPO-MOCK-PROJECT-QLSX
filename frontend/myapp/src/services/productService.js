import axios from "axios";
import { menuAPI } from "../constants/const";

const token = JSON.parse(localStorage.getItem("user"))?.token;
const config = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const productService = {
  listAll: function () {
    return axios.get(menuAPI.product, config);
  },
  listInPage: function (page, size) {
    return axios.get(
      `${menuAPI.product}/paging?page=${page}&size=${size}`,
      config
    );
  },
  removeProduct: function (id) {
    return axios.delete(`${menuAPI.product}/${id}`, config);
  },
  createProduct: function (product) {
    return axios.post(`${menuAPI.product}`, config);
  },
};
