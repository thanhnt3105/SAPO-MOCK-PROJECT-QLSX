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

const FormService = ({ detailInfor }) => {
  const theme = useTheme();
  const [data, setData] = useState({
    name: detailInfor?.name,
    price: detailInfor?.price,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (values) => {
    // setData({ ...data, name: values.name, phone: values.phone });
    // return employeeService
    //   .updateEmployee(values)
    //   .then(function (response) {
    //     dispatch(updateEmployee(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
          Tên Linh Kiện
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
                  value: 100,
                  message: "Tên dịch vụ tối đa 100 ký tự",
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
          Giá
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
            <TextField
              id='price'
              type='text'
              defaultValue={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
              {...register("price", {
              })}
              error={!!errors?.price}
            />
            {errors.price && (
              <FormHelperText error>{errors.price.message}</FormHelperText>
            )}
          </FormControl>
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

export default FormService;
