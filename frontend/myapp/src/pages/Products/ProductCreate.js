import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ProductCreate = () => {
  return (
    <Box sx={{ width: "100%", my: 3, px: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Link to='/manage/products' style={{ textDecoration: "none" }}>
            <Button
              variant='text'
              startIcon={
                <ArrowBackIosNewIcon fontSize='small' color='action' />
              }
            >
              <Typography variant='body2'>Danh Sách Linh Kiện</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ width: "100%", my: 3 }} elevation={1}>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='h4'>Thêm Mới Linh Kiện</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item alignItems='center' xs={12}>
                  <Typography variant='body1'>
                    <TextField
                      variant='outlined'
                      label='Tên Linh Kiện'
                      fullWidth={"true"}
                    />
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={12}>
                  <Typography variant='body1'>
                    <TextField
                      variant='outlined'
                      label='Link ảnh'
                      fullWidth={"true"}
                    />
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={12}>
                  <Typography variant='body1'>
                    <TextField
                      variant='outlined'
                      label='Mô tả'
                      fullWidth={"true"}
                    />
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={12}>
                  <Typography variant='body1'>
                    <TextField
                      variant='outlined'
                      label='Loại danh mục'
                      fullWidth={"true"}
                    />
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={12}>
                  <Typography variant='body1'>
                    <TextField
                      variant='outlined'
                      label='Giá'
                      fullWidth={"true"}
                    />
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={12}>
                  <Typography variant='body1'>
                    <TextField
                      variant='outlined'
                      label='Số lượng'
                      fullWidth={"true"}
                    />
                  </Typography>
                </Grid>
                <Grid
                  container
                  spacing={0}
                  direction='column'
                  alignItems='center'
                  justify='center'
                >
                  <Box mt={3}>
                    <Button variant='contained' color='error'>
                      Thêm
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: "#dfe4e8" }} />
    </Box>
  );
};

export default ProductCreate;
