import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { removeService } from "../../redux/actions/actionService";
import { serviceService } from "../../services/serviceService";
import FormService from "../../common/FormService"

const ServiceDetail = () => {
  const services = useSelector((state) => state.service);//list of services from DB
  const itemId = useParams(); //id
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailService = services.find(
    (item) => item.id === parseInt(itemId.id)
  );
  console.log(detailService);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemove = async (event, id) => {
    serviceService
      .removeService(id)
      .then(function (response) {
        dispatch(removeService(id));
        navigate("/manage/services");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box sx={{ width: "100%", my: 3, px: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Link to='/manage/services' style={{ textDecoration: "none" }}>
            <Button
              variant='text'
              startIcon={
                <ArrowBackIosNewIcon fontSize='small' color='action' />
              }
            >
              <Typography variant='body2'>Danh sách Linh Kiện</Typography>
            </Button>
          </Link>
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
                      <FormService detailInfor={detailService} />
                    </Paper>
                  </Modal>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Tên Dịch Vụ
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {detailService.name}
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Mã Dịch Vụ
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {detailService.code}
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Giá
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {detailService.price}
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Ngày Tạo
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  {detailService?.createdDate}
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Ngày Sửa
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  {detailService?.updatedDate}
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
          onClick={(event) =>
            {
              handleRemove(event, detailService?.id);
              alert('Xóa dịch vụ thành công')
            }
          }            
        >
          Xoá Dịch Vụ
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceDetail;
