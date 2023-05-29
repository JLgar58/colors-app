import React, { useState } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import Footer from "./Footer";

// import "../css/Palette.css";
import appTheme from "../css/styles/ColorsApp";

const SinglePalette = styled("section", {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "classes" && prop !== "variant" && prop !== "sx",
  name: "SinglePalette",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.classes === "singlePalette" && styles.singlePalette,
  ],
})(({ theme }) => ({}));

export default function SingleColorPalette(props) {
  const navigate = useNavigate();
  const { colorId, palette } = props;
  const _shades = gatherShades(palette, colorId);
  const [levels, setLevel] = useState({ format: "hex" });

  // fn
  const goBack = () => {
    navigate(-1);
  };
  function gatherShades(currPalette, colorId) {
    let shades = [];
    let allColors = currPalette.colors;

    for (let key in allColors) {
      shades = shades.concat(allColors[key].filter((c) => c.id === colorId));
    }

    return shades.slice(1);
  }
  const changeFormat = (format) => {
    setLevel((st) => ({ ...st, format: format }));
  };

  // render
  return (
    <ThemeProvider theme={appTheme}>
      <SinglePalette classes="singlePalette">
        <NavBar fnFormat={changeFormat} showAllColors={false} />
        <div className="colors">
          {_shades.map((sh) => (
            <ColorBox
              key={sh.name}
              color={sh[levels.format]}
              name={sh.name}
              showLink={false}
            />
          ))}
          <div className="goBack ColorBox">
            <button className="back-btn" onClick={goBack}>
              Go Back!
            </button>
          </div>
        </div>
        <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
      </SinglePalette>
    </ThemeProvider>
  );
}
