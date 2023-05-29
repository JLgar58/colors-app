import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { styled, ThemeProvider } from "@mui/material/styles";
import chroma from "chroma-js";

import "../css/ColorBox.css";
// import colorBoxTheme from "../css/styles/ColorBox";
import appTheme from "../css/styles/ColorsApp";

const InfoDisplay = styled("p", {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "classes" && prop !== "variant" && prop !== "sx",
  name: "InfoDisplay",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.classes === "dark" && styles.dark,
    props.classes === "light" && styles.light,
  ],
})(({ theme }) => ({}));
const Btn = styled("button", {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "classes" && prop !== "variant" && prop !== "sx",
  name: "Btn",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.classes === "dark" && styles.dark,
    props.classes === "light" && styles.light,
  ],
})(({ theme }) => ({}));

export default function ColorBox(props) {
  const navigate = useNavigate();
  const { name, color, colorId, paletteId, showLink } = props;
  const [overlay, setOverlay] = useState({ copied: false });

  // fn
  const changeCopyState = () => {
    setOverlay(
      (st) => ({ copied: !st.copied }),
      setTimeout(() => setOverlay((st) => ({ copied: !st.copied })), 1500)
    );
  };
  // useEffect(() => {
  //   // changeCopyState()
  //   if (overlay.copied) {
  //     return () => setTimeout(() => changeCopyState(), 1500);
  //   }
  // }, [overlay.copied]);
  const handleRoute = (paletteId, colorId) => {
    navigate(`/palette/${paletteId}/${colorId}`);
  };
  const isDarkColor = chroma(color).luminance() <= 0.08;
  const isLightColor = chroma(color).luminance() >= 0.6;

  // render
  return (
    <ThemeProvider theme={appTheme}>
      <div className="ColorBox" style={{ background: color }}>
        {/* <div
        className={`copy-overlay ${overlay.copied && "copied"}`}
        style={{ background: color }}
      /> */}
        <div
          className={`copy-msg ${overlay.copied && "copied"}`}
          style={{ background: color }}
        >
          <h2>Copied!</h2>
          {/* <p className={isLightColor && "dark-txt"}>{color}</p> */}
          <InfoDisplay
            className="copyTxt"
            classes={isLightColor ? "dark" : "light"}
            variant="shade"
          >
            {color}
          </InfoDisplay>
        </div>
        {/* <div className="copy-container"> */}
        <div className="box-content">
          {/* <span className={isDarkColor ? "light-txt" : undefined}>
              {name}
            </span> */}
          <InfoDisplay variant="shade" classes={isDarkColor ? "light" : "dark"}>
            {name}
          </InfoDisplay>
        </div>
        <CopyToClipboard text={color} onCopy={changeCopyState}>
          {/* <button className={`copy-button ${isLightColor && "dark-txt"}`}>
              Copy
            </button> */}
          <Btn
            className="copy-button"
            classes={isLightColor ? "dark" : "light"}
            variant="shade"
          >
            Copy
          </Btn>
        </CopyToClipboard>
        {/* </div> */}
        {/* <Link to="/"> */}
        {showLink &&
          ({
            /* <span
            className={`see-more ${isLightColor && "dark-txt"}`}
            onClick={() => handleRoute(paletteId, colorId)}
          >
            More
          </span> */
          },
          (
            <InfoDisplay
              className="see-more"
              variant="shade"
              classes={isLightColor ? "dark" : "light"}
              onClick={() => handleRoute(paletteId, colorId)}
            >
              More
            </InfoDisplay>
          ))}
        {/* </Link> */}
      </div>
    </ThemeProvider>
  );
}
