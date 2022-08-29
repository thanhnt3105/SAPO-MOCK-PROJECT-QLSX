import { Box, InputAdornment, OutlinedInput } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { shouldForwardProp } from "@mui/system";
import { IconSearch } from "@tabler/icons";
import { useState } from "react";

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: 435,
    marginLeft: 50,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    "& input": {
      background: "transparent !important",
      paddingLeft: "5px !important",
    },
    [theme.breakpoints.down("lg")]: {
      width: 250,
    },
  })
);

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState("");

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <OutlineInputStyle
          id='input-search-header'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Search'
          startAdornment={
            <InputAdornment position='start'>
              <IconSearch
                stroke={1.5}
                size='1.2rem'
                color={theme.palette.grey[500]}
              />
            </InputAdornment>
          }
          aria-describedby='search-helper-text'
          inputProps={{ "aria-label": "weight" }}
        />
      </Box>
    </>
  );
};

export default SearchSection;
