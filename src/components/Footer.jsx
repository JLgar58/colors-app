import { styled, ThemeProvider } from "@mui/material/styles";

// import "../css/Palette.css";
import appTheme from "../css/styles/ColorsApp";

const FooterComponent = styled("footer", {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "classes" && prop !== "variant" && prop !== "sx",
  name: "FooterComponent",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.Root,
    props.classes === "footer" && styles.footer,
  ],
})(({ theme }) => ({}));

export default function Footer(props) {
  const { paletteName, emoji } = props;
  return (
    <ThemeProvider theme={appTheme}>
      <FooterComponent classes="footer">
        <p className="footerText">
          {paletteName}
          <span className="footerEmoji">{emoji}</span>
        </p>
      </FooterComponent>
    </ThemeProvider>
  );
}
