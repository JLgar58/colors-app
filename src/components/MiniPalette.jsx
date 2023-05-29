import React, { PureComponent, memo } from "react";
import { useNavigate } from "react-router-dom";
import { styled, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

import appTheme from "../css/styles/ColorsApp";

const PaletteStyles = styled("div", {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "classes" && prop !== "variant" && prop !== "sx",
  name: "PaletteStyles",
  slot: "Main",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.main,
    props.classes === "root" && styles.root,
    props.classes === "colors" && styles.colors,
  ],
})(({ theme }) => ({}));

function MiniPalette(props) {
  const navigate = useNavigate();
  const { palette, openDialog } = props;

  // const hanldeBack = () => {
  //   alert("fake login");
  //   navigate(-1);
  // };
  const showPalette = () => {
    navigate(`/palette/${palette.id}`);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    openDialog(palette.id);
    // deletePalette(palette.id);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <PaletteStyles classes="root" onClick={showPalette}>
        {/* <div className="iconDiv"> */}
        <DeleteIcon
          className="deleteIcon"
          sx={{ p: 1, transition: "all 0.3s ease-in-out" }}
          onClick={handleDelete}
        />
        {/* </div> */}
        <PaletteStyles classes="colors">
          {palette.colors.map((c) => (
            <div
              className="miniBox"
              style={{ backgroundColor: c.color }}
              key={c.name}
            />
          ))}
        </PaletteStyles>
        <h5 className="title">
          {palette.paletteName} <span className="emoji">{palette.emoji}</span>
        </h5>
      </PaletteStyles>
    </ThemeProvider>
  );
}
export default memo(MiniPalette, () => true);
