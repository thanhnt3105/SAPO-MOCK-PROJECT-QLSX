import { useTheme } from "@emotion/react";
import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { selectRole } from "../../utils/selectRole";

const EmployeeItem = (props) => {
  const { index, item, selected, callbackClickCheckbox } = props;
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigateToDetailPage = (event) => {
    navigate(`/manage/employees/${item.code}`);
  };
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
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
      <TableCell align='center' onClick={handleNavigateToDetailPage}>
        {index}
      </TableCell>
      <TableCell align='center' onClick={handleNavigateToDetailPage}>
        {item.code}
      </TableCell>
      <TableCell align='center' onClick={handleNavigateToDetailPage}>
        {item.name}
      </TableCell>
      <TableCell align='center' onClick={handleNavigateToDetailPage}>
        {item.phone}
      </TableCell>
      <TableCell align='center' onClick={handleNavigateToDetailPage}>
        {selectRole(item.roles)}
      </TableCell>
      {item.workingStatus ? (
        <TableCell align='center' onClick={handleNavigateToDetailPage}>
          <Box sx={{ bgcolor: theme.palette.success.light, borderRadius: 5 }}>
            Đi làm
          </Box>
        </TableCell>
      ) : (
        <TableCell align='center' onClick={handleNavigateToDetailPage}>
          <Box sx={{ bgcolor: theme.palette.error.light, borderRadius: 5 }}>
            Nghỉ
          </Box>
        </TableCell>
      )}
      {selectRole(item.roles) === "Thợ Sửa Chữa" ? (
        item.available ? (
          <TableCell align='center' onClick={handleNavigateToDetailPage}>
            <Box sx={{ bgcolor: theme.palette.success.light, borderRadius: 5 }}>
              Rảnh
            </Box>
          </TableCell>
        ) : (
          <TableCell align='center' onClick={handleNavigateToDetailPage}>
            <Box sx={{ bgcolor: theme.palette.error.light, borderRadius: 5 }}>
              Đang sửa chữa
            </Box>
          </TableCell>
        )
      ) : (
        <TableCell
          align='center'
          onClick={handleNavigateToDetailPage}
        ></TableCell>
      )}
    </TableRow>
  );
};

export default memo(EmployeeItem);
