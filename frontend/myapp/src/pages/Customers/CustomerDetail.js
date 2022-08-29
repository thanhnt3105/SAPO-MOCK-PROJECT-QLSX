import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { stringAvatar } from "../../utils/stringAvatar";

const CustomerDetail = () => {
  const customers = useSelector((state) => state.customer);
  const itemId = useParams();
  const detailCustomer = customers.find((item) => item.id = itemId.id);
  return (
    <Box sx={{ width: "100%", my: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Link to='/manage/customers' style={{ textDecoration: "none" }}>
            <Button
              variant='text'
              startIcon={
                <ArrowBackIosNewIcon fontSize='small' color='action' />
              }
            >
              <Typography variant='body2'>Danh sách khách hàng </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ width: "100%", my: 3 }} elevation={1}>
            {detailCustomer.name && (
              <Avatar {...stringAvatar(detailCustomer.name)} />
            )}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Button>xs=4</Button>
        </Grid>
        <Grid item xs={4}>
          <Button>xs=4</Button>
        </Grid>
        <Grid item xs={8}>
          <Button>xs=8</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerDetail;
