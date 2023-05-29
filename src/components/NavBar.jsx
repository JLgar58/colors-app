import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider, styled } from "@mui/material/styles";
import Slider from "rc-slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

import "rc-slider/assets/index.css";
// import "../css/NavBar.css";
import navBarTheme from "../css/styles/NavBarStyles";

const NavBar = styled("nav", {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "classes" && prop !== "variant" && prop !== "sx",
  name: "NavBar",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.classes === "navbar" && styles.navbar,
  ],
})(({ theme }) => ({}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Palette(props) {
  const { level, fnLevel, fnFormat, showAllColors } = props;
  const [format, setFormat] = useState({ format: "hex", isChanged: false });

  // fn
  const handleLevel = (newLevel) => {
    fnLevel(newLevel);
  };
  const handleChange = (e) => {
    e.preventDefault();
    fnFormat(e.target.value);
    setFormat((st) => ({ format: e.target.value, isChanged: !st.isChanged }));
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFormat((st) => ({ ...st, isChanged: !st.isChanged }));
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // render
  return (
    <ThemeProvider theme={navBarTheme}>
      <NavBar classes="navbar">
        <div className="logo">
          <Link to="/">Color Picker</Link>
        </div>
        {showAllColors && (
          <div>
            <span>Opacity {level} :</span>
            <div className="slider">
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onChange={handleLevel}
              />
            </div>
          </div>
        )}
        <div className="select-container">
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={format.format}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>-- Select one --</em>
            </MenuItem>
            <MenuItem value="hex">HEX - #000000</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          open={format.isChanged}
          autoHideDuration={3000}
          onClose={handleClose}
          action={action}
        >
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            Format changed successfuly!
          </Alert>
        </Snackbar>
      </NavBar>
    </ThemeProvider>
  );
}
