import { useTheme } from "@emotion/react";
import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeItem = (props) => {
  const { item, selected, callbackClickCheckbox } = props;
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigateToDetailPage = (event) => {
    navigate(`/manage/employees/${item.code}`);
  };
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={handleNavigateToDetailPage}
      role='checkbox'
      checked={selected}
      tabIndex={-1}
      key={item.id}
      selected={selected}
    >
      <TableCell padding='checkbox'>
        <Checkbox
          color='primary'
          checked={selected}
          onClick={(event) => {
            callbackClickCheckbox(event, item.id);
          }}
        />
      </TableCell>
      <TableCell align='center'>{item.id}</TableCell>
      <TableCell align='center'>{item.code}</TableCell>
      <TableCell align='center'>{item.name}</TableCell>
      <TableCell align='center'>{item.phone}</TableCell>
      <TableCell align='center'>{item.roles[0].name}</TableCell>
      {item.workingStatus ? (
        <TableCell align='center'>
          <Box sx={{ bgcolor: theme.palette.success.light, borderRadius: 5 }}>
            Đi làm
          </Box>
        </TableCell>
      ) : (
        <TableCell align='center'>
          <Box sx={{ bgcolor: theme.palette.error.light, borderRadius: 5 }}>
            Nghỉ
          </Box>
        </TableCell>
      )}
      {item.roles[0].id === 4 ? (
        item.available ? (
          <TableCell align='center'>
            <Box sx={{ bgcolor: theme.palette.success.light, borderRadius: 5 }}>
              Rảnh
            </Box>
          </TableCell>
        ) : (
          <TableCell align='center'>
            <Box sx={{ bgcolor: theme.palette.error.light, borderRadius: 5 }}>
              Đang sửa chữa
            </Box>
          </TableCell>
        )
      ) : (
        <TableCell align='center'></TableCell>
      )}
    </TableRow>
  );
};

export default memo(EmployeeItem);
