import React, { useState } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import Footer from "./Footer";

// import "../css/Palette.css";
// import paletteTheme from "../css/styles/Palette";
import appTheme from "../css/styles/ColorsApp";

const PaletteSection = styled("section", {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "classes" && prop !== "variant" && prop !== "sx",
  name: "PaletteSection",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.classes === "Palette" && styles.Palette,
  ],
})(({ theme }) => ({}));

export default function Palette(props) {
  const { colors, emoji, paletteName, id } = props.palette;
  const [levels, setLevel] = useState({ level: 500, format: "hex" });

  // fn
  const changeLevel = (newLevel) => {
    setLevel((st) => ({ ...st, level: newLevel }));
  };
  const changeFormat = (format) => {
    setLevel((st) => ({ ...st, format: format }));
  };

  // render
  return (
    <ThemeProvider theme={appTheme}>
      <PaletteSection classes="Palette">
        <NavBar
          level={levels.level}
          fnLevel={changeLevel}
          fnFormat={changeFormat}
          showAllColors
        />
        <div className="colors">
          {colors[levels.level].map((c) => (
            <ColorBox
              key={c.id}
              color={c[levels.format]}
              name={c.name}
              colorId={c.id}
              paletteId={id}
              showLink={true}
            />
          ))}
        </div>
        <Footer paletteName={paletteName} emoji={emoji} />
      </PaletteSection>
    </ThemeProvider>
  );
}
