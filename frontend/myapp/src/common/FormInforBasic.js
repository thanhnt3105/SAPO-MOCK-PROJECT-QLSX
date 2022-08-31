import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormAddress from "./FormAddress";

const FormInforBasic = ({ detailInfor }) => {
  const theme = useTheme();
  const [data, setData] = useState({
    name: detailInfor?.name,
    phone: detailInfor?.phone,
    address: detailInfor?.address,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const setDetailAddress = (province, district, commune) => {
    setData({ ...data, address: `${commune} - ${district} - ${province}` });
  };

  const onSubmit = async (values) => {
    setData({ ...data, name: values.name, phone: values.phone });
    // return employeeService
    //   .updateEmployee(values)
    //   .then(function (response) {
    //     dispatch(updateEmployee(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  console.log(data);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
          Họ và tên
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
            <TextField
              id='name'
              type='text'
              defaultValue={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              {...register("name", {
                maxLength: {
                  value: 50,
                  message: "Tên tối đa 50 ký tự",
                },
              })}
              error={!!errors?.name}
            />
            {errors.name && (
              <FormHelperText error>{errors.name.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          SĐT
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
            <TextField
              id='phone'
              type='text'
              defaultValue={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              {...register("phone", {
                maxLength: {
                  value: 10,
                  message: "Số điện thoại tối đa 10 ký tự",
                },
              })}
              error={!!errors?.phone}
            />
            {errors.phone && (
              <FormHelperText error>{errors.phone.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} mb={1}>
          Địa Chỉ
        </Grid>
        <Grid item xs={12}>
          <FormAddress setDetailAddress={setDetailAddress} />
        </Grid>
      </Grid>

      {errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{errors.submit}</FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          disableElevation
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          color='secondary'
        >
          Lưu
        </Button>
      </Box>
    </form>
  );
};

export default FormInforBasic;
