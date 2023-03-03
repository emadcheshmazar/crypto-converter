import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "../style/CryptoInput.scss"

const CryptoInput = ({
  coins,
  loading,
  inputValue,
  selectValue,
  InputOnChange,
  selectOnChange,
  type,
  title,
  readOnly,
}) => {
  return (
    <FormControl className="inputContainer">
      <label className="inputLabel">{title}</label>
      <Box
        className="input"
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          className="text-field"
          id="outlined-basic"
          label={""}
          variant="outlined"
          type={type}
          value={inputValue}
          onChange={InputOnChange}
          readOnly={readOnly}
          placeholder="0.0000"
        />
        <Select
          className="select"
          value={selectValue}
          onChange={selectOnChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {coins.map((coin) => (
            <MenuItem key={coin.id} value={coin.symbol} className="option">
              <Stack className="">
                <Avatar alt={coin.name} src={coin.image} />
                <span>{coin.symbol.toUpperCase()}</span>
              </Stack>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </FormControl>
  );
};

export default CryptoInput;
