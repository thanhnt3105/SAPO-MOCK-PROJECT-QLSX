import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { stringAvatar } from "../../utils/stringAvatar";

const EmployeeDetail = () => {
  const employees = useSelector((state) => state.employee);
  const itemCode = useParams();
  const detailEmployee = employees.find((item) => item.code === itemCode.id);
  return (
    <Box sx={{ width: "100%", my: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Link to='/manage/employees' style={{ textDecoration: "none" }}>
            <Button
              variant='text'
              startIcon={
                <ArrowBackIosNewIcon fontSize='small' color='action' />
              }
            >
              <Typography variant='body2'>Danh sách nhân viên</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ width: "100%", my: 3 }} elevation={1}>
            {detailEmployee.name && (
              <Avatar {...stringAvatar(detailEmployee.name)} />
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

export default EmployeeDetail;
