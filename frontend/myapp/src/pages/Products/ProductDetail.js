import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
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
import ConfirmDialog from "../../common/ConfirmDialog";
// import ConfirmDialog from "../../common/ConfirmDialog";
import { removeProduct } from "../../redux/actions/actionProduct";
import { productService } from "../../services/productService";

const ProductDetail = () => {
  const products = useSelector((state) => state.product);//list of products from DB
  const itemId = useParams(); //id
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailProduct = products.find(
    (item) => item.id === parseInt(itemId.id)
  );
  const {del,setDel}=useState({isDel:false});
  const imageStyles = {width: '300px', height: '300px'}
  const [open, setOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({isDelete:false,isOpen:false,title:'',subtitle:''});
  // eslint-disable-next-line
  const [notify,setNotify]=useState({isOpen:false,message:'',type:''})

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRemove = async (event, id) => {
    productService
      .removeProduct(id)
      .then(function (response) {
        dispatch(removeProduct(id));
        navigate("/manage/products");
      })
      .catch(function (error) {
        console.log(error);
      });      
  };

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
              <Typography variant='body2'>Danh sách Linh Kiện</Typography>
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
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <img alt={detailProduct?.name} style={imageStyles} src={detailProduct?.image || 'https://placehold.jp/100x100.png'} />
              </Grid>
            </Grid>
            <Divider />
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
                      {/* Form Edit */}
                    </Paper>
                  </Modal>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

    

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Tên Linh Kiện
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {detailProduct.name}
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Mô Tả
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Typography variant='body1'>
                    {detailProduct.description}
                  </Typography>
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Loại Danh Mục
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  {detailProduct?.category}
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Giá
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  {detailProduct?.price} đồng
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Số Lượng
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  {detailProduct?.quantity}
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Ngày Tạo
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  {detailProduct?.createdDate}
                </Grid>

                <Grid item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Ngày Sửa
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  {detailProduct?.updatedDate}
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
              setConfirmDialog({
                isOpen:true,
                title:"Bạn có muốn xóa không",
                subtitle:"Thao tác này không thể thực hiện lại",
                onConfirm: () => { handleRemove(event, detailProduct?.id)}
              })
              
            }
          }            
        >
          Xoá Linh Kiện
        </Button>
        <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        />
      </Box>
    </Box>
  );
};

export default ProductDetail;
