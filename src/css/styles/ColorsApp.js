import { createTheme } from "@mui/material/styles";
import sizes from "../../utils/sizes";

const appTheme = createTheme({
  // "@global": {
  //   "fade-exit": {
  //     fontSize: "100rem",
  //   },
  // },
  components: {
    PaletteList: {
      // home
      styleOverrides: {
        main: {
          color: "#fff",
        },
        home: {
          // backgroundColor: "blue",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflowY: "scroll",
        },
        container: {
          width: "60%",
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          "& .nav": {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "& a": {
              color: "inherit",
            },
            "& h1": {
              [sizes.down("md")]: {
                fontSize: "2rem",
              },
            },
          },
          [sizes.down("xl")]: {
            width: "80%",
          },
          [sizes.down("xs")]: {
            width: "75%",
          },
        },
        palettes: {
          width: "100%",
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: "repeat(3, 30%)",
          gridGap: "1.5rem",
          [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)",
            gridGap: "1rem",
          },
          [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1rem",
          },
        },
      },
    },
    PaletteSection: {
      // palette list
      styleOverrides: {
        root: {},
        Palette: {
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          "& .colors": {
            height: "90%",
            overflowY: "scroll", // testing
          },
        },
      },
    },
    SinglePalette: {
      // singlepalette
      styleOverrides: {
        root: {},
        singlePalette: {
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          "& .colors": {
            height: "90%",
          },
          "& .ColorBox": {
            height: "50%",
            "& .copy-button": {
              "@media (max-width: 991.98px)": {
                margin: "-10% 0 0 -25%",
              },
              "@media (max-width: 575.98px)": {
                padding: "",
                margin: "-4% 0 0 -10%",
              },
            },
            "& .back-btn": {
              "@media (max-width: 991.98px)": {
                margin: "-10% 0 0 -30%",
              },
              "@media (max-width: 575.98px)": {
                margin: "-4% 0 0 -15%",
              },
            },
            "@media (max-width: 991.98px)": {
              height: "33.33%",
            },
            "@media (max-width: 767.98px)": {
              height: "20%",
            },
            "@media (max-width: 575.98px)": {
              height: "10%",
            },
          },
          "& .goBack": {
            backgroundColor: "#555555",
          },
        },
      },
    },

    InfoDisplay: {
      // colorbox
      styleOverrides: {
        root: {
          color: "darkslategray",
          margin: "0",
        },
        dark: {},
        light: {},
      },
      variants: [
        {
          props: { variant: "shade", classes: "dark" },
          style: {
            color: "#00000088",
          },
        },
        {
          props: { variant: "shade", classes: "light" },
          style: {
            color: "#fff",
          },
        },
      ],
    },
    Btn: {
      // colorbox buttons
      styleOverrides: {
        root: {
          margin: "-5% 0 0 -15%",
          "@media (max-width: 767.98px)": {
            margin: "-4% 0 0 -15%",
          },
          "@media (max-width: 575.98px)": {
            padding: "5px 15px",
            margin: "-4% 0 0 -10%",
          },
        },
      },
      variants: [
        {
          props: { variant: "shade", classes: "dark" },
          style: {
            color: "#00000088",
          },
        },
        {
          props: { variant: "shade", classes: "light" },
          style: {
            color: "#fff",
          },
        },
      ],
    },
    FooterComponent: {
      // footer
      styleOverrides: {
        root: {
          backgroundColor: "darkslategray",
        },
        footer: {
          backgroundColor: "#eceff1",
          height: "5%",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "flex-end",
          alignItems: "center",
        },
        "& .footerText": {
          fontWeight: "600",
        },
        "& .footerEmoji": {
          fontSize: "1.5rem",
          margin: "0 1rem",
        },
      },
    },
    // mini palette (home)

    PaletteStyles: {
      styleOverrides: {
        main: {
          backgroundColor: "teal",
          textTransform: "Uppercase",
        },
        root: {
          backgroundColor: "#fff",
          borderRadius: "5px",
          border: "1px solid #000",
          padding: "0.5rem",
          position: "relative",
          cursor: "pointer",
          // "& .iconDiv": {
          "& .deleteIcon": {
            display: "none",
            color: "#fff",
            backgroundColor: "#eb3d30",
            width: "1.5em",
            height: "1.5em",
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 3,
            // padding: "10px",
            borderRadius: "5px",
            // transition: "all 3s ease-in-out",
          },
          // },
          "&:hover .deleteIcon": {
            display: "inline-block",
          },
          "& .title": {
            color: "#000",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0",
            padding: "0.5rem 0 0 0",
            fontSize: "1rem",
            position: "relative",
          },
          "& .emoji": {
            margin: "0 0 0 0.5rem",
            fontSize: "1.5rem",
          },
        },
        colors: {
          display: "flex",
          flexFlow: "wrap",
          justifyContent: "flex-start",
          alignContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#dae1e4",
          borderRadius: "5px",
          overflow: "hidden",
          height: "150px",
          width: "100%",
          "& h1": {
            color: "#fff",
            "& span": {
              color: "darkslategray",
              background: "red",
            },
          },
          "& .miniBox": {
            width: "20%",
            height: "25%",
            display: "inline-block",
            padding: "0",
            position: "relative",
          },
        },
      },
    },
  },
});
export default appTheme;
