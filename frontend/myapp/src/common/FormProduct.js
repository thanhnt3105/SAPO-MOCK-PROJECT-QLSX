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

const FormProduct = ({ detailInfor }) => {
  const theme = useTheme();
  const [data, setData] = useState({
    name: detailInfor?.name,
    description: detailInfor?.description,
    category: detailInfor?.category,
    price: detailInfor?.price,
    quantity: detailInfor?.quantity,
    image: detailInfor?.image,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
                  message: "Tên tối đa 100 ký tự",
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
          Mô Tả
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
            <TextField
              id='description'
              type='text'
              defaultValue={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              {...register("description", {
                maxLength: {
                  value: 1024,
                  message: "Mô tả tối đa 1024 kí tự",
                },
              })}
              error={!!errors?.description}
            />
            {errors.description && (
              <FormHelperText error>{errors.description.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} mb={1}>
          Loại danh mục
        </Grid>
        <Grid item xs={12}>
          
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

        <Grid item xs={12}>
          Số Lượng
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
            <TextField
              id='quantity'
              type='text'
              defaultValue={data.quantity}
              onChange={(e) => setData({ ...data, quantity: e.target.value })}
              {...register("quantity", {
              })}
              error={!!errors?.quantity}
            />
            {errors.quantity && (
              <FormHelperText error>{errors.quantity.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          Link Ảnh
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
            <TextField
              id='image'
              type='text'
              defaultValue={data.image}
              onChange={(e) => setData({ ...data, image: e.target.value })}
              {...register("image", {
                maxLength: {
                  value: 512,
                  message: "Link ảnh tối đa 512 kí tự",
                },
              })}
              error={!!errors?.image}
            />
            {errors.image && (
              <FormHelperText error>{errors.image.message}</FormHelperText>
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

export default FormProduct;
