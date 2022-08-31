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
import { removeCustomer } from "../../redux/actions/actionCustomer";
import { customerService } from "../../services/customerService";
import { stringAvatar } from "../../utils/stringAvatar";
import FormInforBasic from "../../common/FormInforBasic";

const CustomerDetail = () => {
  const customers = useSelector((state) => state.customer);
  const itemId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailCustomer = customers.find(
    (item) => item.id === parseInt(itemId.id)
  );
  const [inputNote, setInputNote] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputNote = (event) => {
    setInputNote(event.target.value);
  };

  const handleRemove = async (event, id) => {
    customerService
      .removeCustomer(id)
      .then(function (response) {
        dispatch(removeCustomer(id));
        navigate("/manage/customers");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box sx={{ width: "100%", my: 3, px: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Link to='/manage/customers' style={{ textDecoration: "none" }}>
            <Button
              variant='text'
              startIcon={
                <ArrowBackIosNewIcon fontSize='small' color='action' />
              }
            >
              <Typography variant='body2'>Danh sách khách hàng</Typography>
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
                {detailCustomer?.name && (
                  <Avatar
                    {...stringAvatar(detailCustomer.name)}
                    sx={{ width: 100, height: 100 }}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='h2' gutterBottom>
                      {detailCustomer?.name}
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
                      <FormInforBasic detailInfor={detailCustomer} />
                    </Paper>
                  </Modal>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Tên Khách Hàng
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {detailCustomer?.name}
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Số Điện Thoại
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {detailCustomer?.phone}
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Địa Chỉ
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  {detailCustomer?.address}
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Ngày Tạo
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {detailCustomer?.createdDate}
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Ngày Sửa
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {detailCustomer?.modifiedDate}
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
          onClick={(event) => handleRemove(event, detailCustomer?.id)}
        >
          Xoá Khách Hàng
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerDetail;
