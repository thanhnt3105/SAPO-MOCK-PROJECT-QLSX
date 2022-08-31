import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormInforBasic from "../../common/FormInforBasic";
import { removeEmployee } from "../../redux/actions/actionEmployee";
import { employeeService } from "../../services/employeeService";
import { selectRole } from "../../utils/selectRole";
import { stringAvatar } from "../../utils/stringAvatar";

const EmployeeDetail = () => {
  const employees = useSelector((state) => state.employee);
  const itemCode = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailEmployee = employees.find((item) => item.code === itemCode.id);
  const [inputNote, setInputNote] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputNote = (event) => {
    setInputNote(event.target.value);
  };

  const handleRemove = async (event, id) => {
    employeeService
      .removeEmployee(id)
      .then(function (response) {
        dispatch(removeEmployee(id));
        navigate("/manage/employees");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box sx={{ width: "100%", my: 3, px: 10 }}>
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
        <Grid item xs={4}>
          <Paper sx={{ width: "100%", my: 3 }} elevation={1}>
            <Grid
              container
              alignItems='center'
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ p: 1 }}
            >
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {detailEmployee?.name && (
                  <Avatar
                    {...stringAvatar(detailEmployee.name)}
                    sx={{ width: 100, height: 100 }}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='h2' gutterBottom>
                      {detailEmployee?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body2'>
                      {selectRole(detailEmployee?.roles)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              alignItems='center'
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ p: 1 }}
            >
              <Grid item xs={12}>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    id='note'
                    label='Ghi chú'
                    fullWidth
                    value={inputNote}
                    onChange={handleInputNote}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ width: "100%", my: 3 }} elevation={1}>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={11}>
                  <Typography variant='h4'>Thông Tin Chi Tiết</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography
                    align='right'
                    color='primary'
                    onClick={handleOpen}
                    sx={{
                      "&:hover": {
                        textDecoration: "underline",
                      },
                      cursor: "pointer",
                    }}
                  >
                    Sửa
                  </Typography>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Paper
                      elevation={1}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        minWidth: 500,
                        p: 3,
                      }}
                    >
                      <FormInforBasic detailInfor={detailEmployee} />
                    </Paper>
                  </Modal>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Mã Nhân Viên
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {detailEmployee?.code}
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Tên Nhân Viên
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {detailEmployee?.name}
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Số Điện Thoại
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {detailEmployee?.phone}
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Vai Trò
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {selectRole(detailEmployee?.roles)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: "#dfe4e8" }} />
      <Box mt={3}>
        <Button
          variant='contained'
          color='error'
          onClick={(event) => handleRemove(event, detailEmployee?.id)}
        >
          Xoá Nhân Viên
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeDetail;
