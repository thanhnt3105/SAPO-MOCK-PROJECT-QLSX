import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startSetEmployee } from "../../redux/actions/actionEmployee";
import { employeeService } from "../../services/employeeService";
import { getComparator, stableSort } from "../../utils/sort";
import EmployeeItem from "./EmployeeItem";

const columns = [
  { id: "id", label: "STT", align: "center" },
  {
    id: "code",
    label: "Mã Nhân Viên",
    align: "center",
  },
  {
    id: "name",
    label: "Tên Nhân Viên",
    align: "center",
  },
  {
    id: "phone",
    label: "Số Điện Thoại",
    align: "center",
  },
  {
    id: "role",
    label: "Vai Trò",
    align: "center",
  },
  {
    id: "workingStatus",
    label: "Trạng Thái",
    align: "center",
  },
  {
    id: "available",
    label: "TT Thợ Sửa",
    align: "center",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon={true}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === "desc" ? "Sorted Descending" : "Sorted Ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({ numSelected }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color='inherit'
          variant='h5'
          component='div'
        >
          Đã chọn {numSelected} nhân viên
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant='h3'
          id='tableTitle'
          component='div'
        >
          Danh sách nhân viên
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <Button variant='contained' color='error'>
            <DeleteIcon />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title='Add Employee'>
          <Link to='/manage/employees/create'>
            <Button variant='contained' color='success'>
              <AddIcon />
            </Button>
          </Link>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const EmployeeList = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  useEffect(() => {
    employeeService
      .listInPage(page, rowsPerPage)
      .then(function (response) {
        dispatch(startSetEmployee(response.data.listOfItems));
        setTotalEmployees(response.data.totalItems);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dispatch, page, rowsPerPage]);
  const listEmployee = useSelector((state) => state.employee);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = listEmployee.map((item) => item.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClickCheckbox = useCallback(
    (event, id) => {
      const selectedIndex = selected.indexOf(id);
      if (selectedIndex === -1) {
        setSelected([...selected, id]);
      } else {
        setSelected(selected.filter((item) => item !== id));
      }
    },
    [selected]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows
  const emptyRows =
    page > 0 ? Math.max(0, rowsPerPage - listEmployee.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", my: 3 }} elevation={8}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={listEmployee.length}
            />
            <TableBody>
              {stableSort(listEmployee, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = selected.indexOf(row.id) !== -1;
                  return (
                    <EmployeeItem
                      key={index}
                      index={page * rowsPerPage + (index + 1)}
                      item={row}
                      selected={isItemSelected}
                      callbackClickCheckbox={handleClickCheckbox}
                    />
                  );
                }
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 54 * emptyRows }}>
                  <TableCell colSpan={12} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component='div'
          count={totalEmployees}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default EmployeeList;
