import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FormAddress = ({ setDetailAddress }) => {
  const apiUrl = "https://sheltered-anchorage-60344.herokuapp.com";
  const apiEndpointProvince = apiUrl + "/province";
  const apiEndpointDistrict = apiUrl + "/district/?idProvince=";
  const apiEndpointCommune = apiUrl + "/commune/?idDistrict=";

  const [address, setAddress] = useState({
    province: {},
    district: {},
    commune: {},
  });

  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [communeList, setCommuneList] = useState([]);

  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openCommune, setOpenCommune] = useState(false);

  const handleCloseProvince = () => {
    setOpenProvince(false);
  };
  const handleOpenProvince = () => {
    setOpenProvince(true);
    setOpenDistrict(false);
    setOpenCommune(false);
  };

  const handleCloseDistrict = () => {
    setOpenDistrict(false);
  };
  const handleOpenDistrict = () => {
    setOpenProvince(false);
    setOpenDistrict(true);
    setOpenCommune(false);
  };

  const handleCloseCommune = () => {
    setOpenCommune(false);
  };
  const handleOpenCommune = () => {
    setOpenProvince(false);
    setOpenDistrict(false);
    setOpenCommune(true);
  };

  useEffect(() => {
    axios
      .get(apiEndpointProvince)
      .then(function (response) {
        setProvinceList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apiEndpointProvince]);

  useEffect(() => {
    axios
      .get(apiEndpointDistrict + address?.province?.idProvince)
      .then(function (response) {
        setDistrictList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [address.province.idProvince, apiEndpointDistrict]);

  useEffect(() => {
    axios
      .get(apiEndpointCommune + address?.district?.idDistrict)
      .then(function (response) {
        setCommuneList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [address.district.idDistrict, apiEndpointCommune]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FormControl fullWidth size='small'>
          <Select
            id='select-province'
            defaultValue={""}
            displayEmpty
            onChange={(e) =>
              setAddress({ ...address, province: e.target.value })
            }
            open={openProvince}
            onClose={handleCloseProvince}
            onOpen={handleOpenProvince}
          >
            <MenuItem value=''>
              <em>Tỉnh / Thành Phố</em>
            </MenuItem>
            {provinceList.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item?.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth size='small'>
          <Select
            id='select-district'
            defaultValue={""}
            displayEmpty
            onChange={(e) =>
              setAddress({ ...address, district: e.target.value })
            }
            open={openDistrict}
            onClose={handleCloseDistrict}
            onOpen={handleOpenDistrict}
          >
            <MenuItem value=''>
              <em>Quận / Huyện</em>
            </MenuItem>
            {districtList.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item?.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth size='small'>
          <Select
            id='select-commune'
            defaultValue={""}
            displayEmpty
            onChange={
              (e) =>
                setDetailAddress(
                  address.province.name,
                  address.district.name,
                  e.target.value.name
                )
              // setAddress({ ...address, commune: e.target.value })
            }
            open={openCommune}
            onClose={handleCloseCommune}
            onOpen={handleOpenCommune}
          >
            <MenuItem value=''>
              <em>Xã / Phường</em>
            </MenuItem>
            {communeList.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item?.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FormAddress;
