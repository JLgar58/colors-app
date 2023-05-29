import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  styled,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DraggableColorList from "./DraggableColorList";
import FormNav from "./FormNav";
import ColorPickerForm from "./ColorPickerForm";

const drawerWidth = 400;

const colorsTheme = createTheme({
  palette: {
    primary: {
      light: "#5393ff",
      main: "#2979ff",
      dark: "#1c54b2",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f6685e",
      main: "#f44336",
      dark: "#aa2e25",
      contrastText: "#fff",
    },
  },
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    height: "calc(100vh - 64px)",
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const ColorPicker = styled("div")({
  width: "90%",
  // height: "100%",
  margin: "0 auto",
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  alignItems: "center",
});

// upper: styled components and styled items, below: component

export default function NewPaletteForm(props) {
  // init's
  const { savePalette, palettes, maxColors } = props;
  const [colors, setColor] = useState({
    background: "#008080",
    colors: palettes[0].colors,
    colorName: "",
    paletteName: "",
  });
  const [open, setOpen] = useState(false);
  // const [box, setBox] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const form = useRef();
  const disabled = colors.colors.length <= maxColors;

  // fn
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangeComplete = (color) => {
    setColor((st) => ({ ...st, background: color.hex }));
  };

  const addNewColor = (e) => {
    e.preventDefault();
    const newColor = {
      name: colors.colorName,
      color: colors.background,
    };
    setColor((st) => ({
      ...st,
      colors: [...st.colors, newColor],
      background: "#6D6E6E",
      colorName: "",
    }));
  };

  const clearColors = () => {
    setColor((st) => ({ ...st, colors: [] }));
  };

  const addRandomColor = () => {
    const allColors = palettes.map((p) => p.colors).flat();
    const rdindx = Math.floor(Math.random() * allColors.length);
    let newColor = allColors[rdindx];
    setColor((st) => ({
      ...st,
      colors: [...st.colors, newColor],
      colorName: "",
    }));
  };

  const handleChange = (evt) => {
    // const color = evt.target.value;
    setColor((st) => ({ ...st, [evt.target.name]: evt.target.value }));
  };
  const clearIn = () => {
    setColor((st) => ({ ...st, paletteName: "" }));
  };

  const handleSave = (emoji) => {
    // const paletteName = "New Test Palette";
    const newPalette = {
      paletteName: colors.paletteName,
      id: colors.paletteName.toLowerCase().replace(/ /g, "-"),
      emoji: emoji,
      colors: colors.colors.map((c) => ({ name: c.name, color: c.color })),
    };
    savePalette(newPalette);
    setColor((st) => ({ ...st, paletteName: "" }));
    navigate("/");
  };

  const deleteBox = (colorName) => {
    setColor((st) => ({
      ...st,
      colors: [...st.colors.filter((c) => c.name !== colorName)],
    }));
  };

  // render
  return (
    <ThemeProvider theme={colorsTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <FormNav
          open={open}
          DrawerOpen={handleDrawerOpen}
          Save={handleSave}
          Change={handleChange}
          clearIn={clearIn}
          palettes={palettes}
          paletteName={colors.paletteName}
        />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader sx={{ alignSelf: "flex-end" }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <ColorPicker>
            <Typography variant="h4" noWrap sx={{ my: 2 }}>
              Design your palette
            </Typography>
            <Stack direction="row" spacing={2} sx={{ margin: "0 auto" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={clearColors}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={!disabled}
                onClick={addRandomColor}
              >
                Random Color
              </Button>
            </Stack>
            <ColorPickerForm
              colors={colors.colors}
              color={colors.background}
              onChangeComplete={handleChangeComplete}
              form={form}
              addColor={addNewColor}
              change={handleChange}
              colorName={colors.colorName}
              isfull={disabled}
            />
          </ColorPicker>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <DraggableColorList
            colors={colors.colors}
            setColors={(newState) =>
              setColor((st) => ({ ...st, colors: [...newState] }))
            }
            removeColor={deleteBox}
          />
        </Main>
      </Box>
    </ThemeProvider>
  );
}

// props n' PropTypes
NewPaletteForm.defaultProps = {
  maxColors: 19,
};
