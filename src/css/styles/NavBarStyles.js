import { createTheme } from "@mui/material/styles";
import sizes from "../../utils/sizes";

const navBarTheme = createTheme({
  components: {
    NavBar: {
      styleOverrides: {
        root: {},
        navbar: {
          maxWidth: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "5%",
          margin: "0.5em 0",
          "& .logo": {
            backgroundColor: "#eceff1",
            fontFamily: "Roboto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            "@media (max-width: 991.98px)": {},
            "@media (max-width: 767.98px)": {},
            "@media (max-width: 575.98px)": {
              display: "none",
            },
            "& a": {
              margin: "0 15px 0 0",
              padding: "0 13px",
              fontSize: "22px",
              textDecoration: "none",
              color: "#000",
              whiteSpace: "nowrap",
            },
          },
          "& .sliderContainer": {
            margin: "0 10px",
          },
          "& .slider": {
            width: "340px",
            margin: "0 10px",
            display: "inline-block",
            "& .rc-slider-track": {
              backgroundColor: "#00000000",
              height: "8px",
            },
            "& .rc-slider-rail, .rc-slider-step": {
              height: "8px",
            },
            "& .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging, .rc-slider-handle, .rc-slider-handle:is(:active, :hover, :focus)":
              {
                width: "14px",
                height: "14px",
                backgroundColor: "#83bb43",
                marginTop: "-3px",
                outline: "none",
                border: "2px solid #83bb43",
                boxShadow: "none",
              },
            [sizes.down("sm")]: {
              width: "150px",
            },
            [sizes.down("xs")]: {
            },
          },
          "& .select-container": {
            margin: "0 1rem 0 auto",
          },
        },
      },
    },
  },
});

export default navBarTheme;
