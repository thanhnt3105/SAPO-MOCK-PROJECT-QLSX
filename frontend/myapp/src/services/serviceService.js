import axios from "axios";
import { menuAPI } from "../constants/const";

const token = JSON.parse(localStorage.getItem("user"))?.token;
const config = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const serviceService = {
  listAll: function () {
    return axios.get(menuAPI.service, config);
  },
  listInPage: function (page, size) {
    return axios.get(
      `${menuAPI.service}/paging?page=${page}&size=${size}`,
      config
    );
  },
  removeService: function (id) {
    return axios.delete(`${menuAPI.service}/${id}`, config);
  },
  createService: function(service){
    return axios.post(`${menuAPI.service}`,config);
  }
};
