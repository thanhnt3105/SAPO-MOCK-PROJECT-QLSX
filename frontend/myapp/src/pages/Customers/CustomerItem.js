import { Checkbox, TableCell, TableRow } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const CustomerItem = (props) => {
  const { item, selected, callbackClickCheckbox } = props;
  const navigate = useNavigate();

  const handleNavigateToDetailPage = (event) => {
    navigate(`/manage/customers/${item.id}`);
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
      <TableCell align='center'>{item.name}</TableCell>
      <TableCell align='center'>{item.phone}</TableCell>
      <TableCell align='center'>{item.address}</TableCell>
      <TableCell align='center'>{item.createdDate}</TableCell>
      <TableCell align='center'>{item.updatedDate}</TableCell>
    </TableRow>
  );
};

export default memo(CustomerItem);
